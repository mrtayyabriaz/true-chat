import { io } from "socket.io-client";
import ContactsList from "./Contacts/ContactsList";
import MsgContainer from "./Messages/MsgContainer";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/Hooks/Hooks";
import { toast } from "sonner";
const socket = io("http://localhost:3000");

export default function Chat() {

  const currentContact = useAppSelector((state) => state.currentContact)
  const contacts = useAppSelector((state) => state.contacts)
  const [activeChat, setActiveChat] = useState<string | boolean>(false)
  const [message, setMessage] = useState('')
  // const [socketId, setSocketId] = useState('')


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

  useEffect(() => {
    contacts.map((contact) => {
      if (contact.contactName === currentContact) {
        setMessages(contact.ContactMessages)
      }
    })
  }, [currentContact])


  /*==================================================================================
  =================================== web RTC  ( START ) =============================
  ==================================================================================*/



  const handleSend = (e: any) => {
    e.preventDefault()
    socket.emit('Message-Sent', message, currentContact)

    const theMessage = {
      message: message,
      room: currentContact,
      Received: false,
      time: '5:52 PM'
    }
    displayMessage(theMessage)
  }

  function joinRoom(room: string) {
    socket.emit('join', room)
  }


  useEffect(() => {
    console.log(message);


    socket.on("connect", () => {
      console.log('id:: ', socket.id); // x8WIv7-mJelg7on_ALbx


      socket.emit('join', contacts)

      toast("Network Connected", {
        description: "Online",
        action: {
          label: "Dismiss",
          onClick: () => console.log("Undo"),
        },
      })
    });



    socket.on("Message-Received", (data) => {
      const theMessage = {
        message: data.message,
        room: data.room,
        Received: true,
        time: '5:52 PM'
      }

      displayMessage(theMessage)

      // setSender(false)
      // console.log(messages);
      console.log(data);
    })




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
