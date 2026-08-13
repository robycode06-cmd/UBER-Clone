import http from 'http';
import app from './app.js';
import { initializesocket } from './socket.js'; //


const port = process.env.PORT||3000;

const server = http.createServer(app);

initializesocket(server); //

server.listen(port,"0.0.0.0",()=>{
    console.log("Server started at port",port);
})