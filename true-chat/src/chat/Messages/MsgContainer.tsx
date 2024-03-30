import React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Toaster } from "@/components/ui/sonner"

import Day from './Day'
import { useAppSelector } from "@/Hooks/Hooks"
import { ArrowLeft } from "lucide-react"

interface MsgContainerProps {
  messages: object[]
  handleSend: React.FormEventHandler<HTMLFormElement>
  setMessage: React.Dispatch<React.SetStateAction<string>>
  message: string
  setActiveChat: React.Dispatch<React.SetStateAction<string | boolean>>
}
function MsgContainer({ messages, handleSend, setMessage, message, setActiveChat }: MsgContainerProps) {
  const currentContact = useAppSelector((state) => state.currentContact)




  return (
    <>
      <div className="flex flex-col col-span-8 sm:col-span-5">
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
            <div className='text-gray-100 pl-4'>
              <div className="flex gap-2"><ArrowLeft onClick={() => setActiveChat(false)} className="block sm:hidden cursor-pointer" />{currentContact}</div>
            </div>
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