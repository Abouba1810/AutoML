from flask import Flask, jsonify, request, render_template
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import math
from sklearn.preprocessing import LabelEncoder, StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
app = Flask(__name__)
from sklearn.ensemble import GradientBoostingClassifier

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

def what_type_of_data(df:pd.DataFrame):
    num_cols=df.select_dtypes(include='number').columns.tolist()
    cat_cols=df.select_dtypes(exclude='number').columns.tolist()
    return num_cols,cat_cols
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

    target = target.strip()

    df = pd.read_csv(file)

    for feature in features:

        if feature not in df.columns:

            return jsonify({
                'message': f'Feature "{feature}" not found in CSV.'
            }), 400

    if target not in df.columns:

        return jsonify({
            'message': f'Target "{target}" not found in CSV.'
        }), 400


    X = df[features]
    y = df[target]
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
    submission = pd.DataFrame({
        target: predictions
    })

    submission_preview = submission.head(10).to_dict(orient='records')


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

        'metrics': metrics,
        'submission_preview': submission_preview

    }), 200
    
def train_model(X, y, trainingRatio, testingRatio, taskType):
    
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=testingRatio,
        random_state=42
    )

    # Identifier les colonnes
    num_cols, cat_cols = what_type_of_data(X)

    # Préprocessing
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), num_cols),
            ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)
        ]
    )

    # =========================
    # REGRESSION
    # =========================

    if taskType == 'regression':

        model = Pipeline([
            ('preprocessor', preprocessor),
            ('model', LinearRegression())
        ])

        model.fit(X_train, y_train)

        ypred = model.predict(X_test)

        return {
            'model': model,
            'y_test': y_test,
            'predictions': ypred
        }

    # =========================
    # CLASSIFICATION
    # =========================

    elif taskType == 'classification':

        le = LabelEncoder()

        y_train_encoded = le.fit_transform(y_train)

        model = Pipeline([
            ('preprocessor', preprocessor),
            ('model', GradientBoostingClassifier(random_state=42))
        ])

        model.fit(X_train, y_train_encoded)

        ypred_encoded = model.predict(X_test)

        ypred = le.inverse_transform(ypred_encoded)

        return {
            'model': model,
            'y_test': y_test,
            'predictions': ypred
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
        if math.isnan(r2):
            r2=None
        if math.isnan(mse):
            mse=None
        return {
            "mse": float(mse) if mse is not None else None,
            "r2": float(r2) if r2 is not None else None
        }
if __name__ == '__main__':
    app.run(debug=True)