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


app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'quizzinga'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['JWT_SECRET_KEY'] = 'secret'
mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)


@app.route('/user/register', methods=['POST'])
def register():
    conn=mysql.connect()
    cur = conn.cursor()
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    branch = "CSE"
    college_id = 1
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()
    photo=None
	
    cur.execute("INSERT INTO user (f_name, l_name, email, password,college_id) VALUES ('" +
        str(first_name) + "', '" + 
		str(last_name) + "', '" + 
		str(email) + "', '" + 
        str(password) + "', '" + 
		str(college_id) + "' )")
    conn.commit()
	
    result = {
		'first_name' : first_name,
		'last_name' : last_name,
		'email' : email,
		'password' : password,
	}

    return jsonify({'result' : result})
	


@app.route('/user/login', methods=['POST'])
def login():
    cur = mysql.connect().cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
	
    cur.execute("SELECT * FROM user where email = '" + str(email) + "'")
    rv = cur.fetchone()
	
    if bcrypt.check_password_hash(rv[4], password):
        access_token = create_access_token(identity = {'first_name': rv[1],'last_name': rv[2],'email': rv[3]})
        result = access_token
        session['id']=rv[0]
    else:
        result = jsonify({"error":"Invalid username and password"})
    
    return result

@app.route('/student/logout', methods=['POST'])
def logout():
    session.pop('id',None)
    return "user is logged out"

@app.route('/user/dashboard', methods=['GET'])
def getdashboard():
    conn=mysql.connect()
    cur = conn.cursor()
    u_id=2
    if 'id' in session:
        u_id = session['id']
    #all quizes
    cur.execute("SELECT * FROM quiz where startTime>CURRENT_TIMESTAMP and quiz_id not in (SELECT user_participate_quiz.quiz_id FROM user_participate_quiz,quiz where user_participate_quiz.u_id='" + str(u_id) +"' and quiz.quiz_id=user_participate_quiz.quiz_id )")
    upcoming_quiz=cur.fetchall()
    #upcoming quiz(all)
    cur.execute("SELECT * FROM user_participate_quiz,quiz where user_participate_quiz.u_id='" + str(u_id) +"' and quiz.quiz_id=user_participate_quiz.quiz_id and quiz.endTime>CURRENT_TIMESTAMP ")
    registered_quiz=cur.fetchall()
    #past quizzes (registered)
    cur.execute("SELECT * FROM user_participate_quiz,quiz where user_participate_quiz.u_id='" + str(u_id) +"' and quiz.quiz_id=user_participate_quiz.quiz_id and quiz.startTime<=CURRENT_TIMESTAMP ")
    past_quiz=cur.fetchall()
    return jsonify([past_quiz,upcoming_quiz,registered_quiz])


    
@app.route('/student/profile', methods=['POST'])

def agetProfile():
    conn=mysql.connect()
    cur = conn.cursor()
    st_id = request.get_json()['stud_id']
    cur.execute("SELECT * from student where st_id='"+ str(st_id)+"'")
    rv=cur.fetchone()
    return jsonify({"result":rv[2]})


@app.route('/user/myQuiz', methods=['GET'])
def getQuiz():
    conn=mysql.connect()
    cur = conn.cursor()
    u_id=''
    if 'id' in session:
        u_id = session['id']
    cur.execute("SELECT * from quiz where u_id='"+ str(u_id)+"' ")
    rv=cur.fetchall()
    return jsonify(rv)

@app.route('/faculty/profile', methods=['POST'])
def getfacProfile():
    conn=mysql.connect()
    cur = conn.cursor()
    fac_id = request.get_json()['fac_id']
    cur.execute("SELECT * from faculty where f_id='"+ str(fac_id)+"'")
    rv=cur.fetchone()
    return jsonify({"result":rv[2]})

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

@app.route('/user/myQuiz', methods=['POST'])
def myQuiz():
    conn=mysql.connect()
    cur = conn.cursor()
    u_id = request.get_json()['u_id']
    cur.execute("SELECT * from quiz where u_id='"+ str(u_id)+"' ")
    rv=cur.fetchall()
    return jsonify(rv)

@app.route('/user/profile', methods=['GET'])
def getProfile():
    conn=mysql.connect()
    cur = conn.cursor()
    u_id=''
    if 'id' in session:
        u_id = session['id']
    cur.execute("SELECT * from user_participate_quiz U,quiz Q where U.quiz_id=Q.quiz_id and U.u_id='"+ str(u_id)+"' ")
    rv=cur.fetchall()
    return jsonify(rv)

@app.route('/user', methods=['GET'])
def getUser():
    conn=mysql.connect()
    cur = conn.cursor()
    u_id=''
    if 'id' in session:
        u_id = session['id']
    cur.execute("SELECT * from user where u_id='"+ str(u_id)+"' ")
    rv=cur.fetchone()
    return jsonify(rv)

@app.route('/user/QuestionBank', methods=['GET'])
def getQuesBank():
    conn=mysql.connect()
    cur = conn.cursor()
    u_id=''
    if 'id' in session:
        u_id = session['id']
    cur.execute("SELECT * from question_bank where u_id='"+ str(u_id)+"' ")
    rv=cur.fetchall()
    return jsonify(rv)

@app.route('/user/participate', methods=['POST'])
def participate():
    conn=mysql.connect()
    cur = conn.cursor()
    u_id=''
    if 'id' in session:
        u_id = session['id']
    quiz_id = request.get_json()['quiz_id']
    feedback=None
    
    cur.execute("INSERT INTO user_participate_quiz (u_id, quiz_id, feedback) VALUES ('" + 
        str(u_id) + "', '" +
        str(quiz_id) + "', '" + 
        str(feedback) + "' )")
    conn.commit()
    
    result = {
        "success":"done"
    }

    return jsonify({'result' : result})

if __name__ == '__main__':
    app.run(debug=True)
