import React, { createContext, useState } from 'react'


export const CaptainDataContext =  createContext();
const CaptainContext = ({children}) => {
    const [captain, setcaptain] = useState({
        fullname:{
        firstname:'',
        lastname:''
    },
    email:'', 
    password:'',
    socketId:'',
    status:'',
    vehicle:{
        color:'',
        plate:'',
        capacity:null,
        vehicleType:''
    },
    location:{
        lat:null,
        lng:null
    }
    })
  return (
    <>
        <CaptainDataContext value={[captain,setcaptain]}>
            {children}
        </CaptainDataContext>
    </>
  )
}

export default CaptainContext