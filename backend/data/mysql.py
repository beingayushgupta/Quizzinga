from flask import Flask, jsonify, request, json
from flaskext.mysql import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask import *
from datetime import date

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
    branch = request.get_json()['branch']
    college_id = request.get_json()['college_id']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()
    photo=None
	
    cur.execute("INSERT INTO student (f_name, l_name, email, password,branch,photo,college_id) VALUES ('" + 
		str(first_name) + "', '" + 
		str(last_name) + "', '" + 
		str(email) + "', '" + 
        str(password) + "', '" +
        str(branch) + "', '" +  
        str(photo) + "', '" + 
		str(college_id) + "' )")
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
	
    if bcrypt.check_password_hash(rv[4], password):
        access_token = create_access_token(identity = {'first_name': rv[1],'last_name': rv[2],'email': rv[3]})
        result = access_token
        session['token']=result
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result

@app.route('/faculty/login', methods=['POST'])
def faclogin():
    cur = mysql.connect().cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    
    cur.execute("SELECT * FROM faculty where email = '" + str(email) + "'")
    rv = cur.fetchone()
    
    if rv is not None and bcrypt.check_password_hash(rv[4], password):
        access_token = create_access_token(identity = {'first_name': rv[1],'last_name': rv[2],'email': rv[3]})
        result = access_token
        session['token']=result
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result

@app.route('/student/logout', methods=['POST'])
def logout():
    session.pop('token',None)
    return "user is logged out"

@app.route('/student/dashboard', methods=['POST'])
def studashboard():
    conn=mysql.connect()
    cur = conn.cursor()
    st_id = request.get_json()['stud_id']
    #all quizes
    cur.execute("SELECT * FROM quiz")
    rv=cur.fetchall()
    rows={}
    i=0
    for row in rv:
        i+=1
        rows.update({"row"+str(i):row[1]})
    #upcoming quiz(all)
    today=date.today()
    cur.execute("SELECT * FROM student_participate_quiz,quiz where student_id='" + str(st_id) +"' and quiz.quiz_id=student_participate_quiz.quiz_id and quiz.startTime>CURRENT_TIMESTAMP ")
    upcoming_quiz=cur.fetchall()
    rows={}
    i=0
    for row in upcoming_quiz:
        i+=1
        rows.update({"row"+str(i):row[1]})
    #past quizzes (registered)
    cur.execute("SELECT * FROM student_participate_quiz,quiz where student_id='" + str(st_id) +"' and quiz.quiz_id=student_participate_quiz.quiz_id and quiz.startTime<=CURRENT_TIMESTAMP ")
    past_quiz=cur.fetchall()
    rows={}
    i=0
    for row in past_quiz:
        i+=1
        rows.update({"row"+str(i):row[0]})

    return jsonify(rows)
    
    #upcoming registered quiz
    
@app.route('/student/profile', methods=['POST'])
def getProfile():
    conn=mysql.connect()
    cur = conn.cursor()
    st_id = request.get_json()['stud_id']
    cur.execute("SELECT * from student where st_id='"+ str(st_id)+"'")
    rv=cur.fetchone()
    return jsonify({"result":rv[2]})

@app.route('/faculty/profile', methods=['POST'])
def getfacProfile():
    conn=mysql.connect()
    cur = conn.cursor()
    fac_id = request.get_json()['fac_id']
    cur.execute("SELECT * from faculty where f_id='"+ str(fac_id)+"'")
    rv=cur.fetchone()
    return jsonify({"result":rv[2]})

@app.route('/faculty/myQuiz', methods=['POST'])
def getQuiz():
    conn=mysql.connect()
    cur = conn.cursor()
    fac_id = request.get_json()['fac_id']
    cur.execute("SELECT * from quiz where f_id='"+ str(fac_id)+"'")
    rv=cur.fetchall()
    return jsonify({"result":rv[0]})

