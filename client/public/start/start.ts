const SERVER_IP:string = "localhost:3000"
const LOAD_QUIZ_URL:string = "localhost:3050/loadQuiz"

document.getElementById("getQuiz").addEventListener("click",function(){
    let inputID:HTMLInputElement = <HTMLInputElement>document.getElementById("getQuizIdInput")
    let id:number = Number(inputID.value)
    loadQuiz(id)
})

setup()
async function setup(){
    let data =await fetch(`http://localhost:3000/api/quizz/length`)
    let max = Number(await data.text())-1
    document.getElementById("getQuizIdInput").setAttribute("max",String(max))
}

function loadQuiz(id:number){
    location.assign(`http://${LOAD_QUIZ_URL}/?index=${id}`);
}