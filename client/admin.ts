import express from "express";
import {compare, hash} from 'bcrypt'
import { StatusCodes } from "http-status-codes";
import { TokenBase, TokenGenerator } from "ts-token-generator";


const saltRounds = 10
const adminHash = "$2b$10$mt48/HbgcYspR5kIkoyv0.gYmhnAdviDn23NCWhM/arPogJ7UpmOu"
const adminUser ="admin"

export const adminRouter = express.Router()

adminRouter.post("/",async function(request,response){
  let password = request.body.password
  let user = request.body.user

  if(await compare(password,adminHash)&&user==="admin"){
    response.cookie("token1",token)
    response.redirect("../adminCreate")
    //.redirect("http://localhost:3050/adminCreate")
    console.log("ok");
    
  }else{
    response.sendStatus(StatusCodes.OK)
  }
})

adminRouter.get("/compareToken/",function(request,response){
  console.log(token);
  
  if(request.cookies.token1===token){
    console.log("tedfbrsvf")
    response.status(StatusCodes.OK).send("CORRECT")
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

/*hashTest()
async function hashTest() {
  let hashPw =await hash("admin",10)
  console.log(hashPw);
  if(await compare("admin",adminHash)){
    console.log("YES");
    
  }
}*/
