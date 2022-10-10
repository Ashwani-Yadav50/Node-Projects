const socket=io("http://localhost:8000")

var name= prompt("Enter your name to join the chat")
socket.emit("user-joined",name)

var section = document.querySelector(".mid-section")
function appenMessage(message,pos){
    var msg=document.createElement("div")
    msg.innerHTML=message
    msg.classList.add("alert")
    if(pos==="left")
    msg.classList.add("alert-primary")
    else
    msg.classList.add("alert-success")

    section.appendChild(msg)
}

socket.on("join",(name)=>{
    appenMessage(`${name} Joined the chat`,"left")
})

function sendMessage(){
    var msg=document.getElementById("message")
    appenMessage(`${msg.value} :You`,"right")
    socket.emit("send",msg.value)
    msg.value=""
}

socket.on("receive",(obj)=>{
    appenMessage(`${obj.name} :${obj.message}`,"left")
})

socket.on("left",(name)=>{
    appenMessage(`${name} Left the Chat`,"left")
})