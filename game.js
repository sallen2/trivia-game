// trivia game global vars and object
let numAnswerCorrect = 0;
let numAnswerWrong = 0;
let questionNum = 0;
let time = 30;
let isAnswer;
let myAnswer = 0;
let intervalId;
let slideUp = {
    distance: '1050%',
    origin: 'bottom',
    opacity: null
};
const questionArr = [{
    question: "Who sang Express Yourself?",
    answer: ['Run DMC','Sugar Hill Gang','The Fugees','NWA'],
    correctNum: [0,0,0,1]
},
{
    question: "What was 2Pac's 1st album called?",
    answer: ['Loyal To The Game','Until The End Of Time','The Lost Tapes','2Pacalypse Now'],
    correctNum: [0,0,0,1]   
},
{
    question: "Phife Dawg, Q-Tip, and Ali Shaheed Muhammad were the members of what rap group?",
    answer: ['De La Soul','A Tribe Called Quest','Arrested Development','Digital underground'],
    correctNum: [0,1,0,0]   
},
{
    question: "Complete these lyrics: 'Now in my younger days I used to sport a shag / When I went to school____________'",
    answer: ['I always had lots of swag','I flunked all my exams','I carried lunch in a bag','I did not have a backpack'],
    correctNum: [0,0,1,0]   
},
{
    question: "What was the name of Fresh Prince's DJ?",
    answer: ['DJ Duke of Earl','DJ Jazzy Jeff','DJ Funk Flexmaster','DJ King Coopa'],
    correctNum: [0,1,0,0]   
},
{
    question: "Which Nas song did Jay-Z sample for his song 'Dead Presidents'?",
    answer: ['The World is Yours','One Mic','If I Ruled The World','Made U Look'],
    correctNum: [1,0,0,0]   
},
{
    question: "Which is the only A Tribe Called Quest album to feature Jarobi White as a member of the group?",
    answer: ['The Low End Theory','Beats, Rhymes and Life',"People's Instinctive Travels and the Paths of Rhythm",'The Love Movement'],
    correctNum: [0,0,1,0]   
},
{
    question: "What was Outkast third studio album",
    answer: ['Southernplayalisticadillacmuzik','ATLiens','Stankonia','Aquemini'],
    correctNum: [0,0,0,1]   
},
{
    question: "Dre began his career as a member of",
    answer: ['NWA','Aftermath',"World Class Wreckin' Cru",'Interscope'],
    correctNum: [0,0,1,0]   
},
{
    question: "Hip Hop was created by..",
    answer: ['DJ Kool Herc','Afrika Bambaataa','The Sugarhill Gang','RUN DMC'],
    correctNum: [1,0,0,0]   
}];
// trivia game logic
function setQuestion(arr){
    let question = $('.question');
    $('.appendHere').show();
    question.text(arr[questionNum].question);
    for(var i =0; i < arr[questionNum].answer.length; i++){
        let answer = $('<button>');
        answer.addClass("buttonBlock center remove load-hidden")
        answer.attr('correct', arr[questionNum].correctNum[i]);
        $('.appendHere').append(answer.text(arr[questionNum].answer[i]));
        ScrollReveal().reveal('.buttonBlock', slideUp);
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
        var audio = new Audio('./audio/Knxwledge - KNX anthologhy TAPE 1.mp3');
        audio.play();
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



