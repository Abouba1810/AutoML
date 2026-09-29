# AutoML

A local web-based machine learning platform that allows users to upload a CSV dataset, configure a machine learning task, train a model, and visualize evaluation results directly in the browser.

> 🚧 **This project is currently under development.** The current version implements the first stage of the AutoML pipeline.

## Table of Contents

- [Features](#features)
- [Current Models](#current-models)
  - [Classification](#classification)
  - [Regression](#regression)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Clone the repository](#1-clone-the-repository)
  - [Create a virtual environment (Optional)](#2-create-a-virtual-environment-optional)
  - [Install dependencies](#3-install-dependencies)
- [How to Run](#how-to-run)
- [How to Use](#how-to-use)
  - [Prepare your dataset](#1-prepare-your-dataset)
  - [Upload the CSV](#2-upload-the-csv)
  - [Set the training and testing ratios](#3-set-the-training-and-testing-ratios)
  - [Select the features](#4-select-the-features)
  - [Select the target](#5-select-the-target)
  - [Select the task type](#6-select-the-task-type)
  - [Train the model](#7-train-the-model)
- [Results](#results)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Features

- Upload CSV datasets
- Configure training/testing ratios
- Select input features
- Select the target column
- Choose between:
  - Classification
  - Regression
- Automatically split the dataset into training and testing sets
- Automatically preprocess numerical and categorical features
- Train a machine learning model
- Evaluate model performance
- Display evaluation results directly in the web interface
- Preview model predictions
- Communicate between a JavaScript frontend and a Python/Flask backend

---

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

---

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
├── requirements.txt
└── README.md
