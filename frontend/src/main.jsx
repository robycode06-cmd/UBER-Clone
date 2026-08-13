import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import Usercont from './context/Usercont';
import CaptainContext from './context/CaptainContext.jsx';

import SocketContextProvider from './context/SocketContextProvider.jsx';




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Usercont>
      <CaptainContext>
        
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        
        
      </CaptainContext>
    </Usercont>
    
  </BrowserRouter>
  
)
