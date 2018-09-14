let questionNum = 0;
let time = 30;
var questionArr = [{
    question: "what does the cat say?",
    answer: ['moooo','baaaaa','meow','roof'],
    correctNum: [0,0,1,0]
},
{
    question: "what does the dog say?",
    answer: ['moooo','baaaaa','meow','roof'],
    correctNum: [0,0,0,1]   
}];
let isAnswer;
let myAnswer = 0;
let intervalId
let button

function setQuestion(arr){
    let question = $('.question');
    question.text(arr[questionNum].question);
    for(var i =0; i < arr[questionNum].answer.length; i++){
        let answer = $('<button>');
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
            $('.question').text('Out of Time!');
            getAnswer();
            $('.appendHere').hide();
            clearInterval(intervalId);
            setTimeout(function(){
                nextQuestion()
            }, 5000);
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
            $('.appendHere').hide();
            clearInterval(intervalId);
            printRightOrWrong(myAnswer);
            setTimeout(function(){
                nextQuestion()
            }, 5000);
        }else{
            $('.appendHere').hide();
            clearInterval(intervalId);
            getAnswer();
            printRightOrWrong(myAnswer)
            setTimeout(function(){
                nextQuestion()
            }, 5000);
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

function outOfTime(){
    setInterval(function(){
        if(parseInt($('.timer').text(0)) === 0){
            $('.question').text('Out of Time!');
            correctAnswer(button.text())
            console.log(parseInt($('.timer').text(0)) === 0);
        }
    }, 500)
}
function correctAnswer(theAnswer){
    $('#correctAnswer').text('The correct answer was: ' + theAnswer).show();
}


$(document).ready(function(){
    timerCountDown();
    setQuestion(questionArr);
    answerCheck();
})

    



