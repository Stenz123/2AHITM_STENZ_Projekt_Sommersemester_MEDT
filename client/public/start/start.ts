import { Quiz } from "../adminCreate/interfaces"

const SERVER_IP:string = "localhost:3000"
const LOAD_QUIZ_URL:string = "localhost:3050/loadQuiz"

setup()
async function setup(){
    let data =await fetch(`http://localhost:3000/api/quizz/length`)
    let max = Number(await data.text())-1
    let random = Math.floor(Math.random()*max)
    document.getElementById("startQuiz").setAttribute("onclick",`location.assign('http://localhost:3050/loadQuiz/?index=${random}')`)
    data = await fetch(`http://localhost:3000/api/quizz/${random}`)
    let quiz:Quiz = await data.json()
    document.getElementById("quizTitle").innerHTML = <string>quiz.quizName
    document.getElementById("quizDescription").innerHTML = `${quiz.questions.length} questions | Ca. ${quiz.questions.length*15/60} minutes`

    data = await fetch(`http://localhost:3000/api/quizz/day`)
    let number = (await data.text())
    
    console.log(number);
    
    data = await fetch(`http://localhost:3000/api/quizz/${number}`)
    quiz = await data.json()

    document.getElementById("dailyQuizTitle").innerHTML = <string>quiz.quizName 
    document.getElementById("dalyQuizDescription").innerHTML = `${quiz.questions.length} questions | Ca. ${quiz.questions.length*15/60} minutes`
    document.getElementById("startDailyQuiz").setAttribute("onclick",`location.assign('http://localhost:3050/loadQuiz/?index=${number}')`)

}

function loadQuiz(id:number){
    location.assign(`http://${LOAD_QUIZ_URL}/?index=${id}`);
}