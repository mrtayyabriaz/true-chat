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

  socket.on("join", (contacts) => {
    socket.join(contacts)
  })

  //==================== Message Sent ( START ) ========================

  socket.on("Message-Sent", (newMessage, room, username) => {

    if (room === '') {
      socket.broadcast.emit("Message-Received", {
        message: newMessage,
        room: '',
        from: username,
      })
    } else {

      const theMessage = { message: newMessage, room: room, from: username, }
      socket.in(room).emit("Message-Received", theMessage)

    }
  })
  //==================== Message Sent  ( END )  ========================

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