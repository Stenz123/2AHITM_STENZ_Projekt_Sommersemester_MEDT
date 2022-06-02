import { Quiz } from "../adminCreate/interfaces";

start()
async function start() {
    let response:string = await (await fetch("http://localhost:3050/verify/compareToken")).text()
    if(response!=="OK"){
        location.assign(`http://localhost:3050/adminLogin`);
    }
}

let quizBox = document.getElementById("quizzes")
displayAll()
async function displayAll(){
    let quizzes:Quiz[] = await fetchRestEndpoint("http://localhost:3000/api/quizz","GET")
    quizzes.forEach(Element => {
        quizBox.innerHTML+=`
            <div class="quizzes">
                <div class="quizzesHeader">
                    <h2>${Element.quizName}</h2>
                    <div class="deleteButton">X</div>
                </div>
            </div>
        `
        let quizzeClass = document.getElementsByClassName("quizzes")
        
        Element.questions.forEach(i => {
            quizzeClass[quizzeClass.length-1].innerHTML+=`<h3>${i.question}</h3><div class="answers"></div>`
            let lastDivTag= document.getElementsByTagName("div")[document.getElementsByTagName("div").length-1]
            
            i.answers.forEach(j => {
                let color = j.isCorrect ? "green" : "red"
                lastDivTag.innerHTML+=`<p style="color:${color}">${j.text}</p>`
            });
            
        })
        quizBox.innerHTML+=`<hr>`
    })
    let removeButtons = document.getElementsByClassName("deleteButton")
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', async function(){
            let isExecuted = confirm("Are you sure to delete this Object?");
            if(!isExecuted)return
            await fetchRestEndpoint(`http://localhost:3000/api/quizz/${i}`, "DELETE")
            location.reload()
        });
    }
}

async function fetchRestEndpoint(route: string, method: "GET" |"POST" |"PUT" |"DELETE", data?: object): Promise<any> {
    let options: any = { method };
    if (data) {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(data);
    }
    const res = await fetch(route, options);
    if (!res.ok) {
        const error = new Error(`${method} ${res.url} ${res.status} (${res.statusText})`);
        throw error;
    }
    if (res.status !== 204) {
        return await res.json();
    } 
}