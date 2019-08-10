from app import app
from flaskext.mysql import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

mysql = MySQL(app)
jwt = JWTManager(app)
CORS(app)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'ayush'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'quizzinga'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
