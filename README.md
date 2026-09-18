# AutoML

A local web-based machine learning platform that allows users to upload a CSV dataset, configure a machine learning task, train a model, and visualize evaluation results directly in the browser.

> 🚧 **This project is currently under development.** The current version implements the first stage of the AutoML pipeline.

---

## Features

* Upload CSV datasets
* Configure training/testing ratios
* Select input features
* Select the target column
* Choose between:

  * Classification
  * Regression
* Automatically split the dataset into training and testing sets
* Train a machine learning model
* Evaluate model performance
* Display results directly in the web interface
* Communicate between a JavaScript frontend and a Python/Flask backend

---

## Current Models

### Classification

Currently uses:

* `RandomForestClassifier`

Evaluation:

* Accuracy

### Regression

Currently uses:

* `LinearRegression`

Evaluation:

* Mean Squared Error (MSE)
* R² score

---

## Tech Stack

### Backend

* Python
* Flask
* Pandas
* Scikit-learn

### Frontend

* HTML
* CSS
* JavaScript

---

## Project Structure

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
└── README.md
```

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AutoML.git
cd AutoML
```

## 2. Create a virtual environment

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

## 3. Install dependencies

```bash
pip install flask pandas scikit-learn
```

---

# How to Run

Start the Flask server:

```bash
python main.py
```

You should see something similar to:

```text
* Running on http://127.0.0.1:5000
```

Open your browser and go to:

```text
http://127.0.0.1:5000
```

> **Important:** Do not open `index.html` directly or use VS Code Live Server. Flask must serve the page because the frontend communicates with the Flask backend.

---

# How to Use

## 1. Prepare your dataset

Prepare a CSV file containing your dataset.

Example:

```csv
age,income,height,price
18,500,170,12000
25,800,175,18000
31,1200,180,25000
22,650,168,15000
```

Make sure that:

* The feature columns exist in the CSV.
* The target column exists in the CSV.
* The selected features contain data compatible with the selected model.
* The dataset contains enough rows for a meaningful train/test split.

---

## 2. Upload the CSV

Click the **Upload CSV** button and select your dataset.

---

## 3. Set the training and testing ratios

Enter the proportion of the dataset that should be used for training and testing.

Example:

```text
Training Ratio: 0.8
Testing Ratio: 0.2
```

The two values must add up to `1`.

Other valid examples:

```text
0.7 + 0.3 = 1
0.8 + 0.2 = 1
0.9 + 0.1 = 1
```

---

## 4. Select the features

Enter the names of the columns that should be used as input features.

Separate multiple features with commas:

```text
age, income, height
```

The application converts this into a Python list:

```python
[
    "age",
    "income",
    "height"
]
```

These features become `X`:

```python
X = df[features]
```

---

## 5. Select the target

Enter the column that the model should predict.

For example:

```text
price
```

The application creates:

```python
y = df[target]
```

The dataset is therefore divided into:

```text
X = input features
y = target
```

---

## 6. Select the task type

Choose the
