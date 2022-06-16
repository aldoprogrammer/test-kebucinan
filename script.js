 <script>
    // select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Apakah kamu mau ciuman ama pacar kamu?",
        imgSrc : "https://i.pinimg.com/736x/a0/33/ba/a033babd99f1fae12febde3c299942a9.jpg",
        choiceA : "Pernah",
        choiceB : "Mau",
        choiceC : "Engga",
        correct : "A"
    },{
        question : "Apakah kamu mau ujan-ujanan sama pacar?",
        imgSrc : "https://i.pinimg.com/736x/f1/64/a0/f164a09f2407c5898f83fd61f6114fef.jpg",
        choiceA : "Ew ga deh",
        choiceB : "Boleh juga",
        choiceC : "Ga tar masuk angin",
        correct : "B"
    },{
        question : "Apakah kamu mau saling suap-suapan?",
        imgSrc : "https://i.pinimg.com/200x150/2d/c3/ad/2dc3adbcd310890fc8e9676bc2cc5df1.jpg",
        choiceA : "Nopee",
        choiceB : "Kea anak kecil dong",
        choiceC : "Boljug tuhh ide bagus",
        correct : "C"
    },
    {
        question : "Apakah kamu mau selfie bareng?",
        imgSrc : "https://aissadione.net/web/wallpapers/gambar-kartun-pacaran-romantis-ke-5/720x1280.jpg",
        choiceA : "Kalo lagi mood",
        choiceB : "Mau",
        choiceC : "Kalo lagi berdua sabi",
        correct : "C"
    }
    ,{
        question : "Apakah kamu mau kirim go-food?",
        imgSrc : "https://png.pngtree.com/png-vector/20220108/ourlarge/pngtree-cartoon-character-courtship-decoration-material-pattern-png-image_4227884.png",
        choiceA : "Gada uang",
        choiceB : "Buat ayang mah bole ",
        choiceC : "Mending nabung",
        correct : "C"
    }
    ,{
        question : "Apakah kamu mau sleep call tiap malam?",
        imgSrc : "https://cdn.popbela.com/content-images/post/20190515/1-4a102407569337e4d1554e55b0ca534e.jpg",
        choiceA : "Asik tu kea nya",
        choiceB : "Gada kerjaan lu",
        choiceC : "Nyari yang baru lah",
        correct : "A"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML += "<p>Kamu "+ scorePerCent +"% Bucin</p>";
}
