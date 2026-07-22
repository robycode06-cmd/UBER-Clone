import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [userform, setuserform] = useState({});
    const submitHandler=(e)=>{
        e.preventDefault();
        setuserform({
            fullname:{
                firstname,
                lastname
            },
            email,
            password
        });
        setemail('');
        setpassword('');
        setfirstname('');
        setlastname('');

    }
  return (
    <div>
        <div>
                <div className=' py-7 h-screen flex flex-col justify-between'>
                <div>
                     <img className='w-16 ml-8 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                    <form onSubmit={(e)=>{submitHandler(e)}} action="" className='p-7'>
                        <div>
                            <h3 className='text-xl mb-2'>What's Your Name</h3>
                            <div className='flex gap-2'>
                            <input value={firstname} onChange={(e)=>{setfirstname(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-1/2 text-lg mb-4' placeholder='first name' required type="text" />
                            <input value={lastname} onChange={(e)=>{setlastname(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-1/2 text-lg mb-4' placeholder='last name' required type="text" />
                            </div>
                        </div>
                       
                        <h3 className='text-xl mb-2'>What's Your Email</h3>
                        <input value={email} onChange={(e)=>{setemail(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-full text-lg mb-4' required type="email" placeholder='email@example.com' />
                        <h3 className='text-xl mb-2'>Enter Password</h3>
                        <input value={password} onChange={(e)=>{setpassword(e.target.value)}} className='bg-[#eeee] rounded px-4 py-2 border-gray-300 border-2 w-full text-lg' required type="password" placeholder='password' />
                        <button className='bg-black text-white font-semibold rounded px-4 py-2 mt-6 border-gray-300 border-2 w-full text-lg' type='submit'>Create Account</button>
                        <p>Already Have an Account? <Link to='/login' className='text-blue-600' >Login</Link></p>
                        
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

export default UserSignup