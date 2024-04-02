import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import 'dotenv/config'

const app = express();
const port = process.env.PORT;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN]
  }
});

app.get('/', (req, res) => {
  const origins = process.env.ORIGINS;
  console.log(origins);
  const r = 'Hi! ORIGINS:::' + JSON.parse(JSON.stringify(origins)) + 'Ports::: ' + process.env.PORT;
  res.send('r')
})


io.on("connection", (socket) => {
  console.log('connected to server:' + socket.id);

  socket.on("join", (contacts) => {
    socket.join(contacts)
  })

  //==================== Message Sent ( START ) ========================

  socket.on("Message-Sent", (newMessage, room, username, CompleteMsgTime) => {

    if (room === '') {
      socket.broadcast.emit("Message-Received", {
        message: newMessage,
        room: '',
        from: username,
      })
    } else {

      const theMessage = { message: newMessage, room: room, from: username, CompleteMsgTime: CompleteMsgTime }
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