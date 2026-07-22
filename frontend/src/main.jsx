import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import Usercont from './context/Usercont';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Usercont>
      <App />
    </Usercont>
    
  </BrowserRouter>
  
)
