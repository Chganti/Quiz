const questions = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "int", correct: false },
      { text: "string", correct: false },
      { text: "float", correct: false }
    ]
  },
  {
    question: "Which method is used to convert JSON to a JavaScript object?",
    answers: [
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.convert()", correct: false },
      { text: "JSON.parse()", correct: true },
      { text: "JSON.object()", correct: false }
    ]
  },
  {
    question: "What does 'async' keyword do?",
    answers: [
      { text: "Stops code execution", correct: false },
      { text: "Runs code faster", correct: false },
      { text: "Creates a loop", correct: false },
      { text: "Makes a function return a Promise", correct: true }
    ]
  },
  {
    question: "Which method is used to add an element at the end of an array?",
    answers: [
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "push()", correct: true },
      { text: "unshift()", correct: false }
    ]
  },
  {
    question: "What is the default value of an uninitialized variable?",
    answers: [
      { text: "null", correct: false },
      { text: "undefined", correct: true },
      { text: "0", correct: false },
      { text: "NaN", correct: false }
    ]
  },
  {
    question: "Which operator is used to compare both value and type?",
    answers: [
      { text: "===", correct: true },
      { text: "==", correct: false },
      { text: "=", correct: false },
      { text: "!=", correct: false }
    ]
  },
  {
    question: "Which array method returns a new array?",
    answers: [
      { text: "forEach()", correct: false },
      { text: "push()", correct: false },
      { text: "pop()", correct: false },
      { text: "map()", correct: true }
    ]
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Model", correct: false },
      { text: "Document Oriented Model", correct: false },
      { text: "Digital Object Method", correct: false }
    ]
  },
  {
    question: "Which method is used to attach an event handler?",
    answers: [
      { text: "addEvent()", correct: false },
      { text: "onClick()", correct: false },
      { text: "addEventListener()", correct: true },
      { text: "attachEvent()", correct: false }
    ]
  },
  {
    question: "Where is data stored permanently in the browser?",
    answers: [
      { text: "localStorage", correct: true },
      { text: "sessionStorage", correct: false },
      { text: "cookies", correct: false },
      { text: "variables", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answers");
const nextButton = document.getElementById("Next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Paly Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
