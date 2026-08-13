
import React from 'react'
import { useEffect } from 'react';
import { createContext } from 'react';

import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_BASE_URL}`);


export const SocketContext = createContext();

const SocketContextProvider = ({children}) => {
  useEffect(() => {
        //Basic connection logic
        socket.on('connect',()=>{
          console.log('Connected to Server');
        })
  
        socket.on('disconnect',()=>{
          console.log('Disconnect from Server')
        })
  
        
      
        
      }, [])
      
      
    return (
      <SocketContext.Provider value={{socket}}>
          {children}
      </SocketContext.Provider>
    )
}

export default SocketContextProvider