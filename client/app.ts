import cors from "cors"
import express from "express"
import { adminRouter } from "./admin.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/verify/",adminRouter)
app.use(express.static('public'))

app.listen(3050,function(){
    console.log("Server listening on port 3050");
})