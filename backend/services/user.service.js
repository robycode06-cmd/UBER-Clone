import USER_MODEL from "../models/user.model.js";

const createUser = async({
    firstname,lastname,email,password
})=>{
    if(!firstname||!email||!password){
        throw new Error('All fields are required');
    }
    
    const user = USER_MODEL.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password
    })

    return user;
}

const userService = {createUser};

export default userService;