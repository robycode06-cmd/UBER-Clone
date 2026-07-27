import React from 'react'

const LocationPanel = (props) => {
    
    const locationArray = [
        "24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal",
        "22B, Near Manhotra's cafe, Sheriyans Coding School, Bhopal",
        "20B, Near Sharma's cafe, Sheriyans Coding School, Bhopal",
        "16B, Near X cafe, Sheriyans Coding School, Bhopal"
    ]
  return (
    <div className='p-5 '>
        {/*This is just a Sample data*/}
        {
            locationArray.map((elem,idx)=>{
                return(
                    <div onClick={()=>{
                        props.setvehiclePanel(true);
                        props.setpanelOpen(false)
                        }} key={idx} className='flex items-center justify-start mb-2 bg-gray-100 rounded-xl border-gray-200 active:border-black border-2 px-2'>
                        <div className='bg-[#eee] rounded-full h-10 w-15 text-xl flex justify-center items-center '>
                        <i className="ri-map-pin-fill"></i>
                        </div>
                        <h4 className='p-2 font-medium'>{elem}</h4>
                    </div>
                )
            })
        }
       
    </div>
  )
}

export default LocationPanel