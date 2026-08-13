import React from 'react'

const LookingForDriver = (props) => {
  let url = '';
  if(props.vehicleType==='car'){
    url = 'https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png'
  }else if(props.vehicleType==='auto'){
    url = 'https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png'
  }else{
    url = 'https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Motorcycle.png'
  }
  return (
    <div>
      <div onClick={()=>{props.setvehicleFound(false)}} className=' absolute right-0 px-3 text-2xl'>
      <i className="ri-arrow-down-wide-line"></i>
      </div>
      <h3 className='text-2xl font-semibold mb-5'>Looking for a driver</h3>
      
      <div className='flex justify-between items-center w-full flex-col gap-5'>
        <img className='h-30' src={url} alt="" />
      
      <div className='w-full'>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className='font-medium text-lg'>PICKUP</h3>
            <p className='text-base -mt-1 text-gray-600'>{props.pickup}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className=" text-lg ri-map-pin-user-line"></i>
          <div>
            <h3 className='font-medium text-lg'>DESTINATION</h3>
            <p className='text-base -mt-1 text-gray-600'>{props.destination}</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-lg ri-cash-line"></i>
          <div>
            <h3 className='font-medium text-lg'>{props.fare[props.vehicleType]}</h3>
            <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
          </div>
        </div>
      </div>
        
      </div>
      

    </div>
  )
}

export default LookingForDriver 