import mongoose from "mongoose";

function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(()=>{
         console.log("connected to DB");
    }).catch((err)=>{console.log(err);})
}


export default connectToDB;