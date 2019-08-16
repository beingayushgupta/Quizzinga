import React from 'react';
// import logo from './logo.svg';
import 'normalize.css';
import './App.css';
import NavbarComponent from './navbar/navbar';
import CreateQuiz from "./create-quiz/create-quiz";
import Dashboard from "./dashboard/dashboard";
import Login from './navbar/Login';
import Register from './navbar/Register';
import ProfileComponent from './profile/profile';
import QuizComponent from './quiz/quiz';
import QuestionBank from './questionbank/questionbank';
import EditQuestionBank from './questionbank/edit-question-bank';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Main from './conduct-quiz/quiz-conduct'; 
class App extends React.Component{

  render(){
      return (
        <React.Fragment>
          <Router>
            <div className="App-intro">
              <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/quiz" component={QuizComponent}/>
                <Route exact path="/quiz/create"  component={CreateQuiz} />
                <Route exact path="/questionbank" component={QuestionBank}/>
                <Route exact path="/questionbank/id/edit" component={EditQuestionBank}/>
                {/* <Route exact path="/questionbank/create" component={CreateQuestionBank}/> */}
                <Route exact path="/profile" component={ProfileComponent}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/quiz/1/conduct" component={Main}/>
                <Route exact path="/" component={Login}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                
              </Switch>    
          </div>
        </Router>
        </React.Fragment>
      );
  }
}

export default App;
