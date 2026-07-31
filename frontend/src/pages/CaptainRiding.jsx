import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from './FinishRide';

gsap.registerPlugin(useGSAP);

const CaptainRiding = () => {
    const [finishRidePanel, setfinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);

    useGSAP(()=>{ 
    if(finishRidePanel){
      gsap.to(finishRidePanelRef.current,{
        y:0
      })
    }else{
      gsap.to(finishRidePanelRef.current,{
        y:'100%'
      })
    }
    
  },[finishRidePanel])
  return (
    <div className='h-screen'>
         
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-home' className=' h-10  w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="ri-logout-box-r-fill"></i>
        </Link>
      </div>
        
        <div className='h-4/5'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='h-1/5 px-4 relative p-1 bg-yellow-400' onClick={()=>{setfinishRidePanel(true)}}>
            <div  className=' absolute right-0 px-3 text-2xl'>
                <i className="ri-arrow-up-wide-fill"></i>
            </div>
            <div className='h-full w-full px-6 flex items-center justify-between'>
                <h4 className='font-semibold text-xl'>4 Km away</h4>
                <button className=' mt-1 bg-green-500 rounded-lg text-white text-center font-semibold p-2'>Complete Ride</button>
            </div>

        </div>

         <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 '>
            <FinishRide setfinishRidePanel={setfinishRidePanel}/>
        </div>
        
    </div>
  )
}

export default CaptainRiding