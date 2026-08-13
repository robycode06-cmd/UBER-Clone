import React, { useState } from 'react'

const LocationPanel = (props) => {
    
   
    const handleSuggestiononClick = (elem)=>{
        
        if(props.activeField==='pickup'){
            props.setpickup(elem);
        }
        if(props.activeField==='destination'){
            props.setdestination(elem);
        }
    }
    
    
  return (
    <div className='p-5 '>
        {/*This is just a Sample data*/}
        {
            props.locationsList.map((elem,idx)=>{
                return(
                    <div onClick={()=>{
                        handleSuggestiononClick(elem.description);

                        }} key={idx} className='flex items-center justify-start mb-2 bg-gray-100 rounded-xl border-gray-200 active:border-black border-2 px-2'>
                        <div className='bg-[#eee] rounded-full h-10 w-15 text-xl flex justify-center items-center '>
                        <i className="ri-map-pin-fill"></i>
                        </div>
                        <h4 className='p-2 font-medium'>{elem.description}</h4>
                    </div>
                )
            })
        }
       
    </div>
  )
}

export default LocationPanel