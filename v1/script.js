/*jshint esversion: 10*/
/*
copyright © 2022, calebwebdesigner
made by: https://github.com/calebwebdesigner
repo: https://github.com/calebwebdesigner/theWorkItTimer.js
*/


// global variables
// timer
let timerFunctionMinute = 240;
let timerFunctionSecond = 0;
let timerInterval = false;
const timerDisplayMinute = document.querySelector('#timer-minute');
const timerDisplaySecond = document.querySelector('#timer-second');
// timer button
let firstTimerButtonClick = true;
let pausedViaTimerButton = false;
const timerButton = document.querySelector('#timer-button');
// timer adjustment buttons
const addOneButton = document.querySelector('#add-1');
const addTenButton = document.querySelector('#add-10');
const removeOneButton = document.querySelector('#remove-1');
const removeTenButton = document.querySelector('#remove-10');
const resetButton = document.querySelector('#reset');
// last paused
const lastPaused = document.querySelector('#last-paused');
// popup that shows once timer runs out
const timerEndModal = document.querySelector('#timer-end-modal');
const timerEndModalCloseButton = document.querySelector('#timer-end-modal button');


// functions
// start timer
startTimer = () => {
    // timer started already, remove listener that starts timer
    timerButton.removeEventListener('mouseup', startTimer);
    // timer button cosmetics
    timerButton.removeEventListener('mouseout', timerButtonOutGreen);
    timerButton.addEventListener('mouseover', timerButtonOver);
    timerButton.addEventListener('mouseout', timerButtonOutBlue);
    timerButton.style['background-color'] = '#0091bc';
    timerButton.textContent = 'Timer running!';
    // if first time clicking timer button, set pausedViaTimerButton value to true, otherwise the first pause from the timer button won't update last paused
    if (firstTimerButtonClick) {
        pausedViaTimerButton = true;
        firstTimerButtonClick = false;
    }
    // if starting timer when seconds are right on 0, reset seconds and -1 to minute value
    if (timerFunctionSecond == 0) {
        timerFunctionMinute--;
        timerFunctionSecond = 59;
        timerDisplayMinute.textContent = timerFunctionMinute;
        timerDisplaySecond.textContent = timerFunctionSecond;
    }
    // timer countdown
    timerInterval = setInterval(() => {
        timerFunctionSecond--;
        // when seconds reach 1 digit, add a 0 to the front
        if (timerFunctionSecond < 10) {
            timerDisplaySecond.textContent = '0' + timerFunctionSecond;
        } else {
            timerDisplaySecond.textContent = timerFunctionSecond;
        }
        // congratulate user once timer runs out
        if (timerFunctionMinute <= 0 && timerFunctionSecond <= 0 || timerFunctionMinute <= 0) {
            timerEnd();
            clearInterval(timerInterval);
        // reset seconds and -1 to minute value on timer every minute
        } else if (timerFunctionSecond == 0) {
            timerFunctionMinute--;
            timerFunctionSecond = 59;
            timerDisplayMinute.textContent = timerFunctionMinute;
        }
    }, 1000);
    // pause timer
    timerButton.addEventListener('mouseup', pauseViaTimerButton);
};

// when paused via reset button
pauseViaResetButton = () => {
    // only run if timerInterval has been set/if the timer has been started
    if (timerInterval) {
        // stop timer, show PAUSED on timer button, set event listener to start timer
        clearInterval(timerInterval);
        timerButton.textContent = 'PAUSED';
        timerButton.addEventListener('mouseup', startTimer);
        // stop next click of timer button from updating last paused
        pausedViaTimerButton = false;
    }
};

// when paused via timer button
pauseViaTimerButton = () => {
    // update last paused
    if (pausedViaTimerButton == true) {
        localStorage.setItem('currentTimeMinute', timerFunctionMinute);
        localStorage.setItem('currentTimeSecond', timerFunctionSecond);
        lastPaused.textContent = 'Last paused @ ' + timerDisplayMinute.textContent + '-' + timerDisplaySecond.textContent;   
    }
    // stop timer, show PAUSED on timer button, set event listener to start timer
    pauseViaResetButton();
    // cause next pause to update last paused, unless the pause is caused by reset button
    pausedViaTimerButton = true;
};

// cosmetics of timer button
timerButtonOver = () => {
    timerButton.style['background-color'] = '#0091bc';
};
timerButtonOutGreen = () => {
    timerButton.style['background-color'] = '#37c77f';
};
timerButtonOutBlue = () => {
    timerButton.style['background-color'] = '#00c8f4';
};

// timer adjustments
addOne = () => {
    timerDisplayMinute.textContent = timerFunctionMinute += 1;
};
addTen = () => {
    timerDisplayMinute.textContent = timerFunctionMinute += 10;
};
removeOne = () => {
    timerDisplayMinute.textContent = timerFunctionMinute -= 1;
};
removeTen = () => {
    timerDisplayMinute.textContent = timerFunctionMinute -= 10;
};
reset = () => {
    // pause timer
    pauseViaResetButton();
    // reset timer values
    timerDisplayMinute.textContent = 240;
    timerDisplaySecond.textContent = "00";
    timerFunctionMinute = 240;
    timerFunctionSecond = 0;
};

// popup that shows once timer runs out
timerEnd = () => {
    timerEndModal.style.display = 'block';
    timerEndModalCloseButton.addEventListener('mouseup', timerEndModalClose);
};
// make timer end modal disappear when x is clicked
timerEndModalClose = () => {
    timerEndModal.style.display = 'none';
    timerEndModalCloseButton.removeEventListener('mouseup', timerEndModalClose);
};


// on page load
// reset last paused values in local storage
localStorage.clear();


// event listeners
// start timer
timerButton.addEventListener('mouseup', startTimer);
// timer button cosmetics
timerButton.addEventListener('mouseover', timerButtonOver);
timerButton.addEventListener('mouseout', timerButtonOutGreen);
// timer adjustments
addOneButton.addEventListener('mouseup', addOne);
addTenButton.addEventListener('mouseup', addTen);
removeOneButton.addEventListener('mouseup', removeOne);
removeTenButton.addEventListener('mouseup', removeTen);
resetButton.addEventListener('mouseup', reset);
// timer adjustment button cosmetics
document.querySelectorAll('.timer-adjustment').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style['box-shadow'] = '2px 2px 6px 0px #0000007d';
    });
    button.addEventListener('mouseup', () => {
        button.style['box-shadow'] = '0.8px 0.8px 3px 0px #0000007d';
    });
    button.addEventListener('mouseout', () => {
        button.style['box-shadow'] = '3px 3px 8px 0px #0000007d';
    });
});
