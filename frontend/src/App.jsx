import { useEffect, useMemo, useState } from 'react';
import  { io } from 'socket.io-client' ;

function App() {

  // for  avoiding re-rendering 
  const socket =   useMemo(() =>  io("http://localhost:3000") ,[]);

  const[msg,setmsg]= useState('');


  useEffect(() => {
     socket.on('connect', () => {
      console.log(`Frontend Connected `,socket.id);
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
     socket.emit('message',msg);
     setmsg('');
  }

  return (
   <>
     <div>
      <label>  welcome to socket.io  </label>
      <input  type = "text" placeholder='Enter data...' 
       value = {msg}  onChange={(e) => setmsg(e.target.value)} />
       <button type='submit' onClick={handledata}> Send </button>
     </div>
     <div>
       <span> Messages </span>
     </div>
   </>
  )
}

export default App
