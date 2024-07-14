import pandas as pd
import numpy as np
import statsmodels.api as sm
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.linear_model import LinearRegression
from sklearn import datasets, linear_model
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.metrics import confusion_matrix
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


def get_model_accuracy(model, predictors_test, target_test):
    predictions = model.predict(predictors_test)  # get predictions

    # Convert outputs to binary predictions
    predictions_binary = [1 if p > 0.5 else 0 for p in predictions]

    # Calculate accuracy
    accuracy = (predictions_binary == target_test).mean()
    return f'Accuracy: {accuracy}'

def summary_df(df):
    # Print dataset info
    print(df.info())
    print(df.head())
    print(df.describe())
    print(df)

def create_csv(df, filename):
    df.to_csv(filename, index=False)

def normalize_model(train_x, test_x):
    scaler_x = MinMaxScaler(feature_range=(0, 5))

    train_x = scaler_x.fit_transform(train_x)
    test_x = scaler_x.transform(test_x)

    """# Add constant to normalized features
    train_x = sm.add_constant(train_x)
    test_x = sm.add_constant(test_x)"""

    return train_x, test_x, scaler_x

def print_confusion_matrix(model, test_x, test_y, predictors):
    predictions = model.predict(test_x)
    predictions_binary = [1 if p > 0.5 else 0 for p in predictions]
    cm = confusion_matrix(test_y, predictions_binary)
    print("Confusion Matrix:")
    print(cm)
    # Print the cutoff point
    cutoff_point = model.predict([[1] + [0] * (predictors.shape[1] - 1)])
    print("Cutoff Point:", cutoff_point)
    print("AIC:", model.aic)

def get_value(new_row):
    df = pd.read_excel('Diabetes.xlsx')

    df.drop_duplicates(inplace=True)
    df.drop(["Age", "Insulin", "Skin thickness"], axis=1, inplace=True)
    empty_data_count = (df['Body mass index'] == 0).sum()

    target = df["Outcome"]
    predictors = df.drop("Outcome", axis=1)

    train_x, test_x, train_y, test_y = train_test_split(predictors, target, test_size=0.2, random_state=42)
    train_x, test_x, scaler_x = normalize_model(train_x, test_x)

    normalized_df = scaler_x.transform(predictors)
    normalized_df = pd.DataFrame(normalized_df, columns=predictors.columns)
    normalized_df['Outcome'] = target.values

    df = df.sample(frac=1, random_state=42)

    new_row_df = pd.DataFrame([new_row])
    new_row_normalized = scaler_x.transform(new_row_df)
    new_row_normalized_df = pd.DataFrame(new_row_normalized, columns=new_row_df.columns)

    for index, row in new_row_normalized_df.iterrows():
        pregnancies = row['Pregnancies']
        glucose = row['Glucose']
        blood_pressure = row['Blood pressure']
        body_mass_index = row['Body mass index']
        diabetes_pedigree_function = row['Diabetes pedigree function']

    return pregnancies, glucose, blood_pressure, body_mass_index, diabetes_pedigree_function

@app.route('/start', methods=['POST'])   
def main():
    print("Route hit")
    pregnancies = request.json.get('pregnancies')
    glucose = request.json.get('glucose')
    blood_pressure = request.json.get('pressure')
    body_mass_index = request.json.get('bodyMassIndex')
    diabetes_pedigree_function = request.json.get('diabetesPedigree')
    
    new_row = {
        'Pregnancies': pregnancies,
        'Glucose': glucose,
        'Blood pressure': blood_pressure,
        'Body mass index': body_mass_index,
        'Diabetes pedigree function': diabetes_pedigree_function
    }

    pregnancies, glucose, blood_pressure, body_mass_index, diabetes_pedigree_function = get_value(new_row)
    
    pregnancies = round(pregnancies, 2)
    glucose = round(glucose, 2)
    blood_pressure = round(blood_pressure, 2)
    body_mass_index = round(body_mass_index, 2)
    diabetes_pedigree_function = round(diabetes_pedigree_function, 2)
    
    print(pregnancies, glucose, blood_pressure, body_mass_index, diabetes_pedigree_function)
    
    return jsonify({"pregnancies": pregnancies, "glucose": glucose, "bloodPressure": blood_pressure, "bodyMassIndex": body_mass_index, "diabetesPedigree": diabetes_pedigree_function})
    
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
