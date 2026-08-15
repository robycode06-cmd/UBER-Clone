import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidepopup from '../components/ConfirmRidepopup';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContextProvider';
import ConfirmedRide from '../components/ConfirmedRide';
import api from '../api/axios';

gsap.registerPlugin(useGSAP);

const CaptainHome = () => {
  const ridepopref = useRef(null);
  const confirmRidePopupref = useRef(null);

  const [Ridepopuppanel, setRidepopuppanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const [ride, setRide] = useState(null);

  const {socket} = useContext(SocketContext);
  const [captain,setcaptain] = useContext(CaptainDataContext);

  async function confirmRide() {
    const token = localStorage.getItem('captainToken');
    const responce = await api.post(`/rides/confirm`,{
      rideId:ride._id,
      captainId : captain._id,

     
    }, {headers:{
        Authorization: `Bearer ${localStorage.getItem('captainToken')}`
      }});

    setRidepopuppanel(false);
    
    setconfirmRidePanel(true);
  } 

  useEffect(() => {
    if (!captain?._id) {
      console.log("CaptainHome: captain data is not loaded yet:", captain);
      return;
    }

    console.log("CaptainHome: Emitting join event for captain ID:", captain._id, "Socket connected:", socket.connected);
    socket.emit('join', {
      userId: captain._id,
      userType: "captain"
    });

    const updateLocation = () => {
      if (navigator.geolocation && captain?._id) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Captain location captured:", {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            });
            socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
          },
          (error) => {
            console.error("Error retrieving captain location:", error.message);
          },
          { enableHighAccuracy: true }
        );
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    socket.on('new-ride', (data) => {
      console.log("New ride received via socket:", data);
      setRide(data);
      setRidepopuppanel(true);
    });

    return () => {
      clearInterval(locationInterval);
      socket.off('new-ride');
    };
  }, [captain]);
  useGSAP(()=>{ 
    if(Ridepopuppanel){
      gsap.to(ridepopref.current,{
        y:0
      })
    }else{
      gsap.to(ridepopref.current,{
        y:'100%'
      })
    }
    
  },[Ridepopuppanel])

  useGSAP(()=>{ 
    if(confirmRidePanel){
      gsap.to(confirmRidePopupref.current,{
        y:0
      })
    }else{
      gsap.to(confirmRidePopupref.current,{
        y:'100%'
      })
    }
    
  },[confirmRidePanel])
  return ( 
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-login' className=' h-10  w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="ri-logout-box-r-fill"></i>
        </Link>
      </div>
        
        <div className='h-1/2'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='h-2/5 p-6 '>
            <CaptainDetails></CaptainDetails>
        </div>
        <div ref={ridepopref} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 '>
            <RidePopup ride={ride} setRidepopuppanel={setRidepopuppanel}  setconfirmRidePanel={setconfirmRidePanel} confirmRide ={confirmRide}/>
        </div>

        <div ref={confirmRidePopupref} className='fixed h-screen w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-6 '>
            <ConfirmRidepopup ride={ride} setRidepopuppanel={setRidepopuppanel} setconfirmRidePanel={setconfirmRidePanel}/>
        </div>
    </div>
  )
}

export default CaptainHome