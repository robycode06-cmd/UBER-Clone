import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';



const ConfirmRidepopup = (props) => {
  const [otp, setotp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e)=>{
    e.preventDefault();
    console.log("Submitting start-ride request with rideId:", props.ride?._id, "and otp:", otp);
    try {
      const responce = await api.get('/rides/start-ride',{
        params:{
          rideId:props.ride._id,
          otp:otp,
        },
        headers:{
          Authorization:`Bearer ${localStorage.getItem('captainToken')}`
        }
      });
      console.log("Start-ride response:", responce.status, responce.data);
      if(responce.status===200){
        props.setconfirmRidePanel(false);
        props.setRidepopuppanel(false);
        console.log("Navigating to /captain-riding...");
        const rideData = responce.data || props.ride;
        navigate('/captain-riding', { state: { ride: rideData } });
      }
    } catch (err) {
      console.error("Error in start-ride API call:", err.response ? err.response.data : err.message);
    }
  }
  return (
    <div className='h-full py-8'>
        <div onClick={()=>{props.setconfirmRidePanel(false)}} className=' absolute right-0 px-3 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
        </div>
      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
      <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
        <div className='flex items-center gap-3 '>
            <img className='h-12 rounded-full w-12 object-cover' src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww" alt="" />
            <h2 className='text-lg font-medium'>
              {props.ride?.userId?.fullname ? `${props.ride.userId.fullname.firstname} ${props.ride.userId.fullname.lastname}` : 'Customer'}
            </h2>
        </div>
        <h5>{props.ride?.distance ? `${(props.ride.distance / 1000).toFixed(1)} KM` : 'N/A'}</h5>
      </div>
      <div className='flex justify-between items-center w-full flex-col gap-5'>
        
      
      <div className='w-full'>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className='font-medium text-lg'>Pickup</h3>
            <p className='text-base -mt-1 text-gray-600'>{props.ride?.pickup}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className=" text-lg ri-map-pin-user-line"></i>
          <div>
            <h3 className='font-medium text-lg'>Destination</h3>
            <p className='text-base -mt-1 text-gray-600'>{props.ride?.destination}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-lg ri-cash-line"></i>
          <div>
            <h3 className='font-medium text-lg'>₹{props.ride?.fare}</h3>
            <p className='text-base -mt-1 text-gray-600'>Cash payment</p>
          </div>
        </div>
      </div>
      
      
      <div className='w-full'>
        <form onSubmit={(e)=>{submitHandler(e)}} action="">
          <input value={otp} onChange={(e)=>{setotp(e.target.value)}} type="text" className='bg-[#eee] px-8 py-2 text-base rounded w-full mt-5' placeholder='Enter OTP' />

          
          <button type='submit' className='w-full mt-1 bg-green-500 rounded-lg text-white text-center font-semibold p-2'>Confirm</button>
          
          <button onClick={()=>{ props.setconfirmRidePanel(false)
              props.setRidepopuppanel(false)
          }} className='w-full mt-1 bg-red-600 rounded-lg text-white font-semibold p-2'>Cancel</button>
        </form>

      </div>
      </div>

      <div>

      </div>
    </div>
  )
}

export default ConfirmRidepopup