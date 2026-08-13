import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import api from '../api/axios'; // Import your configured axios instance
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectorWrapper = ({children}) => {
    const navigate = useNavigate();
    const captainToken = localStorage.getItem('captainToken');
    const [ captain, setcaptain ] = useContext(CaptainDataContext);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        if(!captainToken){
            navigate('/captain-login');
        }
        api.get('/captains/profile',{
          headers:{
            Authorization:`Bearer ${captainToken}`
          }
        }).then(responce=>{
          if(responce.status===200){
            setcaptain(responce.data.captain);
            setIsLoading(false);
          }
        }).catch(err => {
            console.log(err);
            localStorage.removeItem('token'); // Clear invalid token
            navigate('/login');
        });
    }, [captainToken,navigate,setcaptain])
    
     if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }
    
  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectorWrapper