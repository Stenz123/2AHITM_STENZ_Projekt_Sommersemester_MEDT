import express from "express"
import cors from "cors"
import { quizzRouter } from "./quizz-router"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/quizz",quizzRouter)

app.listen(3000,function(){
    console.log("Server listening on port 3000");
})