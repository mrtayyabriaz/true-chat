import express from "express"
import path from "path";
import { createServer } from "http"
import { Server } from "socket.io"
import 'dotenv/config'

const app = express();
const port = process.env.PORT;
const server = createServer(app);

const __dirname = path.resolve();

const io = new Server(server, {
  path: '/chat',
  wssEngine: ['ws', 'wss'],
  transports: ['websocket', 'polling'],
  allowE103: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

app.get('/backend', (req, res) => {
  const origin = process.env.ORIGIN;
  console.log(origin);
  const r = 'Hi! ORIGINS::: ' + origin + '  -  Ports::: ' + process.env.PORT;
  res.send(r)
})


io.on("connection", (socket) => {
  console.log('connected to server:' + socket.id);

  const userID = socket.handshake.query.userID;

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


app.use(express.static(path.join(__dirname, "/true-chat/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "true-chat", "dist", "index.html"));
});



server.listen(port, () => {
  console.log(`True Chat Listening on port ${port}`)
})