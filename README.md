# 🚀 AutoML

> A local web-based machine learning platform for training and evaluating models directly in the browser.

> 🚧 **Status:** Under active development.

---

## ✨ Features

- **CSV Upload**: Upload tabular datasets directly from the browser.
- **Feature Selection**: Select input features and the target column.
- **Train/Test Split**: Configure training and testing ratios.
- **Classification**: Train classification models and evaluate accuracy.
- **Regression**: Train regression models and evaluate MSE and R².
- **Automatic Preprocessing**: Handle numerical and categorical features seamlessly.
- **Prediction Preview**: Preview generated predictions in the browser.
- **Interactive Interface**: Configure and train models through a sleek web interface.

---

## 🧠 Current Models

### Classification
- `GradientBoostingClassifier`
- **Metric:** Accuracy

### Regression
- `LinearRegression`
- **Metrics:** Mean Squared Error (MSE), R² Score

---

## 🛠 Tech Stack

**Backend:**
- Python 3
- Flask
- Pandas
- Scikit-learn

**Frontend:**
- HTML5 / CSS3
- JavaScript (Fetch API)

---

## 📂 Project Structure

```text
AutoML/
│
├── main.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── script.js
│   └── style.css
│
├── requirements.txt
│
└── README.md
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Abouba1810/AutoML.git
cd AutoML
```

### 2. Create a Virtual Environment
A virtual environment is recommended to isolate the project dependencies.

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```

**macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```
*(To deactivate the virtual environment later, simply run `deactivate`)*

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Application
Start the Flask backend:
```bash
python main.py
```
The application will be available at: **http://127.0.0.1:5000**

> ⚠️ **Important:** The application must be served through Flask. Do not open `index.html` directly or use VS Code Live Server, because the frontend needs to communicate with the Flask backend.

---

## 💡 Usage

### 1. Prepare a Dataset
Prepare a CSV file containing your dataset (features and target). 
*Example:*
```csv
age,income,height,price
18,500,170,12000
25,800,175,18000
31,1200,180,25000
22,650,168,15000
```

### 2. Upload the Dataset
Select your CSV file using the **Upload CSV** field. The application loads the dataset using Pandas.

### 3. Configure the Train/Test Split
Set the proportion of data used for training and testing (must add up to 1).
*Example: Training Ratio: `0.8` | Testing Ratio: `0.2`*

### 4. Select Features & Target
- **Features:** Enter the columns for model inputs (e.g., `age, income, height`). This becomes the feature matrix `X`.
- **Target:** Select the column the model should predict (e.g., `price`). This becomes the target `y`.

### 5. Select the Task & Train
Choose between **Classification** (categorical targets like spam/not spam) or **Regression** (numerical values like price or salary), then click **Train Model**.

---

## ⚙️ Architecture & Workflow

### Overall Pipeline
```text
CSV Dataset
     ↓
Feature / Target Selection
     ↓
Train / Test Split
     ↓
Data Preprocessing
     ↓
Model Training
     ↓
Predictions
     ↓
Evaluation (Results + Prediction Preview)
```

### Data Preprocessing
The application automatically handles both numerical and categorical features using a Scikit-learn Pipeline:

```text
                Input Features
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
      Numerical Data      Categorical Data
             │                   │
             ▼                   ▼
      StandardScaler      OneHotEncoder
             │         (handle_unknown="ignore")
             └─────────┬─────────┘
                       ▼
                 Model Pipeline
```

### System Architecture
```text
 Browser (Frontend)
   │
   │ JavaScript Fetch API
   ▼
 Flask Backend
   │
   ├── Pandas (Loading)
   ├── Scikit-learn (Preprocessing)
   └── ML Model (Training & Eval)
          │
          ▼
       Results ──▶ Browser
```

---

## 📊 Results & Prediction Preview

After training, the interface displays:
- **Dataset overview** (rows, columns, selected features).
- **Training Configuration** (Task type, Model, Split ratios).
- **Evaluation Metrics** (Accuracy for Classification; MSE & R² for Regression).

**Prediction Preview Example:**
```text
┌────────────┐
│ prediction │
├────────────┤
│ 12000      │
│ 17800      │
│ 24300      │
│ 15600      │
└────────────┘
```

---

## 💻 Development

Main development files to explore or modify:
- `main.py` → Flask backend and ML pipeline (configuration, models, preprocessing).
- `templates/index.html` → Web interface.
- `static/script.js` → Frontend logic and API communication.
- `static/style.css` → Interface styling.

---

## 🗺 Future Improvements

- [ ] Add more machine learning models
- [ ] Automatic model selection
- [ ] Model comparison
- [ ] Hyperparameter optimization
- [ ] Cross-validation support
- [ ] More evaluation metrics
- [ ] Feature importance visualization
- [ ] Data visualization dashboard
- [ ] Automated feature engineering & data cleaning
- [ ] Model export capabilities
- [ ] Prediction data downloads

---

## 👨‍💻 Author

**Aboubacar Diarra**
- 🌐 **Portfolio:** [aboubacardiarra.xyz](https://aboubacardiarra.xyz)
- 🐙 **GitHub:** [@Abouba1810](https://github.com/Abouba1810)
- 💼 **LinkedIn:** [Insert LinkedIn URL]
