import React, { createContext, useState } from 'react'



export const UserDataContext = createContext();
const Usercont = ({children}) => {
   const [user, setuser] = useState({
    email:'',
    password:'',
    fullname:{
        firstname:'',
        lastname:'',
    }
   })
  return (
    
    <div>
        <UserDataContext.Provider value={[user,setuser]}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default Usercont