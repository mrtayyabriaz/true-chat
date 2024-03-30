import { Settings } from 'lucide-react'
import ContactName from './ContactName.tsx'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/Hooks/Hooks.ts'
import { setCurrentContact } from '@/store/mainSlice.tsx'
import AddContact from './AddContact.tsx'
interface ContactsListProps {
  joinRoom: (room: string) => void
  setActiveChat: React.Dispatch<React.SetStateAction<string | boolean>>
}
function ContactsList({ joinRoom, setActiveChat }: ContactsListProps) {
  const theContacts = useAppSelector(state => state.contacts)
  const [contacts, setContacts] = useState<({
    contactName: string;
    ContactMessages: ({ message: string; room: string; Received: boolean; time: string; })[]
  })[]>(theContacts)
  useEffect(() => {
    setContacts(theContacts)
  }, [])

  const dispatch = useAppDispatch()
  return (
    <>
      <div className="col-span-8 sm:col-span-3">

        <div className="flex justify-between items-center px-4 h-14 py-2 border-r border-zinc-500 sticky top-0 bg-zinc-600">
          <h1 className="text-zinc-100 font-bold text-xl">True Chat</h1>
          <button className="bg-teal-200 dark:bg-zinc-800 dark:hover:bg-teal-800 text-black dark:text-zinc-100 px-4 py-2 rounded-md">
            <Settings />
          </button>
        </div>


        <div className=''>
          <div className="border-r border-zinc-600 h-[calc(100vh-3.5rem)] max-h-[100vh] overflow-y-scroll">
            <AddContact contacts={theContacts} setContacts={setContacts} joinRoom={joinRoom} />
            {contacts.map((contact, index) => {
              return (
                <div key={index} onClick={() => {
                  dispatch(setCurrentContact(contact.contactName))
                  setActiveChat(contact.contactName)
                }}>
                  <ContactName name={contact.contactName} />
                </div>
              )
            })}


          </div>
        </div>
      </div>
    </>
  )
}

export default ContactsList