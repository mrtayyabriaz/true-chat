'use client'
import { useEffect, useState } from 'react'
import Messages from './Messages'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

import { io } from "socket.io-client";



function Day() {
  // const [disconnected, setDisconnected] = useState(false)
  const [socketId, setSocketId] = useState(false)
  const [messages, setMessages] = useState([{
    message: 'RightMessage',
    Received: true,
    time: '5:52 PM',
  },
  {
    message: 'LeftMessage',
    Received: false,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    Received: false,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    Received: true,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    Received: false,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    Received: false,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    Received: false,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    Received: false,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    Received: false,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    Received: false,
    time: '5:52 PM',
  }])
  const displayMessage = (message: any) => {
    console.log(message);
    message.Received = true;
    message.time = '5:52 PM';
    console.log(message);
    setMessages([...messages, message])
  }
  /*==================================================================================
  =================================== web RTC  ( START ) =============================
  ==================================================================================*/
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {

      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
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
    socket.on("Message-Reveived", (data) => {
      const theData = { message: data, }
      displayMessage(theData)
      toast(data)
      console.log(messages);
      console.log(data);
    })
  }, [])

  socket.on("disconnect", () => {
    console.log("disconnected");
    toast("Network DisConnected", {
      action: {
        label: "Try Again",
        onClick: () => console.log("Undo"),
      },
    })
  })
  /*==================================================================================
  =================================== web RTC   ( END )  =============================
  ==================================================================================*/



  return (
    <>
      <Toaster toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-green-500",
        },
      }} theme={'dark'} position='bottom-left' className='dark:bg-gray-800 w-max' />

      <div className='text-zinc-400 bg-zinc-800 rounded-md mx-auto max-w-max py-1 px-1.5'>YESTERDAY
      </div>
      <Messages messages={messages} />
    </>
  )
}

export default Day