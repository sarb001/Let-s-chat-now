import express from 'express' ;
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin: 'http://localhost:5173',
        methods: ['GET','POST'],
        credentials :true
    }
});

app.use(cors());
//io = circuit 


io.on('connection' , (socket) => {
    console.log('Connection created =',socket.id);
    
     socket.emit('wel' , 'Welcome from  Backend')
    //  socket.on('message' , (message) => {

    //         // recieve from frontend shown to all circuit 
    //         // io.emit('recieve',message)

    //         //( build like group chat show to all except client )
    //         // socket.broadcast.emit('recieve',message)

    //  })

    // for more than 1  data from frontend
     socket.on('message' , ({msg,roomid}) => {
        console.log('msg/room=', {msg,roomid});
        io.to(roomid).emit('recieve',msg);
    })

     socket.on('disconnect' , () => {
        console.log('User disconnect',socket.id);
     })

     socket.broadcast.emit('wel' , `Backend ${socket.id} joined the room`);
})



const PORT = 3000;

server.listen(PORT,() => {
    console.log(` Server / PORT Listening ${PORT}  Bro `); 
})