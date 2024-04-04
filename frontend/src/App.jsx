import  { io } from 'socket.io-client' ;

function App() {

  const socket = io("http://localhost:3000");

  return (
   <>
    hEY 
   </>
  )
}

export default App
