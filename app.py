from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/simulate", methods=["POST"])
def simulate():
  data = request.json

  bclk = float(data.get("bclk", 100))
  multiplier = float(data.get("multiplier", 36))
  voltage = float(data.get("voltage", 1.2))
  cooler_type = data.get("cooler", "air")

  frequency_ghz = (bclk * multiplier) / 1000.0
  frequency_hz = bclk * multiplier * 1e6

  capacitance = 1.2e-8
  ambient_temp = 30.0
  r_thermal = 0.05 if cooler_type == "liquid" else 0.15

  power = capacitance * (voltage**2) * frequency_hz
  temperature = ambient_temp + (power * r_thermal)

  throttled = False
  status = "Stable"

  if temperature >= 95.0:
    throttled = True
    frequency_ghz *= 0.7
    status = "Thermal Throttling Active!"

  required_voltage = 1.0 + (frequency_ghz - 3.6) * 0.15
  if voltage < required_voltage:
    status = "CRASH: Under-volted (BSOD)"
  elif temperature >= 105.0:
    status = "CRASH: Overheating Emergency Shutdown"

  return jsonify({
      "frequency": round(frequency_ghz, 2),
      "power": round(power, 2),
      "temperature": round(temperature, 1),
      "status": status,
      "throttled": throttled,
  })


if __name__ == "__main__":
  app.run(host="127.0.0.1", port=5000, debug=True)