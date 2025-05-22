from flask import Flask, request, jsonify
from flask_cors import CORS  
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import IsolationForest
import joblib


app = Flask(__name__)
CORS(app)

# Load dataset and train models
df = pd.read_csv("UniGuard_student_data.csv")
X = df.drop(columns=["burnout"])
y = df["burnout"]

log_reg = LogisticRegression(class_weight='balanced')
log_reg.fit(X, y)

iso_forest = IsolationForest(contamination=0.15, random_state=42)
iso_forest.fit(X)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    print("Received data:", data)  # LINE FOR DEBUGGING
    try:
        user_input = pd.DataFrame([data])
        burnout_probs = log_reg.predict_proba(user_input)[0]
        burnout_score = float(burnout_probs[1])  # probability of burnout
        burnout_pred = int(burnout_score >= 0.5)  # classify if score ≥ 50%

        anomaly_flag = int(iso_forest.predict(user_input)[0] == -1)

        return jsonify({
            "burnout_prediction": int(burnout_pred),
            "burnout_score": burnout_score, # percentage probability
            "anomaly_flag": anomaly_flag
        })
    except Exception as e:
        print("Error:", e)  # DEBUGGING LINE
        return jsonify({"error": str(e)}), 400

@app.route("/", methods=["GET"])
def index():
    return "UniGuard API is running!"

if __name__ == "__main__":
    app.run(debug=True)
