from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flasgger import Swagger, swag_from

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SWAGGER'] = {
    'title': 'User API',
    'uiversion': 3
}
swagger = Swagger(app)

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {'type': 'string'},
                    'password': {'type': 'string'}
                },
                'required': ['username', 'password']
            }
        }
    ],
    'responses': {
        200: {'description': 'User registered successfully'},
        400: {'description': 'Validation error or user already exists'}
    }
})
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username e password obbligatori'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username già registrato'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': f'Utente {username} registrato con successo!'}), 200

@app.route('/login', methods=['POST'])
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {'type': 'string'},
                    'password': {'type': 'string'}
                },
                'required': ['username', 'password']
            }
        }
    ],
    'responses': {
        200: {'description': 'Login successful'},
        400: {'description': 'Invalid username or password'}
    }
})
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username e password obbligatori'}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Username o password errati'}), 400

    return jsonify({'id': user.id, 'username': user.username}), 200

@app.route('/users', methods=['GET'])
@swag_from({
    'tags': ['Users'],
    'responses': {
        200: {
            'description': 'Lista di utenti registrati',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'username': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_users():
    users = User.query.all()
    output = [{'id': u.id, 'username': u.username} for u in users]
    return jsonify(output), 200

if __name__ == '__main__':
    app.run(debug=True)
