
import React from 'react'
import { useEffect } from 'react';
import { createContext } from 'react';

import { io } from "socket.io-client";

console.log("Socket client attempting connection to:", import.meta.env.VITE_BASE_URL || "http://localhost:4000");
const socket = io(import.meta.env.VITE_BASE_URL || "http://localhost:4000");


export const SocketContext = createContext();

const SocketContextProvider = ({children}) => {
  useEffect(() => {
        //Basic connection logic
        socket.on('connect',()=>{
          console.log('Connected to Server. Socket ID:', socket.id);
        })
  
        socket.on('disconnect',()=>{
          console.log('Disconnected from Server')
        })
  
        
      
        
      }, [])
      
      
    return (
      <SocketContext.Provider value={{socket}}>
          {children}
      </SocketContext.Provider>
    )
}

export default SocketContextProvider