import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
  const [captain,setcaptain] = useContext(CaptainDataContext)
  console.log(captain);
  return (
    <div className='h-full w-full  p-4'>
          <div className='felx items-center justify-between'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center justify-start gap-3'>
                <img className='h-10 w-10 rounded-full object-cover' src='https://img.magnific.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg?semt=ais_hybrid&w=740&q=80'/>
                <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname} {captain.fullname.lastname}</h4>
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