
const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const terms = require("./terms")

const app = express()
app.use(cors())
app.use(express.static("frontend"))

const server = http.createServer(app)
const io = new Server(server)

let rooms = {}

io.on("connection",(socket)=>{

socket.on("createRoom",()=>{
const code = Math.floor(1000+Math.random()*9000)

rooms[code]={
players:[],
scores:{},
started:false
}

socket.join(code)
socket.emit("roomCreated",code)
})

socket.on("joinRoom",(data)=>{
const room = rooms[data.code]
if(!room) return

room.players.push({
id:socket.id,
name:data.name,
emoji:data.emoji
})

room.scores[socket.id]=0

socket.join(data.code)

io.to(data.code).emit("players",room.players)
})

socket.on("startGame",(code)=>{
const room = rooms[code]
room.started=true

io.to(code).emit("gameStarted")
})

socket.on("correctWord",(data)=>{
rooms[data.code].scores[socket.id]+=data.points

io.to(data.code).emit("scores",rooms[data.code].scores)
})

})

server.listen(3000,()=>console.log("server running"))
