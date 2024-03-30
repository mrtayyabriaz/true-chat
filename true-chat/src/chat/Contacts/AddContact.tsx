import { useAppDispatch } from "@/Hooks/Hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SetNewContacts } from "@/store/mainSlice"
import { ArrowBigRight } from "lucide-react"
import { useState } from "react"
interface AddContactProps {
  contacts: ({
    contactName: string;
    ContactMessages: ({ message: string; room: string; Received: boolean; time: string; })[]
  })[]
  setContacts: React.Dispatch<React.SetStateAction<{ contactName: string; ContactMessages: { message: string; room: string; Received: boolean; time: string; }[]; }[]>>
  joinRoom: (room: string) => void
}
function AddContact({ contacts, setContacts, joinRoom }: AddContactProps) {
  const [adding, setAdding] = useState(false)
  const [contact, setContact] = useState('')

  const dispatch = useAppDispatch()

  const AddNewContact = () => {
    interface newContactInt {
      contactName: string;
      ContactMessages: ({ message: string; room: string; Received: boolean; time: string; })[]

    }
    const newContact: newContactInt = {
      contactName: contact,
      ContactMessages: [{
        message: 'newRightMessage2',
        room: 'Tayyab Riaz',
        Received: false,
        time: '5:52 PM',
      }]
    }



    // console.log(newContact);
    const NewContactsList = [newContact, ...contacts]
    // console.log(NewContactsList);
    dispatch(SetNewContacts(NewContactsList))
    setContacts(NewContactsList)
    setContact('')
    joinRoom(newContact.contactName)
    setAdding(false)
  }
  return (
    <>
      {!adding &&
        <div className="border-b">
          <div onClick={() => {
            setAdding(true)
          }} className="px-1 py-1 m-2 rounded-lg flex items-center justify-start hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-700 cursor-pointer">
            <div className='flex justify-center items-center w-full'>
              <div className="text-lg text-zinc-100">+</div>
            </div>
          </div>
        </div>
      }



      {adding &&
        <div className="px-2 py-3 flex items-center justify-start border-b border-zinc-700 ">
          <div className="flex">
            <div className="text-lg text-zinc-100">
              <Input value={contact} autoFocus onChange={(e) => {
                setContact(e.target.value)
              }} className="bg-zinc-700" type="text" />
            </div>
            <Button className="text-zinc-200 ml-2 bg-zinc-600" onClick={() => { AddNewContact() }}>
              <ArrowBigRight />
            </Button>
          </div>
        </div>
      }
    </>
  )
}

export default AddContact