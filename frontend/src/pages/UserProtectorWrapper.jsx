import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/Usercont'
import { useNavigate } from 'react-router-dom'


const UserProtectorWrapper = ({children}) => {
    const token = localStorage.getItem('token'); 
    const navigate = useNavigate();
    
    useEffect(() => {
      if(!token){
            navigate('/login');
        }
    }, [token])
    
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectorWrapper