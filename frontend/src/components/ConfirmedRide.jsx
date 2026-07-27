import React from 'react'

const ConfirmedRide = (props) => {
  return (
    <div>
      <div onClick={()=>{props.setconfirmRidePanel(false)}} className=' absolute right-0 px-3 text-2xl'>
      <i className="ri-arrow-down-wide-line"></i>
      </div>
      <h3 className='text-2xl font-semibold mb-5'>Confirm you Ride</h3>
      
      <div className='flex justify-between items-center w-full flex-col gap-5'>
        <img className='h-30' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
      
      <div className='w-full'>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className='font-medium text-lg'>562/11-A</h3>
            <p className='text-base -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className=" text-lg ri-map-pin-user-line"></i>
          <div>
            <h3 className='font-medium text-lg'>562/11-A</h3>
            <p className='text-base -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-lg ri-cash-line"></i>
          <div>
            <h3 className='font-medium text-lg'>193.20</h3>
            <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
          </div>
        </div>
      </div>
        <button onClick={()=>{props.setvehicleFound(true);
          props.setconfirmRidePanel(false)
        }} className='w-full mt-5 bg-green-500 rounded-lg text-white font-semibold p-2'>Confirm</button>
      </div>
      

    </div>
  )
}

export default ConfirmedRide