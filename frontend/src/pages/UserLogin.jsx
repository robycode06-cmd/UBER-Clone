import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios';
import { UserDataContext } from '../context/Usercont';

const UserLogin = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const [user,setuser] = useContext(UserDataContext);
    const navigate = useNavigate();
    
    
    const submitHandler = async(e)=>{
        e.preventDefault();
        const userData = {
            
            email,
            password
            
        }
        
        try{
        const responce = await api.post("/users/login",userData);
        if(responce.status===200){
            
            const data = responce.data;
            setuser(data.user);
            localStorage.setItem('token',data.token);
            navigate('/home');

            
        }}catch(err){
            seterror(err);
        }
        
        setemail('');
        setpassword('');
        
        
        
    }
  return (
    <div>
        <div className=' py-7 h-screen flex flex-col justify-between'>
        <div>
             <img className='w-16 ml-8 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <form onSubmit={(e)=>{submitHandler(e)}} action="" className='p-7'>
                <h3 className='text-xl mb-2'>What's Your Email</h3>
                <input value={email} onChange={(e)=>{setemail(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-full text-lg mb-4' required type="email" placeholder='email@example.com' />
                <h3 className='text-xl mb-2'>Enter Password</h3>
                <input value={password} onChange={(e)=>{setpassword(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-full text-lg' required type="password" placeholder='password' />
                <button className='bg-black text-white font-semibold rounded px-4 py-2 mt-6 border-gray-300 border-2 w-full text-lg' type='submit'>Login</button>
                <p>New Here? <Link to='/signup' className='text-blue-600' >Create New Account</Link></p>
                
            </form>
            <div className='flex items-center justify-center text-red-600'>
                {error &&(
                    <p>Invalid Eamil or Password</p>
                )}
            </div>
        </div>
        <div className='px-7'>
            <Link to='/captain-login'>
             <button className='bg-[#10b461] text-white font-semibold rounded px-4 py-2  border-gray-300 border-2 w-full text-lg'>
                Sign in as Captain
            </button>
            </Link>
           
        </div>
        </div>
    </div>
  )
}

export default UserLogin