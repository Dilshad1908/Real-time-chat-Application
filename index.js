
const express= require('express')
const app=express()
// const path= require('path')
const port=process.env.PORT||9000

const http=require('http').createServer(app)
// socket.io setup

const io= require('socket.io')(http)
// for reading files inside public folder
app.use(express.static("public"))

//////////       ////////

const users={};     //empty object



io.on('connection',(socket)=>{        // for new connection 
    // console.log('heena is connected')
    // All .on will take a function
    socket.on('new-user-joined', name=>{        //'new-user-joined' is a event you can choose any name of the event as your choice
        users[socket.id]=name;  // inside the object a key value is added //  (cP8xeNWulPedsCpWAAAD:name) not (id:name)   [socket.id] se use unique id mil jayegi
        socket.broadcast.emit('user-joined',name)
        // console.log('new user',name)
        // console.log(users)
    })
// for sending message
    socket.on('send', message=>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    })
// for leaving chat
    socket.on('disconnect',message=>{       //connection and disconnect ko change nahi kar sakte ye inbuilt socket.io ka hai 
        socket.broadcast.emit('left',users[socket.id])      // users[socket.id] ye name hai
        delete users[socket.id]
    })

})

http.listen(port,()=>{
    console.log(`server is running at port :${port}`)
})