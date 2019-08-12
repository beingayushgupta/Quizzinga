import React from 'react';

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
        }
        
        this.selectAnswer1 = this.selectAnswer1.bind(this);
        this.selectAnswer2 = this.selectAnswer2.bind(this);
        this.selectAnswer3 = this.selectAnswer3.bind(this);
        this.selectAnswer4 = this.selectAnswer4.bind(this);

        
    }

    
    selectAnswer1(e) {
        console.log("adsda");
        let elem = e.currentTarget;
        let answer = Number(elem.dataset.id);
        let updatedClassNames = this.props.classNamess;
        for(let i in updatedClassNames){
            updatedClassNames[i] = '';
        }
        updatedClassNames[answer-1] = 'right';
        let prev_answers = this.props.allanswers;
        prev_answers[this.props.qid] = 1;
        this.props.setAnswers(prev_answers);
        // this.props.selectAnswer()         
    }
    selectAnswer2(e) {
        let elem = e.currentTarget;
        let answer = Number(elem.dataset.id);
        let updatedClassNames = this.props.classNamess;
        for(let i in updatedClassNames){
            updatedClassNames[i] = '';
        }
        updatedClassNames[answer-1] = 'right';
        let prev_answers = this.props.allanswers;
        prev_answers[this.props.qid] = 2;
        this.props.setAnswers(prev_answers);
        // this.props.selectAnswer()         
    }
    selectAnswer3(e) {
        let elem = e.currentTarget;
        let answer = Number(elem.dataset.id);
        let updatedClassNames = this.props.classNamess;
        for(let i in updatedClassNames){
            updatedClassNames[i] = '';
        }
        updatedClassNames[answer-1] = 'right';
        let prev_answers = this.props.allanswers;
        prev_answers[this.props.qid] = 3;
        this.props.setAnswers(prev_answers);
        // this.props.selectAnswer()         
    }
    selectAnswer4(e) {
        let elem = e.currentTarget;
        let answer = Number(elem.dataset.id);
        let updatedClassNames = this.props.classNamess;
        for(let i in updatedClassNames){
            updatedClassNames[i] = '';
        }
        updatedClassNames[answer-1] = 'right';
        let prev_answers = this.props.allanswers;
        prev_answers[this.props.qid] = 4;
        this.props.setAnswers(prev_answers);
        // this.props.selectAnswer()         
    }


    render() {
        let { answers } = this.props;
        let { classNamess } = this.props;
        let transition = {
            transitionName: "example",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 300
        }
        
        return (
            <div id="answers" >
                <ul>
                    <li onClick={this.selectAnswer1} className={classNamess[0]} data-id="1"><span>A</span> <p>{answers[0]}</p></li>
                    <li onClick={this.selectAnswer2} className={classNamess[1]} data-id="2"><span>B</span> <p>{answers[1]}</p></li>
                    <li onClick={this.selectAnswer3} className={classNamess[2]} data-id="3"><span>C</span> <p>{answers[2]}</p></li>
                    <li onClick={this.selectAnswer4} className={classNamess[3]} data-id="4"><span>D</span> <p>{answers[3]}</p></li>
                </ul>
            </div>
        );
    }
}

export default Answers