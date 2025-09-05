from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # permite o React acessar

# 1. Juros Simples
@app.route('/juros-simples', methods=['POST'])
def juros_simples():
    data = request.json
    C = float(data['capital'])
    i = float(data['taxa']) / 100
    t = int(data['tempo'])

    J = C * i * t
    M = C + J
    return jsonify({"juros": round(J, 2), "montante": round(M, 2)})

# 2. Juros Compostos
@app.route('/juros-compostos', methods=['POST'])
def juros_compostos():
    data = request.json
    C = float(data['capital'])
    i = float(data['taxa']) / 100
    t = int(data['tempo'])

    M = C * ((1 + i) ** t)
    J = M - C
    return jsonify({"juros": round(J, 2), "montante": round(M, 2)})

# 3. Valor Presente
@app.route('/valor-presente', methods=['POST'])
def valor_presente():
    data = request.json
    VF = float(data['valorFuturo'])
    i = float(data['taxa']) / 100
    t = int(data['tempo'])

    VP = VF / ((1 + i) ** t)
    return jsonify({"valorPresente": round(VP, 2)})

if __name__ == '__main__':
    app.run(debug=True)
