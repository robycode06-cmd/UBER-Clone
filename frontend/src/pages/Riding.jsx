import React from 'react'


const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed h-10 right-2 top-2 w-10 bg-white flex items-center justify-center rounded-full'>
            <i class="text-lg font-medium ri-home-5-line"></i>
        </Link>
        <div className='h-1/2'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='h-1/2 p-4'>
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
          <i className="text-lg ri-cash-line"></i>
          <div>
            <h3 className='font-medium text-lg'>193.20</h3>
            <p className='text-base -mt-1 text-gray-600'>Cash Cash</p>
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