import { Quiz } from "../adminCreate/interfaces"

const SERVERIP:string = "localhost:3000"
const url = window.location.href

let questionCounter = -1;

//console.log(Number(getAllUrlParams(url).index));

load()
async function load(){
  let id:number = Number(getAllUrlParams(url).index)
  if(id === NaN ){
    console.log("400: Wrong Parameter")
    document.body.innerHTML="400: Wrong Parameter"
    return
  }
  let json:Quiz
  try {
    let response:Response = await fetch(`http://${SERVERIP}/api/quizz/${id}`)
    json = await response.json()
  } catch (error) {
    console.log(error);
    document.body.innerHTML="404: Not Found"
    return
  }
  
  questionCounter++
  
  document.body.innerHTML=`
  <div id="quiz">
    <h1>${json.quizName}</h1>
      <div>
        <h2>${json.questions[questionCounter].question}</h2>
        <div id="grid"></div>
    </div>
  </div>
  `
  for(let i = 0; i < json.questions[questionCounter].answers.length; i++){
    document.getElementById("grid").innerHTML+=`
    <div class="answer"><p>${json.questions[questionCounter].answers[i].text}</p></div>`
  }
}


interface ReturnObj {
    [key: string]: any
}

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj: ReturnObj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}