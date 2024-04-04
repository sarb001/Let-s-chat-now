import { useEffect } from 'react';
import  { io } from 'socket.io-client' ;

function App() {

  const socket = io("http://localhost:3000");

  useEffect(() => {
     socket.on('connect', () => {
      console.log(`Frontend Connected `,socket.id);
     })
  },[]) 

  socket.on('wel' ,(msg) => {
    console.log('Frontend msg =',msg);
  })

  return (
   <>
    hEY 
   </>
  )
}

export default App
