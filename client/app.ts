import express from "express"

const app = express()

app.use(express.static('public'))

app.listen(3050,function(){
    console.log("Server listening on port 3050");
})