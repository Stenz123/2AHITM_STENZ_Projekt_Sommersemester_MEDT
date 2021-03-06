import express from "express"
import { readFile, writeFile } from "fs/promises";
import { StatusCodes } from "http-status-codes"
import { join } from "path";
import { Quiz, Question, Answer } from "./interfaces";
import fetch from 'node-fetch';

export const quizzRouter = express.Router()

const allQuizPath:string = "./storage/allQuizz.json"

quizzRouter.get("/",async function(request,response){
    let cache =  await readJsonFile(allQuizPath)
    response.json(cache)
})
quizzRouter.get("/length",async function(request,response){
    let cache: Quiz[]|undefined=  await readJsonFile(allQuizPath)
    if(cache==undefined) response.status(StatusCodes.OK).send("0")
    else response.status(StatusCodes.OK).send(String(cache.length))
})
quizzRouter.get("/day",function(request,response){
    response.status(StatusCodes.OK).send(quizOfTheDay.toString())
})


quizzRouter.get("/:index",async function (request, response) {
    let allQuizzes = await readJsonFile(allQuizPath)

    const index: number = parseInt(request.params.index);
    if (isNaN(index) || index < 0 || allQuizzes==undefined || index >= allQuizzes.length) {
        response.sendStatus(StatusCodes.NOT_FOUND);      
        return;
    }
    response.status(StatusCodes.OK).json(allQuizzes[index]);
})

quizzRouter.post("/", async function (request, response) {
    let allQuizzes:Quiz[]|undefined= await readJsonFile(allQuizPath)
    if(allQuizzes!=undefined){
        const data: Quiz = request.body.data
        allQuizzes.push(data)

        let path = join(__dirname,allQuizPath)

        writeFile(path, JSON.stringify(allQuizzes,null,"\t"), "utf8")
        response.status(StatusCodes.CREATED).json(data);
    }else response.sendStatus(StatusCodes.NOT_FOUND)
});

quizzRouter.delete("/:index",async function (request, response) {
    let allQuizzes:Quiz[]|undefined=await readJsonFile(allQuizPath)

    const index: number = parseInt(request.params.index);
    if (isNaN(index) || index < 0 || allQuizzes==undefined ||  index > allQuizzes.length-1) {
        response.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    allQuizzes.splice(index, 1);
    let path = join(__dirname,allQuizPath)
    writeFile(path, JSON.stringify(allQuizzes,null,"\t"), "utf8")
    response.sendStatus(StatusCodes.NO_CONTENT);
});

quizzRouter.delete("/",function (request, response) {
    let path = join(__dirname,allQuizPath)
    writeFile(path, "[]", "utf8")
    response.sendStatus(StatusCodes.NO_CONTENT);
})


async function readJsonFile(path:string){
    try{
        let completePath = join(__dirname,path)
        let result : Quiz[]= JSON.parse(await readFile(completePath,"utf-8"))
        return result
    }catch{console.error()}
}

let quizOfTheDay:number = 0

newQuizOfTheDay()
setInterval(newQuizOfTheDay,1000*60*60*24)

async function newQuizOfTheDay(){
    let length = await fetch(`http://localhost:3000/api/quizz/length`)
    let max = Number(await length.text())
    let random:number = Math.floor(Math.random()*(max))
    quizOfTheDay =random
}