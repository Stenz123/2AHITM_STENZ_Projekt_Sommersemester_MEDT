import express from "express";
import {compare, hash} from 'bcrypt'
import { StatusCodes } from "http-status-codes";
import { TokenBase, TokenGenerator } from "ts-token-generator";
import { nextTick } from "process";


const saltRounds = 10
const adminHash = "$2b$10$mt48/HbgcYspR5kIkoyv0.gYmhnAdviDn23NCWhM/arPogJ7UpmOu"
const adminUser ="admin"

export const adminRouter = express.Router()

adminRouter.post("/",async function(request,response, next){
  let password = request.body.password
  let user = request.body.user

  if(await compare(password,adminHash)&&user===adminUser){
    response.cookie('token1', token)
    next()
  }else{
    next()
  }
})

adminRouter.post("/compareToken/",function(request,response){
  let token1=request.body.cookie
  token1=token1.substring(7)
  if(token1===token){
    console.log("OK");
    
    response.status(StatusCodes.OK).send("OK")
    return
  }
  response.status(StatusCodes.FORBIDDEN).send("Acces denied")
})

let token

const tokgen = new TokenGenerator({ bitSize: 512, baseEncoding: TokenBase.BASE62 });
 newToken()
setInterval(newToken,86400000)
function newToken(){
  token= tokgen.generate();
}