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
    io.emit('wel' , 'Sent from  Backend')
})



const PORT = 3000;

server.listen(PORT,() => {
    console.log(` Server / PORT Listening ${PORT}  Bro `); 
})