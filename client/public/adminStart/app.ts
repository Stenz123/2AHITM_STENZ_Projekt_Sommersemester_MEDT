start()
async function start() {
    document.cookie
    let response:string = await (await fetch("http://localhost:3050/verify/compareToken")).text()
    if(response!=="OK"){
        location.assign(`http://localhost:3050/adminLogin`);
    }
}