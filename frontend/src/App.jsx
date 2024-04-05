import { useEffect, useMemo, useState } from 'react';
import  { io } from 'socket.io-client' ;

function App() {

  // for  avoiding re-rendering 
  const socket =   useMemo(() =>  io("http://localhost:3000") ,[]);

  const[msg,setmsg]= useState('');
  const[roomid,setroomid] = useState('');
  const[socketid,setsocketid] = useState(roomid);

  useEffect(() => {

     socket.on('connect', () => {
      console.log(`Frontend Connected `,socket.id);
      setsocketid(socket.id);
     });

     socket.on('wel' ,(msg) => {
       console.log('Frontend msg =',msg);
     })

     // sent from  frontend show in console
     socket.on('recieve' , (data) => {
       console.log('data',data);
     })

     return () => {
      socket.disconnect();
     }

  },[]) 


  const handledata = (e) => {
     e.preventDefault();
    //  socket.emit('message',msg); // for message only

     socket.emit('message',{msg,roomid}); // for message only

     setmsg('');
     setroomid('');
  }

  return (
   <>
     <div>
      <h3> Room is =  {socketid} </h3>

      <form onSubmit={handledata}>
        <div>
          <label>  Enter Message </label>
          <input  type = "text" placeholder='Enter data...' 
          value = {msg}  onChange={(e) => setmsg(e.target.value)} />
        </div>

        <div>
          <label> Enter Room No. </label>
          <input  type = "text" placeholder='Enter Room Id...' 
          value = {roomid}  onChange={(e) => setroomid(e.target.value)} />
        </div>

        <button type='submit'> Send </button>
       </form>

     </div>
   </>
  )
}

export default App
