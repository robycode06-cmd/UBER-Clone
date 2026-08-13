import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/Usercont'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'; // Import your configured axios instance

const UserProtectorWrapper = ({ children }) => {
    const token = localStorage.getItem('token'); 
    const navigate = useNavigate();
    const [ user, setuser ] = useContext(UserDataContext);
    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch the user profile on mount to restore user state
        api.get('/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setuser(response.data); // Restore user context
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
            localStorage.removeItem('token'); // Clear invalid token
            navigate('/login');
        });
    }, [token, navigate, setuser])

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

export default UserProtectorWrapper