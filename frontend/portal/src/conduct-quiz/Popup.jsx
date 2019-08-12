import React from 'react';
import { Container, Col } from 'react-bootstrap';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: 'Welcome to Quizz',
            buttonText: 'Start the quiz' 
        };
        
        this.popupHandle = this.popupHandle.bind(this);
    }
    
    popupHandle() {
        let { time } = this.state;
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Congratulations!',
                buttonText: 'Finish'
            });
            this.props.startQuiz();
        } else {            
            window.location = "/";// restart the application
        }
    }
    
    createMarkup(text) {
        return {__html: text};
    }
    
    
    render() {
       
        let { title, buttonText } = this.state;
        
        let { style, popup_text} = this.props;
        
        return (
            <div className="popup-container" style={style}>
                <Container>
                    <Col md={{ span:10, offset:1}}>
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={this.createMarkup(popup_text)} />
                            <button className="fancy-btn" onClick={this.popupHandle}>{buttonText}</button>
                        </div>
                    </Col>
                        
                </Container>
            </div>
        );
    }
}

export default Popup
