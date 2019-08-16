import React from 'react';
import data from './data/data';
import Answers from './Answers';
import Popup from './Popup';
import './quiz-conduct.css';
import { Row, Col } from 'react-bootstrap';
import TimerComponent from './timer';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],//change to this
            nr: 0,
            total: data.length,
            showButton: false,
            allanswers : {},
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            solved:{},
            popup_text:'This is a quiz application built using ReactJS. <br /><br /> Currently it\'s loaded with CSS questions from W3Scools, but you can easily load any type of questions into it. <br /><br /> It will dynamically load the question->answers pair and upload them into the components.' ,
            classNames: ['', '', '', '']  
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.prevQuestion = this.prevQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
    }

    pushData(nr) {
        this.setState({
            question: data[nr].question,
            answers: [data[nr].answers[0], data[nr].answers[1], data[nr].answers[2], data[nr].answers[3]],
            correct: data[nr].correct,
            nr: this.state.nr + 1
        });
    }  
    
    componentDidMount(){
        //api call
    }
    
    pushDataPrev(nr) {
        this.setState({
            question: data[nr-2].question,
            answers: [data[nr-2].answers[0], data[nr-2].answers[1], data[nr-2].answers[2], data[nr-2].answers[3]],
            correct: data[nr-2].correct,
            nr: this.state.nr - 1
        });
    }

    setAnswers(question_answer){
        this.setState({
            allanswers : question_answer
        });
    }


    componentWillMount() {
        let { nr } = this.state;
        this.pushData(nr);
    }
    
    //maintaining class name  me dikat
    nextQuestion() {
        let { nr, total, score } = this.state;

        if(nr === total){
            this.calculateScore();
            this.setState({
                displayPopup: 'flex'
            });
        } else {
            this.pushData(nr);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
        }
        let selectedQustion = this.state.solved;
        if(this.state.allanswers[nr] != null){
            selectedQustion[nr] = true;
        }
        this.setState({
            classNames: ['','','',''],
            solved : selectedQustion
        });

        
    
    }
    
    prevQuestion() {
        let { nr, total, score } = this.state;
        this.pushDataPrev(nr);
        this.setState({
            showButton: false,
            questionAnswered: false
        });

        this.setState({
            classNames: ['','','','']
        })
    
    }

    calculateScore(){
        let answerd = this.state.allanswers;
        let da = data;
        let score = 0;

        for( let i in answerd){
            if(da[i-1].correct == answerd[i])score++;
        }
        console.log("score = " + score);
        //check this  set state its not working 
        this.setState({
            score : score,
            popup_text: 'You have completed the quiz. <br /> You got: <strong>' + score + '</strong> out of <strong>' +this.state.total +'</strong> questions right.'
        });
    }


    getSelectedQuestion = (questionid) => {
        let qid = questionid;
        this.setState({
            nr : qid+1,
            question: data[qid].question,
            answers: [data[qid].answers[0], data[qid].answers[1], data[qid].answers[2],
            data[qid].answers[3] ],
            correct: data[qid].correct,
        });
    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            nr: 1
        });
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score  + 1
        });
    }

    updateClassNames(newclassNames){
        this.setState({
            classNamess : newclassNames
        })

        setTimeout(() => {
            console.log(this.state.classNamess)
        }, 5000);
    }
    render() {
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score} = this.state;

        return (
            <div className="container">

                <Popup style={{display: displayPopup}} popup_text={this.state.popup_text} score={score} total={total} startQuiz={this.handleStartQuiz}/>

                <Row>
                    <Col md={{ span: 8  }}>
                        <div id="question">
                            <h4>Question {this.state.nr}/{total}</h4>
                            <p>{question}</p>
                        </div>
                        <Answers answers={answers} 
                        qid = {nr}
                        allanswers = {this.state.allanswers}
                        setAnswers = {(question_answer) => this.setAnswers(question_answer)}
                        updateClassNames={(newclassNames) => this.updateClassNames(newclassNames)}
                        classNamess={this.state.classNames} correct={correct} 
                        showButton={this.handleShowButton} isAnswered={questionAnswered} 
                        increaseScore={this.handleIncreaseScore}/>
                        <Row>
                        {nr > 1 ? 
                            <Col>
                                <div class="submit">

                                    <button className="fancy-btn" onClick={this.prevQuestion} >Previous Question</button> 
                                </div>
                            </Col>
                        : null}
                        {nr <= data.length ? 
                            <Col>
                                <div class="submit">
                                    <button className="fancy-btn" onClick={this.nextQuestion} >{nr===total ? 'Finish quiz' : 'Next question'}</button> 
                                </div>
                            </Col>
                        : null}
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <TimerComponent/>
                        </Row>
                        <Row>
                            {data.map((question, index) =>
                                <Col sm={3}>
                                    <div>                                        
                                    <button className= {this.state.solved[index+1]!=true ? "button button-w" : "button button-g"} 
                                        onClick={(e) => this.getSelectedQuestion(index)}>
                                        {index+1}</button>
                                    </div>
                            </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
                </div>
        );
    }
};

export default Main