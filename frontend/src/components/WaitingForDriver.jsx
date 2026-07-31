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
            <h2 className='text-lg font-medium'>Sarthak</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB 1234</h4>
            <p className='text-sm '>Maruti Suzuki Alto</p>
        </div>
      </div>
      <div className='flex justify-between items-center w-full flex-col gap-5'>
        
      
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
        
      </div>
      

    </div>
  )
}

export default WaitingForDriver