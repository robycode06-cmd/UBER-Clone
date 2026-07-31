import React, { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import LocationPanel from '../components/LocationPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';

import WaitingForDriver from '../components/WaitingForDriver';

gsap.registerPlugin(useGSAP);
const Home = () => {
  const [pickup, setpickup] = useState('');
  const [destination, setdestination] = useState('');
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleCloseRef = useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setvehicleFound] = useState(false)
  const vehicleFoundRef = useRef(null);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null)
  const Submithandler = (e)=>{
    e.preventDefault();

  }
  
    useGSAP(()=>{
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        opacity:1,
        
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        opacity:0,
        
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
    },[panelOpen,panelCloseRef])
  
  useGSAP(()=>{
    if(vehiclePanel){
      gsap.to(vehicleCloseRef.current,{
        y:0
     })
    }else{
      gsap.to(vehicleCloseRef.current,{
        y:'100%'
      })
    }
    
  },[vehiclePanel])

  useGSAP(()=>{
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        y:0
     })
    }else{
      gsap.to(confirmRidePanelRef.current,{
        y:'100%'
      })
    }
    
  },[confirmRidePanel])

  useGSAP(()=>{
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        y:0
     })
    }else{
      gsap.to(vehicleFoundRef.current,{
        y:'100%'
      })
    }
    
  },[vehicleFound])

  useGSAP(()=>{
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        y:0
     })
    }else{
      gsap.to(waitingForDriverRef.current,{
        y:'100%'
      })
    }
    
  },[waitingForDriver])


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div  onClick={()=>{setvehiclePanel(false)}} className='h-screen w-screen'>
        {/*image for temporary use*/}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end absolute top-0 h-screen w-full'>
        
        <div className='h-[30%] relative bg-white p-5'>
          <div ref={panelCloseRef} onClick={()=>{setpanelOpen(false)}} className='text-2xl absolute right-5 opacity-0 '>
            <i className="ri-arrow-down-s-line"></i>
          </div>
          
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={(e)=>{Submithandler(e)}} action="">
            <div className="line absolute h-16 w-1 bg-gray-600 rounded-full top-[45%] left-[8%]"></div>
            <input onClick={()=>{setpanelOpen(true)}} value={pickup} onChange={(e)=>{setpickup(e.target.value)}} className='bg-[#eee] px-8 py-2 text-base rounded w-full mt-5' type="text" placeholder='Add a pick up location' />
            <input onClick={()=>{setpanelOpen(true)}} value={destination} onChange={(e)=>{setdestination(e.target.value)}} className='bg-[#eee] px-8 py-2 text-base rounded w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className=' bg-white p-0 h-0 opacity-0'>
            <LocationPanel setpanelOpen={setpanelOpen} vehiclePanel={vehiclePanel} setvehiclePanel={setvehiclePanel}/>
        </div>
      </div>
      <div ref={vehicleCloseRef}  className='fixed  bottom-0 w-full bg-white p-3 translate-y-full'>
        <VehiclePanel setconfirmRidePanel={setconfirmRidePanel} setvehiclePanel={setvehiclePanel}></VehiclePanel>
      </div>
      <div ref={confirmRidePanelRef}  className='fixed z-10  bottom-0 w-full bg-white p-3 translate-y-full px-3 py-6 pt-12'>
        <ConfirmedRide setconfirmRidePanel={setconfirmRidePanel} setvehicleFound={setvehicleFound}></ConfirmedRide>
      </div>
      <div ref={vehicleFoundRef}  className='fixed z-10  bottom-0 w-full bg-white p-3 translate-y-full px-3 py-6 pt-12'>
        <LookingForDriver setvehicleFound={setvehicleFound}></LookingForDriver>
      </div>

      <div ref={waitingForDriverRef}  className='fixed z-10  bottom-0 w-full bg-white p-3  px-3 py-6 pt-12'>
        <WaitingForDriver setwaitingForDriver={setwaitingForDriver} ></WaitingForDriver>
      </div>
    
      
    </div>
  )
}

export default Home