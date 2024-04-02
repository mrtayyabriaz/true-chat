// import Chat from '@/chat/Chat'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <Chat /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default ProfileLayout