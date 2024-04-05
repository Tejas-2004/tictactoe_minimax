from flask import Flask, request, jsonify
from flask_cors import CORS
from minimax import findBestMove

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def hello():
    return 'Hello, Johnny!'

@app.route('/send-data', methods=['POST'])
def receive_data():
    data = request.json  # Access the JSON payload
    board = data['board']  # Extract the 'board' key
    # print('Received array from frontend:', board)
    pos = findBestMove(board)
    response_data = {'pos': pos}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
