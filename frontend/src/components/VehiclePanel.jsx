import React from 'react'

const VehiclePanel = (props) => {

  return (
    <div>
        <div onClick={()=>{props.setvehiclePanel(false)}} className=' absolute right-0 px-3 text-2xl'>
        <i className="ri-arrow-down-wide-line"></i>
        </div>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div onClick={()=>{
          props.setconfirmRidePanel(true)
          props.setvehicleType('car')
        }
          
          } className='flex border-gray-200 border-2 rounded-xl bg-gray-100 active:border-black w-full mb-2  items-center justify-between p-3'>
          <img className='w-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-medium text-xs'>Affordable, compact rides</p>
          </div>
          <div>
            <h2 className='text-xl font-semibold'>₹{props.fare['car']}</h2>
          </div>
        </div>
        <div onClick={()=>{
          props.setconfirmRidePanel(true)
          props.setvehicleType('auto')
        }} className='flex border-gray-200 border-2 rounded-xl bg-gray-100 active:border-black w-full mb-2  items-center justify-between p-3'>
          <img className='w-20' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-medium text-xs'>Affordable, auto rides</p>
          </div>
          <div>
            <h2 className='text-xl font-semibold'>₹{props.fare['auto']}</h2>
          </div>
        </div>
        <div onClick={()=>{
          props.setconfirmRidePanel(true)
          props.setvehicleType('motorcycle')
        }} className='flex border-gray-200 border-2 rounded-xl bg-gray-100 active:border-black w-full mb-2  items-center justify-between p-3'>
          <img className='w-20' src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Motorcycle.png" alt="" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-medium text-xs'>Affordable, bike ride</p>
          </div>
          <div>
            <h2 className='text-xl font-semibold'>₹{props.fare['motorcycle']}</h2>
          </div>
        </div>
    </div>
  )
}

export default VehiclePanel