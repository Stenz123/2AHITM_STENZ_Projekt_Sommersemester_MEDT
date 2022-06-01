import { Quiz } from "../adminCreate/interfaces";

let quizBox = document.getElementById("quizzes")
displayAll()
async function displayAll(){
    let quizzes:Quiz[] = await fetchRestEndpoint("http://localhost:3000/api/quizz","GET")
    quizzes.forEach(Element => {
        quizBox.innerHTML+=`
            <div class="quizzes">
                <h2>${Element.quizName}</h2>
                <button class="deleteButton">X</button>
            </div>
        `
        let quizzeClass = document.getElementsByClassName("quizzes")
        
        Element.questions.forEach(i => {
            quizzeClass[quizzeClass.length-1].innerHTML+=`<p>${i.question}</p><p></p>`
            let pTag= document.getElementsByTagName("p")[document.getElementsByTagName("p").length-1]
            i.answers.forEach(j => {
                pTag.innerHTML+=`${j.text} ${j.isCorrect} | `
            });
            
        })
        let removeButtons = document.getElementsByClassName("deleteButton")
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener('click', async function(){
                await fetchRestEndpoint(`http://localhost:3000/api/quizz/${i}`, "DELETE")
                location.reload()
            });
        }
        console.log(Element);
    }); 
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