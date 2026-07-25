import React, { useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      const captainToken = localStorage.getItem('captainToken');

      try {
        const response = await api.get('/captains/logout', {
          headers: {
            Authorization: `Bearer ${captainToken}`,
          },
        });

        if (response.status === 200) {
          localStorage.removeItem('captainToken');
          navigate('/captain-login')
        }
      } catch (error) {
        console.log('Unauthorized request', error);
      }
    };

    logout();
  }, []);

  return <div>CaptainLogout</div>;
};

export default CaptainLogout;