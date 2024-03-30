import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express();
const port = 3000;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


io.on("connection", (socket) => {
  console.log('connected to server:' + socket.id);

  // socket.join('Tayyab Riaz');

  socket.on("join", (contacts) => {
    socket.join(contacts)
  })

  socket.on("Message-Sent", (newMessage, room) => {
    if (room === '') {
      socket.broadcast.emit("Message-Received", { message: newMessage, room: '' })
    } else {
      const theMessage = { message: newMessage, room: room }
      socket.in(room).emit("Message-Received", theMessage)
    }
  })

  socket.on("JoinRoom", async (room, joined) => {
    socket.join(room)
    joined(`joined: ${room}`)
    console.log('joined room: ' + room);
    io.to(room).emit("joined", `join success: ${room} | user: ${socket.id}`)

  })

});


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})