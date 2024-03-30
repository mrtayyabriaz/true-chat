import { io } from "socket.io-client";
import ContactsList from "./Contacts/ContactsList";
import MsgContainer from "./Messages/MsgContainer";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/Hooks/Hooks";
import { toast } from "sonner";

export default function Chat() {

  const currentContact = useAppSelector((state) => state.currentContact)
  const contacts = useAppSelector((state) => state.contacts)
  const [activeChat, setActiveChat] = useState<string | boolean>(false)
  const [message, setMessage] = useState('')
  const [sender, setSender] = useState(false)

  const [messages, setMessages] = useState([{
    message: 'RightMessage',
    room: 'Tayyab Riaz',
    Received: true,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    room: 'Tayyab Riaz',
    Received: false,
    time: '5:52 PM',
  }])

  interface messageInterface {
    message: any;
    room: string;
    Received: boolean;
    time: string;
  }
  const displayMessage = (message: messageInterface) => {
    console.log(message);
    setMessages((preMessages) => [...preMessages, message])
  }


  /*==================================================================================
  =================================== web RTC  ( START ) =============================
  ==================================================================================*/
  const socket = io("http://localhost:3000");



  const handleSend = useCallback((e: any) => {
    setSender(true)
    e.preventDefault()
    socket.emit('Message-Sent', message, currentContact)
    const theMessage = {
      message: message,
      room: currentContact,
      Received: false,
      time: '5:52 PM'
    }
    displayMessage(theMessage)
  }, [message, currentContact])

  function joinRoom(room: string) {
    socket.emit('join', room)
  }

  useEffect(() => {
    socket.on("connect", () => {

      socket.emit('join', contacts)

      console.log('id:: ', socket.id); // x8WIv7-mJelg7on_ALbx
      toast("Network Connected", {
        description: "Online",
        action: {
          label: "Dismiss",
          onClick: () => console.log("Undo"),
        },
      })

    });
  }, []);


  useEffect(() => {
    socket.on("Message-Received", (data) => {
      const theMessage = {
        message: data.message,
        room: data.room,
        Received: true,
        time: '5:52 PM'
      }

      sender == true ? theMessage.Received = false : ''
      displayMessage(theMessage)
      // setSender(false)
      // console.log(messages);
      console.log(data);
    })
  }, [])

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("disconnected");
      toast("Network DisConnected", {
        action: {
          label: "Try Again",
          onClick: () => console.log("Undo"),
        },
      })
    })
  }, [])
  /*==================================================================================
=================================== web RTC   ( END )  =============================
==================================================================================*/

  return (
    <div className={`w-full grid grid-cols-8 sm:grid-cols-8 bg-zinc-100 dark:bg-zinc-900`}>
      {window.innerWidth < 640 ?
        !activeChat ?
          <ContactsList joinRoom={joinRoom} setActiveChat={setActiveChat} />
          :
          <MsgContainer messages={messages} setActiveChat={setActiveChat} handleSend={handleSend} setMessage={setMessage} message={message} />
        :
        <>
          <ContactsList joinRoom={joinRoom} setActiveChat={setActiveChat} />
          <MsgContainer messages={messages} setActiveChat={setActiveChat} handleSend={handleSend} setMessage={setMessage} message={message} />
        </>

      }

    </div>
  );
}
