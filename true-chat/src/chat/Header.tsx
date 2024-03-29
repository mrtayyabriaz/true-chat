import { Settings } from 'lucide-react'

function Header() {
  return (
    <>
      <div className=" z-20 grid grid-cols-8">
        <div className="flex justify-between items-center px-4 py-2 col-span-3 border-r border-zinc-500">
          <h1 className="text-zinc-100 font-bold text-xl">My Chat</h1>
          <button className="bg-teal-200 dark:bg-zinc-800 dark:hover:bg-teal-800 text-black dark:text-zinc-100 px-4 py-2 rounded-md">
            <Settings />
          </button>
        </div>
        <div className='col-span-5 flex justify-between h-full items-center'>
          <div className='text-gray-100 pl-4'>Tayyab Riaz</div>
          <div className='me-4 py-1 px-2 rounded-lg hover:bg-teal-800 cursor-pointer'>:</div>
        </div>
        {/* <div className="border-b-2 border-gray-300"></div> */}
      </div>

    </>
  )
}

export default Header