
const express = require('express')
const { default: mongoose } = require('mongoose')
require('dotenv').config();
const newUserModel = require("./models/model.js");
const userRouter = require('./routes/users.js')
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express()
const server = createServer(app);
app.use(express.json());
app.use(cors({origin : '*'}));
app.use('/user',userRouter);


const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    }
  });
  
  io.on('connection', (socket) => {
    console.log("connection established", socket.id);
    
  
    socket.emit("welcome",socket.id);
    socket.on('send',(e)=>{
      console.log(e);
      io.sockets.emit('recieve',e);
    })
});
   

//middlewares





mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected")
   
    server.listen(process.env.PORT, () => console.log(process.env.PORT))
}).catch((e)=>{
    console.log(e);
})






