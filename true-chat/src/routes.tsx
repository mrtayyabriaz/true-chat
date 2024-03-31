import { Route, createBrowserRouter, createRoutesFromElements, Navigate, RouterProvider, Link } from 'react-router-dom'
import Chat from './chat/Chat'
import Layout from './Layout'
import Profile from './setting/Profile'
import Appearance from './setting/Appearance'
// import Appearance from './setting/Appearance'

function Routes() {

  const router = createBrowserRouter(
    createRoutesFromElements(<>
      <Route path='/' element={<Layout />}>
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="" element={<Link to={'/chat'} className='text-4xl text-blue-500'>Chat</Link>} />
        <Route path="chat" element={<Chat />} />
        <Route path="setting/">
          <Route path="profile" element={<Profile />} />
          <Route path="appearance" element={<Appearance />} />
        </Route>
      </Route>
    </>

    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Routes