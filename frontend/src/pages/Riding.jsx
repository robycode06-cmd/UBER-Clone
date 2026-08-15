import React from 'react'
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/SocketContextProvider';
import { useContext } from 'react';


const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const navigate = useNavigate();
  const {socket} = useContext(SocketContext);
  socket.on("ride-ended",()=>{
    navigate('/home');
  })

  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed h-10 right-2 top-2 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
        <div className='h-1/2'>
            <LiveTracking />
        </div>
        <div className='h-1/2 p-4'>
            <div className='flex justify-between'>
        <img className='h-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
      
        <div className='text-right'>
            <h2 className='text-lg font-medium'>
              {ride?.captain?.fullname ? `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname}` : 'Driver'}
            </h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>
              {ride?.captain?.vehicle?.plate || 'MP04 AB 1234'}
            </h4>
            <p className='text-sm text-gray-600'>
              {ride?.captain?.vehicle?.color ? `${ride.captain.vehicle.color} ${ride.captain.vehicle.vehicleType}` : 'Vehicle Details'}
            </p>
        </div>
      </div>
      <div className='flex justify-between items-center w-full flex-col gap-5'>
        
      
      <div className='w-full'>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className='font-medium text-lg'>Destination</h3>
            <p className='text-base -mt-1 text-gray-600'>{ride?.destination}</p>
          </div>
        </div>
    
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-lg ri-cash-line"></i>
          <div>
            <h3 className='font-medium text-lg'>₹{ride?.fare}</h3>
            <p className='text-base -mt-1 text-gray-600'>Cash payment</p>
          </div>
        </div>
      </div>
      </div>
            <button className='w-full mt-5 bg-green-500 rounded-lg text-white font-semibold p-2'>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding