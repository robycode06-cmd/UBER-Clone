import React from 'react'

const CaptainDetails = () => {
  return (
    <div className='h-full w-full  p-4'>
          <div className='felx items-center justify-between'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center justify-start gap-3'>
                <img className='h-10 w-10 rounded-full object-cover' src='https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww'/>
                <h4 className='text-lg font-medium'>Harsh Patel</h4>
              </div>
              <div>
                <h4 className='text-xl font-semibold'>₹295.20</h4>
                <p className='text-sm text-gray-600'>Earned</p>
              </div>
            </div>
            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-thin ri-time-fill"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hour Online</p>
              </div>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hour Online</p>
              </div>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-thin ri-sticky-note-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hour Online</p>
              </div>
            </div>
          </div>
            

        </div>
  )
}

export default CaptainDetails