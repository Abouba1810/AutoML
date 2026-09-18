from flask import Flask, jsonify, request, render_template
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import math
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload_file():

    # =========================
    # Récupérer les inputs
    # =========================

    file = request.files.get('file')

    trainingRatio = request.form.get('trainingRatio')
    testingRatio = request.form.get('testingRatio')
    features = request.form.get('features')
    target = request.form.get('target')
    taskType = request.form.get('taskType')  # Récupérer le type de tâche

    # =========================
    # Vérifier le fichier
    # =========================

    if not file:
        return jsonify({
            'message': 'No file uploaded'
        }), 400


    # =========================
    # Envoyer les données
    # à process_data()
    # =========================

    return process_data(
        file,
        trainingRatio,
        testingRatio,
        features,
        target,
        taskType
    )


def process_data(file, trainingRatio, testingRatio, features, target, taskType):

    # =========================
    # Convertir les ratios
    # =========================

    trainingRatio = float(trainingRatio)
    testingRatio = float(testingRatio)


    # =========================
    # Vérifier les ratios
    # =========================

    if abs(trainingRatio + testingRatio - 1) > 1e-9:

        return jsonify({
            'message': 'Training and testing ratios must add up to 1.'
        }), 400


    # =========================
    # Transformer les features
    # =========================

    features = [
        feature.strip()
        for feature in features.split(',')
        if feature.strip()
    ]


    # =========================
    # Nettoyer target
    # =========================

    target = target.strip()


    # =========================
    # Lire le CSV
    # =========================

    df = pd.read_csv(file)


    # =========================
    # Vérifier les features
    # =========================

    for feature in features:

        if feature not in df.columns:

            return jsonify({
                'message': f'Feature "{feature}" not found in CSV.'
            }), 400


    # =========================
    # Vérifier target
    # =========================

    if target not in df.columns:

        return jsonify({
            'message': f'Target "{target}" not found in CSV.'
        }), 400


    # =========================
    # Créer X et y
    # =========================

    X = df[features]
    y = df[target]


    # =========================
    # Affichage terminal
    # =========================

    print("\n========== DATA ==========")

    print("Training ratio:", trainingRatio)
    print("Testing ratio:", testingRatio)

    print("Features:", features)
    print("Target:", target)

    print("X shape:", X.shape)
    print("y shape:", y.shape)

    print("==========================\n")

    result = train_model(X, y, trainingRatio, testingRatio, taskType)

    model = result["model"]

    y_test = result["y_test"]

    predictions = result["predictions"]


    # =========================
    # EVALUATE
    # =========================

    metrics = evaluate_model(
        y_test,
        predictions,
        taskType
    )


    print("\n========== RESULTS ==========")

    print("Model:", type(model).__name__)

    print("Metrics:", metrics)

    print("=============================\n")


    return jsonify({

        'message': 'Model trained successfully',

        'trainingRatio': trainingRatio,

        'testingRatio': testingRatio,

        'features': features,

        'target': target,

        'taskType': taskType,

        'rows': len(df),

        'columns': len(df.columns),

        'model': type(model).__name__,

        'metrics': metrics

    }), 200
    

def train_model(X, y, trainingRatio, testingRatio, taskType):
    # Placeholder for model training logic
    # You can implement your model training here using libraries like scikit-learn, TensorFlow, etc.
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=testingRatio, random_state=42)
    # Example: Train a simple model (e.g., Linear Regression)
    if taskType == 'regression':
        model = LinearRegression()
        model.fit(X_train, y_train)
        ypred = model.predict(X_test)
        return {
            'model': model,
            'y_test': y_test,
            'predictions': ypred
        }
    elif taskType == 'classification':
        # Implement classification model training here
        from sklearn.ensemble import RandomForestClassifier
        model = RandomForestClassifier()
        model.fit(X_train, y_train)
        ypred = model.predict(X_test)
        return {
            "model": model,
            "y_test": y_test,
            "predictions": ypred
        }
def evaluate_model(y_test, ypred,taskType):
    # Placeholder for model evaluation logic
    # You can implement your model evaluation here using metrics like accuracy, precision, recall, etc.
    if taskType == 'classification':
        from sklearn.metrics import accuracy_score, classification_report
        accuracy = accuracy_score(y_test, ypred)
        report = classification_report(y_test, ypred)
        return {
            "accuracy": float(accuracy),
            "report": report
        }
    elif taskType == 'regression':
        from sklearn.metrics import mean_squared_error, r2_score
        mse = mean_squared_error(y_test, ypred)
        r2 = r2_score(y_test, ypred)
        if math.isnan(r):
            r=None
        if math.isnan(mse):
            mse=None
        return {
            "mse": float(mse),
            "r2": float(r2)
        }
if __name__ == '__main__':
    app.run(debug=True)