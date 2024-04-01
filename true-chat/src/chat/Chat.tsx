import { io } from "socket.io-client";
import ContactsList from "./Contacts/ContactsList";
import MsgContainer from "./Messages/MsgContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Hooks/Hooks";
import { toast } from "sonner";
import { SaveMessage, SaveNewContact, setUserName } from "@/store/mainSlice";
const socket = io("http://localhost:3000");

export default function Chat() {

  //==================== set defaults ( START ) =========================== 
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
  const [username, setUsername] = useState('d')
  const dispatch = useAppDispatch()
  //==================== set defaults  ( END )  ===========================

  //====================== username ( START ) =============================
  useEffect(() => {
    if (localStorage.getItem('username')) {
      // socket.emit('username', localStorage.getItem('username'))
      setUsername(localStorage.getItem('username')!)
      dispatch(setUserName(username))
      joinRoom(username)
    } else {
      // set username
    }
  }, [username])
  //====================== username  ( END )  =============================

  //==================== set messages  ( START ) =========================== 
  interface messageInterface {
    message: string;
    room: string;
    Received: boolean;
    time: string;
  }
  const displayMessage = (message: messageInterface): void => {
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
  //==================== set messages   ( END )  ===========================


  /*==================================================================================
  =================================== web RTC  ( START ) =============================
  ==================================================================================*/

  //====================== join room ( START ) =========================
  function joinRoom(room: string): void {
    socket.emit('join', room)
  }
  //====================== join room  ( END )  =========================

  //====================== send ( START ) ========================= 
  const handleSend = (e: any) => {
    e.preventDefault()
    socket.emit('Message-Sent', message, currentContact, username)
    // const d = new Date();
    // console.log(d);
    // d.getTime();
    // console.log(d);
    // console.log(d.toLocaleTimeString());
    // console.log(d.getTime());


    const theMessage = {
      message: message,
      room: currentContact,
      Received: false,
      time: '11:05 AM'
    }
    displayMessage(theMessage)


    dispatch(SaveMessage({
      message: message,
      from: currentContact,
      Received: false,
      time: '11:04 AM',
      to: username,
    }))


  }
  //====================== send  ( END )  =========================



  useEffect(() => {
    console.log(message);

    //==================== connect ( START ) =========================== 
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
    //==================== connect  ( END )  ===========================


    //======================= Receive ( START ) ============================ 
    socket.on("Message-Received", (data) => {
      console.log(data);

      //=========== get sender ( START ) =================

      let realSender;

      const sender = contacts.filter((contact) => {
        if (contact.contactName == data.from) {
          return data.from
        }
      })
      // if sender found in chat list save message there
      if (sender[0]) {
        realSender = sender[0].contactName

      } else {

        //======= create contact ( START ) =========
        // if contact not found add new contact
        const newContact = {
          contactName: data.from,
          ContactMessages: []
        }
        dispatch(SaveNewContact(newContact))
        //======= create contact  ( END )  =========

        realSender = data.from
      }
      //=========== get sender  ( END )  =================

      dispatch(SaveMessage({
        from: realSender,
        to: data.room,
        message: data.message,
        time: '5:13 PM',
        Received: true,
      }))

      const theMessage = {
        message: data.message,
        room: data.room,
        Received: true,
        time: '5:52 PM'
      }
      displayMessage(theMessage)
    })
    //======================= Receive  ( END )  ============================



    //======================== Disconected ( START ) ===========================
    socket.on("disconnect", () => {
      console.log("disconnected");

      toast("Network DisConnected", {
        action: {
          label: "Try Again",
          onClick: () => console.log("Undo"),
        },
      })
    })
    //======================== Disconected  ( END )  ===========================


  }, [])
  /*==================================================================================
=================================== web RTC   ( END )  =============================
==================================================================================*/

  return (
    <div className={`w-full grid grid-cols-8 sm:grid-cols-8 bg-zinc-100 dark:bg-zinc-900`}>
      {window.innerWidth < 640 ?
        // small Devices
        !activeChat ?
          <ContactsList joinRoom={joinRoom} setActiveChat={setActiveChat} username={username} />
          :
          <MsgContainer messages={messages} setActiveChat={setActiveChat} handleSend={handleSend} setMessage={setMessage} message={message} />
        // small Devices
        :
        // Big Deveices 
        <>
          <ContactsList joinRoom={joinRoom} setActiveChat={setActiveChat} username={username} />
          <MsgContainer messages={messages} setActiveChat={setActiveChat} handleSend={handleSend} setMessage={setMessage} message={message} />
          {/* <Profile /> */}
        </>
        // Big Deveices 

      }

    </div>
  );
}
