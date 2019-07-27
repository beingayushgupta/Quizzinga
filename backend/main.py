import pymysql
import pymysql.cursors
from app import app
from data.tables import Results
from data.db_config import mysql
from flask import flash, render_template, request, redirect
from werkzeug import generate_password_hash, check_password_hash
from flask_httpauth import HTTPBasicAuth
import hashlib

auth = HTTPBasicAuth()

@app.route('/add', methods=['POST'])
def register():
	conn = mysql.connect()
	cur = conn.cursor(pymysql.cursors.DictCursor)
	first_name = request.get_json()['inputName']
	email = request.get_json()['inputEmail']
	password =request.get_json()['inputPassword']
	password = hashlib.sha256(password.encode()).hexdigest()
	
	#inserting into db
	sql = "INSERT INTO tbl_user (user_name, user_email, user_password) VALUES(%s, %s, %s)"
	data = (str(first_name), str(email),str(password),)
	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute(sql, data)
	conn.commit()
	
	return redirect('/')
	

@app.route('/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    email = request.get_json()['youremail']
    password = request.get_json()['yourpassword']
    result = ""
	
    cur.execute("SELECT * FROM tbl_user where email = '" + str(email) + "'")
    rv = cur.fetchone()
	
    if bcrypt.check_password_hash(rv['password'], password):
        access_token = create_access_token(identity = {'first_name': rv['first_name'],'last_name': rv['last_name'],'email': rv['email']})
        result = access_token
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result
	


@app.route('/new_user')
def add_user_view():
	return render_template('add.html')
'''		
@app.route('/add', methods=['POST'])
def add_user():
	try:		
		_name = request.form['inputName']
		_email = request.form['inputEmail']
		_password = request.form['inputPassword']
		# validate the received values
		if _name and _email and _password and request.method == 'POST':
			#do not save password as a plain text
			_hashed_password = generate_password_hash(_password)
			# save edits
			sql = "INSERT INTO tbl_user(user_name, user_email, user_password) VALUES(%s, %s, %s)"
			data = (_name, _email, _hashed_password,)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			flash('User added successfully!')
			return redirect('/')
		else:
			return 'Error while adding user'
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
'''
		
@app.route('/')
def users():
	return "HELOO"
   

@app.route('/edit/<int:id>')
def edit_view(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT * FROM tbl_user WHERE user_id=%s", id)
		row = cursor.fetchone()
		if row:
			return render_template('edit.html', row=row)
		else:
			return 'Error loading #{id}'.format(id=id)
	except Exception as e:
		print(e)
	finally:
		cursor.close()
		conn.close()

@app.route('/update', methods=['POST'])
def update_user():
	try:		
		_name = request.form['inputName']
		_email = request.form['inputEmail']
		_password = request.form['inputPassword']
		_id = request.form['id']
		# validate the received values
		if _name and _email and _password and _id and request.method == 'POST':
			#do not save password as a plain text
			_hashed_password = generate_password_hash(_password)
			print(_hashed_password)
			# save edits
			sql = "UPDATE tbl_user SET user_name=%s, user_email=%s, user_password=%s WHERE user_id=%s"
			data = (_name, _email, _hashed_password, _id,)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			flash('User updated successfully!')
			return redirect('/')
		else:
			return 'Error while updating user'
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
		
@app.route('/delete/<int:id>')
def delete_user(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM tbl_user WHERE user_id=%s", (id,))
		conn.commit()
		flash('User deleted successfully!')
		return redirect('/')
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()
		
if __name__ == "__main__":
    app.run()
