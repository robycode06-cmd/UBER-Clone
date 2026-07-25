import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainLogin = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [captain,setcaptain] = useContext(CaptainDataContext);
    const navigate = useNavigate();
    const submitHandler = async (e)=>{
        e.preventDefault();
        const newCaptain = {
            email,
            password
        }
        try{
            const responce = await api.post('/captains/login',newCaptain);
            if(responce.status===201){
                const data = responce.data;
                const captain = data.captain;
                const token = data.token;
                localStorage.setItem('captainToken',token);
                setcaptain(captain);
                navigate('/captain-home');

            }
        }catch(error){
            console.log("login falied",error);
        }
        
        setemail('');
        setpassword('');
        
        
        
    }
  return (
    <div>
        <div className=' py-10 h-screen flex flex-col justify-between'>
        <div>
             <img className='w-16 ml-8 ' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="" />
            <form onSubmit={(e)=>{submitHandler(e)}} action="" className='p-7'>
                <h3 className='text-xl mb-2'>What's Captain Email</h3>
                <input value={email} onChange={(e)=>{setemail(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-full text-lg mb-4' required type="email" placeholder='email@example.com' />
                <h3 className='text-xl mb-2'>Enter Password</h3>
                <input value={password} onChange={(e)=>{setpassword(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-full text-lg' required type="password" placeholder='password' />
                <button className='bg-black text-white font-semibold rounded px-4 py-2 mt-6 border-gray-300 border-2 w-full text-lg' type='submit'>Login</button>
                <p>Join a fleet?<Link to='/captain-signup' className='text-blue-600' >Regsiter as a Captain</Link></p>
                
            </form>
        </div>
        <div className='px-7'>
            <Link to='/login'>
             <button className='bg-[#10b461] text-white font-semibold rounded px-4 py-2  border-gray-300 border-2 w-full text-lg'>
                Sign in as User
            </button>
            </Link>
           
        </div>
        </div>
    </div>
  )
}

export default CaptainLogin