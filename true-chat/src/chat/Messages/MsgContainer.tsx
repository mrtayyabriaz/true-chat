import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import Day from './Day'
import { useAppSelector } from "@/Hooks/Hooks"
import { io } from "socket.io-client"

function MsgContainer() {
  const currentContact = useAppSelector((state) => state.currentContact)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([{
    message: 'RightMessage',
    Received: true,
    time: '5:52 PM',
  }, {
    message: 'LeftMessage',
    Received: false,
    time: '5:52 PM',
  }])
  interface messageInterface {
    message: any;
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

  const handleSend = (e: any) => {
    e.preventDefault()
    socket.emit('Message-Sent', message, currentContact)
  }

  useEffect(() => {
    socket.on("connect", () => {

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
    socket.on("Message-Reveived", (data) => {
      const theMessage = {
        message: data,
        Received: true,
        time: '5:52 PM'
      }

      displayMessage(theMessage)
      console.log(messages);
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
    <>
      <div className="flex flex-col col-span-5">
        <div className="">
          <Toaster toastOptions={{
            classNames: {
              toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg w-max",
              description: "group-[.toast]:text-green-500",
              actionButton: "ml-4"
            },
          }} visibleToasts={2} theme={'dark'} duration={3000} position='bottom-left' className='dark:bg-gray-800 w-max' />
        </div>

        <div className="flex flex-col justify-between relative">

          <div className='col-span-5 h-14 bg-zinc-600 fixed top-0 w-full py-3 flex justify-between items-center'>
            <div className='text-gray-100 pl-4'>{currentContact}</div>
            <div className='me-4 py-1 px-2 rounded-lg hover:bg-teal-800 cursor-pointer'>:</div>
          </div>

          <div className="pt-14">
            <div className='overflow-y-scroll pt-2 h-[calc(100vh-3.5rem)]'>

              <Day day='YESTERDAY' dayMessages={messages} />

            </div>
          </div>

          <form onSubmit={handleSend}>
            <div className="absolute w-full bottom-0 p-2 bg-zinc-300 dark:bg-zinc-800 grid grid-cols-12">

              <div className="col-span-10">
                <Input onChange={(e) => {
                  setMessage(e.target.value)
                }} value={message} autoFocus type="text" placeholder="Type message.." className='bg-zinc-200 text-zinc-100 dark:bg-zinc-700 focus-visible:ring-0 ring-0 border-none' />
              </div>
              <Button type="submit"
                className="col-span-2 ml-2"><ArrowRightIcon /></Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default MsgContainer