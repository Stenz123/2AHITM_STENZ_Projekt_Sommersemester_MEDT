let submitButtonId = document.getElementById("submitButton")
let passwordId:HTMLInputElement = <HTMLInputElement>document.getElementById("password")
let userId:HTMLInputElement = <HTMLInputElement>document.getElementById("user")

submitButtonId.addEventListener("click",async function(){
  let password = passwordId.value
  let user = userId.value
  document.cookie=""
  let response = await fetch("http://localhost:3050/verify/" , {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user:user,
        password:password
      })
    })
    console.log(getCookie("token1"));
    location.assign(`http://localhost:3050/adminStart`);
})

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';') ;
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}