@app.route('/faculty/createQuiz', methods=['POST'])
def createQuiz():
    conn=mysql.connect()
    cur = conn.cursor()
    name = request.get_json()['name']
    startTime = request.get_json()['startTime']
    endTime = request.get_json()['endTime']
    logo = request.get_json()['logo']
    f_id = request.get_json()['fac_id']
    cur.execute("INSERT INTO quiz (name, startTime,endTime,logo,f_id) VALUES ('" + 
        str(name) + "', '" + 
        str(startTime) + "', '" + 
        str(endTime) + "', '" +
        str(logo) + "', '" +  
        str(f_id) + "' )")
    conn.commit()
    return {}

@app.route('/faculty/addQues', methods=['POST'])
def addQues():
    conn=mysql.connect()
    cur = conn.cursor()
    name = request.get_json()['name']
    typee = request.get_json()['type']
    correctAns = request.get_json()['correctAns']
    choice1 = request.get_json()['choice1']
    choice2 = request.get_json()['choice2']
    choice3 = request.get_json()['choice3']
    choice4 = request.get_json()['choice4']
    fac_id = request.get_json()['fac_id']
    cur.execute("INSERT INTO question (name, type, correctAns,choice1,choice2,choice3,choice4,fac_id) VALUES ('" + 
        str(name) + "', '" + 
        str(typee) + "', '" + 
        str(correctAns) + "', '" + 
        str(choice1) + "', '" + 
        str(choice2) + "', '" +
        str(choice3) + "', '" +
        str(choice4) + "', '" +
        str(f_id) + "' )")
    conn.commit()
    return {}
    
@app.route('/faculty/addQuestoQuiz', methods=['POST'])
def addQuestoQuiz():
    addQues()
    conn=mysql.connect()
    cur = conn.cursor()
    name = request.get_json()['name']
    cur.execute("SELECT * from question where name=")
    rv=cur.fetchone()
    quiz_id = request.get_json()['quiz_id']
    ques_id = request.get_json()['ques_id']
    marks= request.get_json()['marks']
    cur.execute("INSERT INTO question (quiz_id,ques_id,marks) VALUES ('" + 
        str(quiz_id) + "', '" + 
        str(rv[0]) + "', '" + 
        str(marks) + "' )")
    conn.commit()
    return {}

@app.route('/quiz/register', methods=['POST'])
def registertoQuiz():
    conn=mysql.connect()
    cur = conn.cursor()
    st_id = request.get_json()['stud_id']
    quiz_id = request.get_json()['quiz_id']
    cur.execute("INSERT INTO student_participate_quiz (student_id,quiz_id) VALUES ('" + 
        str(st_id) + "', '" + 
        str(quiz_id) + "' )")
    conn.commit()
    return {}

@app.route('/student/quiz/feedback', methods=['POST'])
def givefeedback():
    conn=mysql.connect()
    cur = conn.cursor()
    st_id = request.get_json()['stud_id']
    quiz_id = request.get_json()['quiz_id']
    feedback = request.get_json()['feedback']
    cur.execute("UPDATE student_participate_quiz set feedback ='" + 
        str(feedback) + "' where student_id='"+str(st_id)+"' and quiz_id='"+str(quiz_id)+"'")
    conn.commit()
    return {}

@app.route('/faculty/quiz/feedback', methods=['POST'])
def seefeedback():
    conn=mysql.connect()
    cur = conn.cursor()
    f_id = request.get_json()['fac_id']
    cur.execute("SELECT feedback from student_participate_quiz,quiz where quiz.quiz_id=student_participate_quiz.quiz_id and quiz.f_id='"+ str(f_id)+"' ")
    rv=cur.fetchall()
    return jsonify({"result":rv})

@app.route('/student/startQuiz', methods=['POST'])
def startQuiz():
    conn=mysql.connect()
    cur = conn.cursor()
    st_id = request.get_json()['stud_id']
    quiz_id = request.get_json()['quiz_id']
    cur.execute("SELECT * from student_participate_quiz where quiz_id='"+ str(quiz_id)+"' and student_id='"+ str(st_id)+"' ")
    rv=cur.fetchone()
    return jsonify({"result":rv})


if __name__ == '__main__':
    app.run(debug=True)
