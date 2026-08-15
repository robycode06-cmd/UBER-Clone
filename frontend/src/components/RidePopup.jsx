import React from 'react'
import ConfirmedRide from './ConfirmedRide';

const RidePopup = (props) => {
  return (
    <div>
        <div onClick={()=>{props.setRidepopuppanel(false)}} className=' absolute right-0 px-3 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
        </div>
      <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>
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
        <button onClick={()=>{
          props.setconfirmRidePanel(true)
          props.confirmRide();
        }
          
        } className='w-full mt-1 bg-green-500 rounded-lg text-white font-semibold p-2'>Accept</button>

         <button onClick={()=>{ props.setRidepopuppanel(false)}} className='w-full mt-1 bg-gray-500 rounded-lg text-white font-semibold p-2'>Ignore</button>
      </div>

      <div>

      </div>
    </div>
  )
}

export default RidePopup