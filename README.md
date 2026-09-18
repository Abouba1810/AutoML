# AutoML

A local web-based machine learning platform that allows users to upload a CSV dataset, configure their machine learning task, train a model, and visualize evaluation results directly in the browser.

> 🚧 This project is currently under development. The current version implements the first stage of the AutoML pipeline.

## Features

- Upload CSV datasets
- Configure training/testing ratios
- Select input features
- Select the target column
- Choose between:
  - Classification
  - Regression
- Automatically split the dataset into training and testing sets
- Train a machine learning model
- Evaluate model performance
- Display results directly in the web interface
- Communicate between a JavaScript frontend and a Python/Flask backend

## Current Models

### Classification

Currently uses:

- `RandomForestClassifier`

Evaluation:

- Accuracy

### Regression

Currently uses:

- `LinearRegression`

Evaluation:

- Mean Squared Error (MSE)
- R² score

## Tech Stack

### Backend

- Python
- Flask
- Pandas
- Scikit-learn

### Frontend

- HTML
- CSS
- JavaScript

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