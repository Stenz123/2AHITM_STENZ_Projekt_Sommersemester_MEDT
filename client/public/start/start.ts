const SERVER_IP:string = "localhost:3000"

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
    ///////////////////////////////
}