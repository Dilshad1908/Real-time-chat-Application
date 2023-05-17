const socket=io()

const form = document.getElementById('send-container')
const messageInp = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
const audio= new Audio('tone.mp3')
// creating element for emmiting message that someone has joined
const notification= (message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText= message
    messageElement.style.color="blue"
    messageElement.style.background="white"
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    audio.play()


}

// for creating new div for any type message
const sendMessage= (message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText= message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position==='left'){
        audio.play()
    } 


}
// notification message for left the chat 
const Left= (message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText= message
    messageElement.style.color="red"
    messageElement.style.background="white"
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    audio.play()


}

form.addEventListener('submit',(e)=>{
    e.preventDefault()   // page will not reload
    const message=messageInp.value;
    sendMessage(`${message}`,'right')
    // for sending message
    socket.emit('send',message);
    messageInp.value = ''       // for clearing again message box

})
/// starting point ////
const name = prompt('Enter your name to join')

socket.emit('new-user-joined',name)     // now socket.on will be invoked on server side

socket.on('user-joined',name=>{
    notification(`${name} joined the chat`, 'right')

})
// for receiving message
socket.on('receive', data=>{    // data asal me object hai jo message and name lega hamne a server side set kar rkaha tha 
    sendMessage(`${data.name}:${data.message}`,'left')
})
// for leaving chat
socket.on('left', name=>{    
    Left(`${name} left the chat`,'left')
})





