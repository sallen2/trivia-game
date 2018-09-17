// trivia game global vars and object
let numAnswerCorrect = 0;
let numAnswerWrong = 0;
let questionNum = 0;
let time = 30;
let isAnswer;
let myAnswer = 0;
let intervalId;
const questionArr = [{
    question: "what does the cat say?",
    answer: ['moooo','baaaaa','meow','roof'],
    correctNum: [0,0,1,0]
},
{
    question: "what does the dog say?",
    answer: ['moooo','baaaaa','meow','roof'],
    correctNum: [0,0,0,1]   
},
{
    question: "what is 2 + 2",
    answer: ['4','7','10','3'],
    correctNum: [1,0,0,0]   
}];
// trivia game logic
function setQuestion(arr){
    let question = $('.question');
    $('.appendHere').show();
    question.text(arr[questionNum].question);
    for(var i =0; i < arr[questionNum].answer.length; i++){
        let answer = $('<button>');
        answer.addClass("buttonBlock center remove")
        answer.attr('correct', arr[questionNum].correctNum[i]);
        $('.appendHere').append(answer.text(arr[questionNum].answer[i]));
    }
}
function getAnswer(){
    let theAnswer
    for(var i = 0; i < questionArr[questionNum].correctNum.length; i++){
        if(questionArr[questionNum].correctNum[i] === 1){
            theAnswer = questionArr[questionNum].answer[i]
        }
    }
    correctAnswer(theAnswer);
}
function timerCountDown(){
    intervalId = setInterval(function(){
        time--;
        $('.timer').text(time);
        if(time === 0){
            numAnswerWrong++
            let isFinished = gameFinished();
            $('.question').text('Out of Time!');
            $('.appendHere').hide();
            clearInterval(intervalId);
            done(isFinished);
        }
    }, 1000)
}
function nextQuestion(){
        time = 30;
        questionNum++
        $('.appendHere').show();
        $('button').remove();
        $('#correctAnswer').hide();
        setQuestion(questionArr);
        timerCountDown();
}
function answerCheck(){
    $('.appendHere').on('click','button', function(){
        button = $(this);
        myAnswer = parseInt(button.attr('correct'));
        if(myAnswer === 1){
            numAnswerCorrect++
            $('.appendHere').hide();
            let isFinished = gameFinished();
            clearInterval(intervalId);
            printRightOrWrong(myAnswer);
            done(isFinished);
        }else{
            numAnswerWrong++
            $('.question').text(numAnswerCorrect);
            $('.appendHere').hide();
            let isFinished = gameFinished();
            printRightOrWrong(myAnswer)
            clearInterval(intervalId);
            done(isFinished);
        }
    })
}
function printRightOrWrong(answer){
    if(answer === 1){
        $('.question').text('Your Right!')
    }else{
        $('.question').text('Sorry Wrong Answer!')
    }
}
function correctAnswer(theAnswer){
    $('#correctAnswer').text('The correct answer was: ' + theAnswer).show();
}
function gameFinished(){
    if(questionNum === questionArr.length -1){
        getAnswer();
        setTimeout(function(){
            $('.question').hide();
            let numRight = $('<p>');
            numRight.addClass('text-center removeScoreBoard')
            numRight.text('right: ' + numAnswerCorrect)
            let numWrong = $('<p>');
            numWrong.addClass('text-center removeScoreBoard')
            numWrong.text('wrong: ' + numAnswerWrong)
            $('.scoreBoard').append(numRight);
            $('.scoreBoard').append(numWrong);
            let playAgain = $('<button>');
            playAgain.text('Play Again');
            playAgain.addClass('center removeScoreBoard');
            $('.scoreBoard').append($(playAgain));
            $('#correctAnswer').hide();
        },3000)
        return true;
    }else{
        return false;
    }
}
function playAgain(){
    $('.scoreBoard').on('click', 'button', function(){
        $('.question').show();
        $('.removeScoreBoard').remove();
        $('.remove').remove();
        numAnswerCorrect = 0;
        numAnswerWrong = 0;
        time = 30;
        questionNum = 0;
        timerCountDown();
        setQuestion(questionArr);
    })
}
function done(done){
    if(done === false){
        getAnswer();
        setTimeout(function(){
            nextQuestion()
        }, 3000);
    }
}
function start(){
    $('.startButton').on('click',function(){
        $('.countDown').show()
        $('.removeStartButton').remove();
        timerCountDown();
        setQuestion(questionArr);
        answerCheck();
        playAgain();
    })
}
// trivia game start
$(document).ready(function(){
    $('.countDown').hide()
    start();
})



