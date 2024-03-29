import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Day from './Day'

function MessagesBox() {
  return (
    <>
      <div className="flex flex-col col-span-5">
        <div className="flex flex-col justify-between relative">

          <div className='col-span-5 h-14 bg-zinc-600 fixed top-0 w-full py-3 flex justify-between items-center'>
            <div className='text-gray-100 pl-4'>Tayyab Riaz</div>
            <div className='me-4 py-1 px-2 rounded-lg hover:bg-teal-800 cursor-pointer'>:</div>
          </div>

          <div className="pt-14">
            <div className='overflow-y-scroll pt-2 h-[calc(100vh-3.5rem)]'>
              <Day />
            </div>
          </div>
          <div className="absolute w-full bottom-0 p-2 bg-zinc-300 dark:bg-zinc-800 grid grid-cols-12">
            <div className="col-span-10">
              <Input type="text" placeholder="Type message.." className='bg-zinc-200 text-zinc-100 dark:bg-zinc-700 focus-visible:ring-0 ring-0 border-none' />
            </div>
            <Button className="col-span-2 ml-2"><ArrowRightIcon /></Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MessagesBox