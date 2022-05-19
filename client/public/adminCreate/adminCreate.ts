import { Quiz, Question, Answer } from "./interfaces";

async function start() {
    let response = await fetch("http://localhost:3050/verify/compareToken")    
    
}

if(false){
    location.assign(`http://localhost:3050/adminLogin`);
}

const QUIZ_SAVE_DIRECTORY:string = "../quizzes/quizzes.json"
const MAX_QUESTIONS:number = 4

console.log("start");


let container = <HTMLDivElement> document.getElementById("quizz")
let buttons = <HTMLDivElement> document.getElementById("buttonsQuiz")
let currentQuiz:Quiz 

document.getElementById("newQuizButtnon").addEventListener("click",newQuiz)

function newQuiz(){
    container = <HTMLDivElement> document.getElementById("quizz")
    let quizName:string = (<HTMLInputElement> document.getElementById("quizName")).value

    if(quizName!=""){   
        document.getElementById("quizName").remove()
        currentQuiz={
            quizName:quizName,
            questions:[]
        }
        container.innerHTML+=`
            <h1>${quizName}</h1>
        `
        buttons.innerHTML=`
            <div class="button" id="submitQuiz">Submit Quiz</div>
            <div class="button" id="newQuestion">New Question</div>
        `
        newQuestion	()
        document.getElementById("submitQuiz").addEventListener("click",submitQuiz)
        document.getElementById("newQuestion").addEventListener("click",newQuestion)
    }
}
function updateNumberOfQuestions(thisObject:HTMLSelectElement){
    container = <HTMLDivElement> document.getElementById("quizz")
    let parrent = thisObject.parentElement.parentElement.getElementsByClassName("answers")[0]
    let selectedNumberOfAnswers = parseInt(thisObject.value)

    let answers = parrent.getElementsByClassName("answer")
 
    while(answers[0]) {
    answers[0].parentNode.removeChild(answers[0]);
    }​
    for(let i = 0; i<selectedNumberOfAnswers; i++){
        parrent.innerHTML+=`
                    <div class="answer">
                        <input class="questionText" type="text" placeholder="answer">
                        <input class="questionCheckBox" type="checkBox">
                    </div>
                    `
    }
}
function newQuestion(){
    container.innerHTML+=`
            <div class="currentQuestion">
                <div class="answers">
                    <input class="questionName" type="text" placeholder="Question">
                    <div class="answer">
                        <input class="questionText" type="text" placeholder="answer">
                        <input class="questionCheckBox" type="checkBox">
                    </div>
                    <div class="answer">
                        <input class="questionText" type="text" placeholder="answer">
                        <input class="questionCheckBox" type="checkBox">
                    </div>
                    <div class="answer">
                        <input class="questionText" type="text" placeholder="answer">
                        <input class="questionCheckBox" type="checkBox">
                    </div>
                    <div class="answer">
                        <input class="questionText" type="text" placeholder="answer">
                        <input class="questionCheckBox" type="checkBox">
                    </div>    
                </div>
                <div class="buttonsQuestion">
                    <select class="dropDown" name="Number of questions">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4" selected>4</option>
                    </select>
                    <div class="deleteButton button">X</div>
                </div>   
            </div>
            `
    let selectElements =  document.getElementsByTagName("select")
    for (let i = 0; i < selectElements.length; i++) {
        selectElements[i].addEventListener('change', function(){updateNumberOfQuestions(selectElements[i])});
    }
    let removeButtons = document.getElementsByClassName("deleteButton")
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', function(){deleteQuestion(removeButtons[i])});
    }
}

function deleteQuestion(thisObject: Element){
    console.log(thisObject.parentElement.parentElement);
    
    thisObject.parentElement.parentElement.remove()
}

async function submitQuiz(){
    let questions:HTMLCollection=(<HTMLCollection>document.getElementsByClassName("currentQuestion"))
    for(let i = 0; i<questions.length;i++){
        let question:Question={
            question: (<HTMLInputElement>document.getElementsByClassName("questionName")[i]).value,
            answers:[]
        }
        let currentAnswers = document.getElementsByClassName("answers")[i]
        let answers = currentAnswers.getElementsByClassName("questionText")
        let checkBoxes = currentAnswers.getElementsByClassName("questionCheckBox")
        for(let i = 0; i<answers.length;i++){
            let answer:Answer={
                text:(<HTMLInputElement>answers[i]).value,
                isCorrect:(<HTMLInputElement>checkBoxes[i]).checked
            }
            question.answers.push(answer)
        }
        currentQuiz.questions.push(question)
    }

    await fetch("http://localhost:3000/api/quizz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data:currentQuiz
        })
    })
}