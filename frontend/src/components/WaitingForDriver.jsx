import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <div onClick={()=>{props.setwaitingForDriver(false)}} className=' absolute right-0 px-3 text-2xl'>
      <i className="ri-arrow-down-wide-line"></i>
      </div>
      <h3 className='text-2xl font-semibold mb-5'>Waiting for a driver</h3>
      <div className='flex justify-between'>
        <img className='h-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
      
        <div className='text-right'>
            <h2 className='text-lg font-medium'>
              {props.ride?.captain?.fullname ? `${props.ride.captain.fullname.firstname} ${props.ride.captain.fullname.lastname}` : 'Driver'}
            </h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>
              {props.ride?.captain?.vehicle?.plate || 'MP04 AB 1234'}
            </h4>
            <p className='text-sm text-gray-600'>
              {props.ride?.captain?.vehicle?.color ? `${props.ride.captain.vehicle.color} ${props.ride.captain.vehicle.vehicleType}` : 'Vehicle Details'}
            </p>
            <h1 className='text-lg  font-bold'> {props.ride?.otp}</h1>
        </div>
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
        
      </div>
      

    </div>
  )
}

export default WaitingForDriver