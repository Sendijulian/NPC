from flask import Flask, request

app = Flask(__name__)

@app.route('/receive_data', methods=['POST'])  
def receive_data():
    if request.method == 'POST':
        data = request.get_json()  # Dapatkan data JSON yang dikirim dari ESP32
        sensor_value = data.get('sensor_value')  # Ambil nilai sensor dari data JSON
        print("Data diterima:", sensor_value)
        return "Data diterima"
    else:
        return "Metode yang diperbolehkan hanya POST"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
