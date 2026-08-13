import {Server} from "socket.io";
import USER_MODEL from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let io;
export function initializesocket(server){
    //initialize socket connection
    io = new Server(server,{
        cors:{
            origin:"*",
            methods:['GET','POST']
        }
    });

    io.on('connection',(socket)=>{
        console.log('Client is connected',`${socket.id}`);

        socket.on('join',async (data)=>{
            const {userId, userType} = data;
            console.log(`User ${userId} joined as ${userType}`)
            if(userType==='user'){
                await USER_MODEL.findByIdAndUpdate(userId,{
                    socketId:socket.id
                });
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                })
            }
        });

        socket.on('update-location-captain',async(data)=>{
            const {userId,location} = data;
            if(!userId || !location || location.ltd === undefined || location.lng === undefined){
                return socket.emit('error',{message: 'Invalid location data'});
            }
            console.log(`Captain ${userId} location updated to: [lng: ${location.lng}, lat: ${location.ltd}]`);
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    type: "Point",
                    coordinates: [location.lng, location.ltd] // [longitude, latitude]
                }
            });
            
        });
        socket.on('disconnect',()=>{
            console.log(`Client is disconnected: ${socket.id}`);

        })
    })

}

export function sendMessageToSocketId(socketId,messageObject){
    //send message to particular socket id
    if(io){
        io.to(socketId).emit(messageObject.event,messageObject);
    }else{
        console.log('Socket.io is not initialized');
    }
}

