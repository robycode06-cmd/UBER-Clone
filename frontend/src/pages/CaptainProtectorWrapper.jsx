import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainProtectorWrapper = ({children}) => {
    const navigate = useNavigate();
    const captainToken = localStorage.getItem('captainToken');
    useEffect(() => {
        if(!captainToken){
            navigate('/captain-login');
        }
    }, [captainToken])
    
    
  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectorWrapper