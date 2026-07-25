import React from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const responce = api.get("/users/logout", {
        headers: {
        Authorization: `Bearer ${token}`,
    },
    }).then((responce)=>{
        if(responce.status===200){
        localStorage.removeItem('token');
        navigate('/login');
    }
    })
    
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout