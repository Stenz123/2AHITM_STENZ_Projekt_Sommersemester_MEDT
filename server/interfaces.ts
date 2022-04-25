/******INTERFACES*******/
export interface Quiz{
    quizName:String
    questions:Question[]
}

export interface Question{
    question:String
    answers:Answer[]
}

export interface Answer{
    text:String
    isCorrect:boolean
}
/**********************/