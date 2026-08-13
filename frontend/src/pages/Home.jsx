import React, { useContext, useEffect, useRef, useState } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import LocationPanel from '../components/LocationPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';

import WaitingForDriver from '../components/WaitingForDriver';
import api from '../api/axios';

import { UserDataContext } from '../context/Usercont';
import {SocketContext} from '../context/SocketContextProvider';



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
  const [locationsList, setlocationsList] = useState([]);
  const waitingForDriverRef = useRef(null);
  const [activeField, setactiveField] = useState('');
  const [fare, setfare] = useState({});
  const [vehicleType, setvehicleType] = useState('');


  const {socket} = useContext(SocketContext);
  const [user,setuser] = useContext(UserDataContext);
 

  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [user])
  
  const changeHandlerpickup = async (e)=>{
    const input_value = e.target.value;
    setactiveField('pickup');
    setpickup(input_value);
    
    try{
      const pickupSuggestions = await api.get('/maps/suggestion',{
        params:{
          input:input_value
        },
         headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        
      }); 
      setlocationsList(pickupSuggestions.data);
      

    }catch(error){
      console.log(error);
    }
    

  }
  const changeHandlerdestination = async (e)=>{
    const input_value = e.target.value;
    setactiveField('destination');
    setdestination(input_value);
    
    try{
      const pickupSuggestions = await api.get('/maps/suggestion',{
        params:{
          input:input_value
        },
         headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        
      }); 
      setlocationsList(pickupSuggestions.data);
      

    }catch(error){
      console.log(error);
    }
    

  }
  const Submithandler = async(e)=>{
    e.preventDefault();
    setvehiclePanel(true);
    setpanelOpen(false);
    const responce = await api.get('/rides/get-fair',{
      params:{
        pickup:pickup,
        destination:destination,
      },
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')} `
      }
    })
    setfare(responce.data);
    

  }

  async function createRide(){
    const responce = await api.post('/rides/create',{
      pickup,
      destination,
      vehicleType
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`,
      }
    })

    
    
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
        
        <div className='h-[33%] relative bg-white p-5'>
          <div ref={panelCloseRef} onClick={()=>{setpanelOpen(false)}} className='text-2xl absolute right-5 opacity-0 '>
            <i className="ri-arrow-down-s-line"></i>
          </div>
          
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={(e)=>{Submithandler(e)}} action="">
            <div className="line absolute h-16 w-1 bg-gray-600 rounded-full top-[40%] left-[8%]"></div>
            <input onClick={()=>{setpanelOpen(true)}} value={pickup} onChange={(e)=>{changeHandlerpickup(e)}} className='bg-[#eee] px-8 py-2 text-base rounded w-full mt-5' type="text" placeholder='Add a pick up location' />
            <input onClick={()=>{setpanelOpen(true)}} value={destination} onChange={(e)=>{changeHandlerdestination(e)}} className='bg-[#eee] px-8 py-2 text-base rounded w-full mt-3' type="text" placeholder='Enter your destination' />
            <button type='submit' className='w-full mt-5 bg-green-500 rounded-lg text-white font-semibold p-2'>Continue</button>
          </form>
        </div>
        <div ref={panelRef} className=' bg-white p-0 h-0 opacity-0'>
            <LocationPanel activeField={activeField} locationsList={locationsList} setpickup={setpickup} setdestination={setdestination} setpanelOpen={setpanelOpen} vehiclePanel={vehiclePanel} setvehiclePanel={setvehiclePanel}/>
        </div> 
      </div>
      <div ref={vehicleCloseRef}   className='fixed  bottom-0 w-full bg-white p-3 translate-y-full'>
        <VehiclePanel fare={fare} setvehicleType={setvehicleType}  setconfirmRidePanel={setconfirmRidePanel} setvehiclePanel={setvehiclePanel}></VehiclePanel>
      </div>
      <div ref={confirmRidePanelRef}  className='fixed z-10  bottom-0 w-full bg-white p-3 translate-y-full px-3 py-6 pt-12'>
        <ConfirmedRide fare={fare}  destination={destination} pickup={pickup} vehicleType={vehicleType} createRide={createRide} setconfirmRidePanel={setconfirmRidePanel} setvehicleFound={setvehicleFound}></ConfirmedRide>
      </div>
      <div ref={vehicleFoundRef}  className='fixed z-10  bottom-0 w-full bg-white p-3 translate-y-full px-3 py-6 pt-12'>
        <LookingForDriver fare={fare} destination={destination} pickup={pickup} vehicleType={vehicleType} setvehicleFound={setvehicleFound}></LookingForDriver>
      </div>

      <div ref={waitingForDriverRef}   className='fixed z-10  bottom-0 w-full bg-white p-3  px-3 py-6 pt-12'>
        <WaitingForDriver fare={fare} destination={destination} pickup={pickup} vehicleType={vehicleType} setwaitingForDriver={setwaitingForDriver} ></WaitingForDriver>
      </div>
    
      
    </div>
  )
}

export default Home