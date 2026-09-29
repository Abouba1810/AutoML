# AutoML

A local web-based AutoML platform for training and evaluating machine learning models from CSV datasets.

> 🚧 **Work in progress.**

## Features

- Upload CSV datasets
- Select input features and target
- Configure training/testing ratios
- Classification and regression
- Automatic preprocessing of numerical and categorical features
- Model training
- Model evaluation
- Prediction preview
- Web-based results

## Models

### Classification

- Gradient Boosting Classifier
- Accuracy

### Regression

- Linear Regression
- Mean Squared Error (MSE)
- R² score

## Tech Stack

- Python
- Flask
- Pandas
- Scikit-learn
- HTML
- CSS
- JavaScript

## Project Structure

```text
AutoML/
├── main.py
├── templates/
│   └── index.html
├── static/
│   ├── script.js
│   └── style.css
├── requirements.txt
└── README.md
