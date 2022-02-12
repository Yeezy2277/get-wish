import React from 'react';
import {TimerContainer, TimerNumber, TimerTexts, TimerTextSendAgain} from "../../styles/authSteps";

function EnterCodeStepTimer(props) {
    const [seconds, setSeconds ] = React.useState(60);
    React.useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(myInterval)
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });


    return (
        seconds !== 0 ?
            <TimerContainer>
                <TimerTexts>Отправить повторно</TimerTexts>
                <TimerNumber>0:{seconds}</TimerNumber>
            </TimerContainer>
         : <>
                <TimerContainer>
                    <TimerTextSendAgain>Отправить повторно</TimerTextSendAgain>
                </TimerContainer>
        </>
    );
}

export default EnterCodeStepTimer;
