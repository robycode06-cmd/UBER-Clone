import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import api from '../api/axios';


const CaptainSignup = () => {
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [color, setcolor] = useState('');
    const [plate, setplate] = useState('');
    const [capacity, setcapacity] = useState('');
    const [vehicleType, setvehicleType] = useState('');
    const [captain, setcaptain] = useContext(CaptainDataContext);
    
    const navigate = useNavigate();
    
    const submitHandler= async (e)=>{
        e.preventDefault();
        const newCaptain ={
            fullname:{
                firstname,
                lastname
            },
            email,
            password,
            vehicle:{
                color,
                capacity,
                plate,
                vehicleType,
                
            }
        };
        try{
            const responce = await api.post('/captains/register',newCaptain);
            if(responce.status===201){
                const data = responce.data;
                const token = data.token;
                localStorage.setItem('captainToken',token);
                setcaptain(data.captain);
                navigate('/captain-home');
            }
        }catch(error){
            console.log("Can't sing up",error);
        }
        
        
        


    }
  return (
    <div>
        <div>
                <div className=' py-7 h-screen flex flex-col justify-between'>
                <div>
                     <img className='w-16 ml-8 ' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="" />
                    <form onSubmit={(e)=>{submitHandler(e)}} action="" className='p-7'>
                        <div>
                            <h3 className='text-xl mb-2'>What's Captain Name</h3>
                            <div className='flex gap-2'>
                            <input value={firstname} onChange={(e)=>{setfirstname(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-1/2 text-lg mb-4' placeholder='first name' required type="text" />
                            <input value={lastname} onChange={(e)=>{setlastname(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-1/2 text-lg mb-4' placeholder='last name' required type="text" />
                            </div>
                        </div>
                        <h3 className='text-xl mb-2'>What's Captain Email</h3>
                        <input value={email} onChange={(e)=>{setemail(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-full text-lg mb-4' required type="email" placeholder='email@example.com' />
                        <h3 className='text-xl mb-2'>Enter Password</h3>
                        <input value={password} onChange={(e)=>{setpassword(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-full text-lg' required type="password" placeholder='password' />
                        <div className='text-xl mt-2'>
                            <h3 className='text-xl mb-2' >Vehicle Information</h3>
                            <div className='flex flex-wrap gap-2'>
                                <div className='flex'>
                                    <input value={color} onChange={(e)=>{setcolor(e.target.value)}} className='bg-[#eeee] m-2 rounded px-4 py-2 border-gray-300 border-2 w-full text-lg' required placeholder='Vhilce Color' type="text" />
                                    <input value={plate} onChange={(e)=>{setplate(e.target.value)}} className='bg-[#eeee] m-2 rounded px-4 py-2 border-gray-300 border-2 w-full text-lg' required placeholder='number plate' type="text" />
                                </div>
                                <div className='flex'> 
                                    <input value={capacity} onChange={(e)=>{setcapacity(e.target.value)}} className='bg-[#eeee] m-2 rounded px-4 py-2 border-gray-300 border-2 w-full text-lg' required placeholder='Capacity' type="number" />
                                    <select value={vehicleType} onChange={(e)=>{setvehicleType(e.target.value)}} className='bg-[#eeee] m-2 rounded px-4 py-2 border-gray-300 border-2 w-full text-lg' name="" id="">
                                        <option value="">Vehicle Type</option>
                                        <option value="car">Car</option>
                                        <option value="motorcycle">Bike</option>
                                        <option value="auto">Auto</option>
                                    </select>
                                    
                                </div>
                            </div>
                        
                        </div>
                        <button className='bg-black text-white font-semibold rounded px-4 py-2 mt-6 border-gray-300 border-2 w-full text-lg' type='submit'>Create Captain Account</button>
                        <p>Have an Account of fleet? <Link to='/captain-login' className='text-blue-600' >Login</Link></p>
                        
                        
                    </form>
                </div>
                <div className='px-7'>
                    <p className='text-[10px]'>By procedding you concept to get cold emails, including by automated means,from Uber and its affiliated to the number provided.</p>
                   
                   
                </div>
                </div>
            </div>
    </div>
  )
}

export default CaptainSignup