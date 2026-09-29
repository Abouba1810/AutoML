# AutoML

A local web-based machine learning platform that allows users to upload a CSV dataset, configure a machine learning task, train a model, and visualize evaluation results directly in the browser.

> 🚧 **This project is currently under development.** The current version implements the first stage of the AutoML pipeline.

## Table of Contents

- [Features](#features)
- [Current Models](#current-models)
  - [Classification](#classification)
  - [Regression](#regression)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Create a Virtual Environment](#2-create-a-virtual-environment-optional)
  - [3. Install Dependencies](#3-install-dependencies)
- [How to Run](#how-to-run)
- [Usage](#usage)
  - [1. Prepare Your Dataset](#1-prepare-your-dataset)
  - [2. Upload the CSV](#2-upload-the-csv)
  - [3. Configure the Train/Test Split](#3-configure-the-traintest-split)
  - [4. Select Features](#4-select-features)
  - [5. Select the Target](#5-select-the-target)
  - [6. Select the Task Type](#6-select-the-task-type)
  - [7. Train the Model](#7-train-the-model)
- [Results](#results)
- [Example](#example)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Features

- **CSV Upload**: Upload a dataset directly from the browser
- **Train/Test Split**: Configure training and testing ratios
- **Feature Selection**: Select the columns used as model inputs
- **Target Selection**: Select the column the model should predict
- **Classification**: Train a classification model
- **Regression**: Train a regression model
- **Automatic Preprocessing**: Handle numerical and categorical features
- **Model Evaluation**: Calculate relevant evaluation metrics
- **Prediction Preview**: Preview generated predictions directly in the browser
- **Web Interface**: Interact with the entire pipeline through a local web application

---

# Current Models

## Classification

The current classification pipeline uses:

- `GradientBoostingClassifier`

### Evaluation

- Accuracy

---

## Regression

The current regression pipeline uses:

- `LinearRegression`

### Evaluation

- Mean Squared Error (MSE)
- R² score

---

# How It Works

The application follows a simple machine learning pipeline:

```text
CSV Dataset
     │
     ▼
Dataset Validation
     │
     ▼
Feature / Target Selection
     │
     ▼
Train / Test Split
     │
     ▼
Data Preprocessing
     │
     ▼
Model Training
     │
     ▼
Predictions
     │
     ▼
Model Evaluation
     │
     ▼
Results + Prediction Preview
