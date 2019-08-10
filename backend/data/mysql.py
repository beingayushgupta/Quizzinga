from flask import Flask, jsonify, request, json
from flaskext.mysql import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask import *

app = Flask(__name__)
app.secret_key = "ayush" 

app.config['MYSQL_DATABASE_USER'] = 'ayush'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'quizzinga'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['JWT_SECRET_KEY'] = 'secret'
mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/student/register', methods=['POST'])
def register():
    conn=mysql.connect()
    cur = conn.cursor()
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()
	
    cur.execute("INSERT INTO student (f_name, l_name, email, password) VALUES ('" + 
		str(first_name) + "', '" + 
		str(last_name) + "', '" + 
		str(email) + "', '" + 
		str(password) + "' )")
    conn.commit()
	
    result = {
		'first_name' : first_name,
		'last_name' : last_name,
		'email' : email,
		'password' : password,
	}

    return jsonify({'result' : result})
	

@app.route('/student/login', methods=['POST'])
def login():
    cur = mysql.connect().cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
	
    cur.execute("SELECT * FROM student where email = '" + str(email) + "'")
    rv = cur.fetchone()
	
    if bcrypt.check_password_hash(rv[3], password):
        access_token = create_access_token(identity = {'first_name': rv[0],'last_name': rv[1],'email': rv[4]})
        result = access_token
        session['token']=result
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result

@app.route('/student/logout', methods=['POST'])
def logout():
    session.pop('token',None)
    return "user is logged out"

if __name__ == '__main__':
    app.run(debug=True)
