from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
# Enable CORS so your HTML file can communicate with this Python server
CORS(app) 

@app.route('/api/predict', methods=['POST'])
def predict_fraud():
    try:
        # 1. Receive data from the frontend
        data = request.get_json()
        
        amount = float(data.get('amount', 0))
        time = data.get('time', '12:00')
        location = data.get('location', 'Unknown')
        device = data.get('device', 'unknown')

        # Extract hour for analysis (e.g., "23:45" becomes 23)
        hour = int(time.split(':')[0])

        # ---------------------------------------------------------
        # 2. AI MODEL LOGIC GOES HERE
        # If you train a real model (e.g., using scikit-learn), 
        # you would load it at the top of the file and call it here:
        # prediction = my_ml_model.predict([[amount, hour, device_code]])
        # ---------------------------------------------------------

        # DUMMY LOGIC (Simulating AI evaluation for the academic demo)
        is_fraud = False
        
        # Flag as fraud if: High amount + late night + unknown device
        if amount > 50000 and (hour < 6 or hour > 22) and device == 'unknown':
            is_fraud = True
        # Flag as fraud if: Unusually high amount
        elif amount > 100000:
            is_fraud = True
        # Random 15% chance to flag as fraud just to show the UI working
        elif random.random() > 0.85: 
            is_fraud = True

        # 3. Send the response back to the frontend
        if is_fraud:
            return jsonify({
                'status': 'success',
                'is_fraud': True,
                'message': 'Alert: High Probability of Fraud Detected!'
            })
        else:
            return jsonify({
                'status': 'success',
                'is_fraud': False,
                'message': 'Transaction Appears Safe.'
            })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

if __name__ == '__main__':
    # Runs the server on http://localhost:5000
    app.run(debug=True, port=5000)
