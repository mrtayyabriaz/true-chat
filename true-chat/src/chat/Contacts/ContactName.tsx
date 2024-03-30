import { User2 } from 'lucide-react'
interface ContactInterface {
  name: string
}
function ContactName({ name }: ContactInterface) {
  return (
    <>
      <div className="px-2 py-3 flex items-center justify-start hover:bg-zinc-100 dark:hover:bg-zinc-800 border-b border-zinc-700 cursor-pointer">
        <div className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-zinc-700 mr-2">
          <User2 className='text-zinc-300' />
        </div>
        <div>
          <div className="text-lg text-zinc-100">{name}</div>
          <div className="text-sm text-zinc-300 dark:text-zinc-400">Last message</div>
        </div>
      </div>
    </>
  )
}

export default ContactName