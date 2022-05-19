import express from "express"
import { readFile, writeFile } from "fs/promises";
import { StatusCodes } from "http-status-codes"
import { join } from "path";
import { Quiz, Question, Answer } from "./interfaces";

export const quizzRouter = express.Router()

const allQuizPath:string = "./storage/allQuizz.json"

quizzRouter.get("/",async function(request,response){
    if(!await checkToken()){
        console.log("noAcces");
        return  
    }
    let cache =  await readJsonFile(allQuizPath)
    response.json(cache)
})
quizzRouter.get("/length",async function(request,response){
    if(!await checkToken()){
        console.log("noAcces");
        return
    }
    let cache: Quiz[]|undefined=  await readJsonFile(allQuizPath)
    if(cache==undefined) response.status(StatusCodes.OK).send("0")
    else response.status(StatusCodes.OK).send(String(cache.length))
})

quizzRouter.get("/:index",async function (request, response) {
    if(!await checkToken()){
        console.log("noAcces");
        return
    }
    let allQuizzes = await readJsonFile(allQuizPath)

    const index: number = parseInt(request.params.index);
    if (isNaN(index) || index < 0 || allQuizzes==undefined || index >= allQuizzes.length) {
        response.sendStatus(StatusCodes.NOT_FOUND);      
        return;
    }
    response.status(StatusCodes.OK).json(allQuizzes[index]);
})

quizzRouter.post("/", async function (request, response) {
    if(!await checkToken()){
        console.log("noAcces");
        return
    }
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
    if(!await checkToken()){
        console.log("noAcces");
        return
    }
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

async function checkToken() {
    let response = await(await fetch('http://localhost:3050/verify/compareToken')).text()
    if(response==="OK")return true
    return false
}

async function readJsonFile(path:string){
    try{
        let completePath = join(__dirname,path)
        let result : Quiz[]= JSON.parse(await readFile(completePath,"utf-8"))
        return result
    }catch{console.error()}
}