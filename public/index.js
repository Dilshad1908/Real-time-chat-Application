const socket=io()

const form = document.getElementById('send-container')
const messageInp = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
// creating element for emmiting message that someone has joined
const notification= (message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText= message
    messageElement.style.color="blue"
    messageElement.style.background="white"
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)


}

const name = prompt('Enter your name to join')

socket.emit('new-user-joined',name)     // now socket.on will be invoked on server side

socket.on('user-joined',name=>{
    notification(`${name} joined the chat`, 'right')

})



