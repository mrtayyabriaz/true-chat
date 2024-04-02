import { io } from "socket.io-client";
import ContactsList from "./Contacts/ContactsList";
import MsgContainer from "./Messages/MsgContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Hooks/Hooks";
import { toast } from "sonner";
import { SaveMessage, SaveNewContact, setUserName } from "@/store/mainSlice";
import config from "@/config/config";

const URL = process.env.NODE_ENV === "production" ? "https://true-chat.netlify.app" :
  "http://localhost:3000"

const socket = io(URL, {
  cert: process.env.NODE_ENV === "production" ? process.env.SSL_CERT : "",
  key: process.env.NODE_ENV === "production" ? process.env.SSL_KEY : "",
  path: "/chat",
  reconnection: true,
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
});



console.log(config.domain);

export default function Chat() {

  //==================== set defaults ( START ) =========================== 
  const currentContact = useAppSelector((state) => state.currentContact)
  const thecontacts = useAppSelector((state) => state.contacts)
  const [contacts, setContacts] = useState([...thecontacts])
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
  useEffect(() => {
    setContacts([...thecontacts])
    console.log('updated');

  }, [thecontacts])

  //====================== username ( START ) =============================
  useEffect(() => {
    if (localStorage.getItem('username')) {
      setUsername(localStorage.getItem('username')!)
      dispatch(setUserName(username))
      joinRoom(username)
    } else {
      // set username
    }
  }, [username])
  //====================== username  ( END )  =============================
  //==================== Get Time ( START ) ===========================
  function GetMessageTime(date: Date): { MsgTime: string, CompleteMsgTime: Date } {

    let hours = date.getHours()
    let minutes: number | string = date.getMinutes();
    let AP = 'AM';

    if (hours >= 12) {
      hours = hours - 12;
      AP = 'PM';
    }
    minutes = minutes <= 9 ? '0' + minutes : minutes
    // minutes = minutes == 0 ? "00" : minutes
    const time = hours + ':' + minutes + ' ' + AP;
    console.log(time);
    // console.log(date.toLocaleTimeString());
    return { MsgTime: time, CompleteMsgTime: date }
  }
  //==================== Get Time  ( END )  ===========================
  //==================== set messages  ( START ) =========================== 
  interface messageInterface {
    message: string;
    room: string;
    Received: boolean;
    time: string;
  }
  const displayMessage = (message: messageInterface): void => {
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
    const { MsgTime, CompleteMsgTime } = GetMessageTime(new Date())

    socket.emit('Message-Sent', message, currentContact, username, CompleteMsgTime)

    const theMessage = {
      message: message,
      room: currentContact,
      Received: false,
      time: MsgTime,
    }
    displayMessage(theMessage)


    dispatch(SaveMessage({
      message: message,
      from: currentContact,
      Received: false,
      time: MsgTime,
      to: username,
    }))

    setMessage('')
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
    socket.on("Message-Received", (data: {
      message: any;
      room: any;
      from: any;
      CompleteMsgTime: Date;
    }) => {
      console.log(data);

      //=========== get sender ( START ) =================

      let realSender;

      console.log('contacts:::', contacts);
      const sender = contacts.find((contact) => {
        console.log('contact:::', contact, ':::data.form:::', data.from);

        if (contact.contactName == data.from) {
          return contact
        }
      })
      // if sender found in chat list save message there
      if (sender) {
        realSender = sender.contactName

      } else {
        // if contact not found add new contact
        //======= create contact ( START ) =========

        dispatch(SaveNewContact({
          contactName: data.from,
          ContactMessages: [{
            message: 'saved Message',
            room: 'default',
            Received: false,
            time: '2:01 PM',
          }],
        }))
        //======= create contact  ( END )  =========
        realSender = data.from
      }
      //=========== get sender  ( END )  =================

      //======== Get Time ( START ) ========
      const CompleteMsgTime = new Date(data.CompleteMsgTime);
      const { MsgTime } = GetMessageTime(CompleteMsgTime)
      console.log('MsgTime :::: ', MsgTime);
      //======== Get Time  ( END )  ========

      dispatch(SaveMessage({
        from: realSender,
        to: data.room,
        message: data.message,
        time: MsgTime,
        Received: true,
      }))

      const theMessage = {
        message: data.message,
        room: data.room,
        Received: true,
        time: MsgTime,
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
