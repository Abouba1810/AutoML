# AutoML

A local web-based machine learning platform that allows users to upload a CSV dataset, configure a machine learning task, train a model, and visualize evaluation results directly in the browser.

> 🚧 **This project is currently under development.**

## Features

- **CSV Upload**: Upload datasets directly from the browser
- **Feature Selection**: Select input features and the target column
- **Train/Test Split**: Configure training and testing ratios
- **Classification**: Train classification models and evaluate accuracy
- **Regression**: Train regression models and evaluate MSE and R²
- **Automatic Preprocessing**: Handle numerical and categorical features
- **Prediction Preview**: Preview generated predictions directly in the browser
- **Web Interface**: Interact with the complete machine learning pipeline through the browser

## Current Models

### Classification

Currently uses:

- `GradientBoostingClassifier`

Evaluation:

- Accuracy

### Regression

Currently uses:

- `LinearRegression`

Evaluation:

- Mean Squared Error (MSE)
- R² score

## How It Works

The application follows a simple machine learning pipeline:

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
Model Evaluation
     ↓
Results + Prediction Preview
