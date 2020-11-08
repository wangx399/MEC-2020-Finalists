from flask import Flask, send_file, jsonify
import io
from extract_data import extract_data
from flag_img_api import get_flag_img
from sms import sendSMS

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/data')
def data(filename=None):
    response = jsonify(extract_data())
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/flag/<country>')
def get_flag(country):
    img = get_flag_img(country)
    response = send_file(io.BytesIO(img), mimetype='image/png')
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/contact/<phone_number>/<country>')
def contact(phone_number, country):
    country_data = extract_data()[country]
    try:
        result = sendSMS(phone_number, country, country_data)
        print(result)
        response = jsonify("Success!")
    except:
        response = jsonify("Failed to send message - SMS API may be overloaded")
    
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

app.run(host='0.0.0.0', port='5000', debug=True)
