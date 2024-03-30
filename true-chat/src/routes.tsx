import { Route, createBrowserRouter, createRoutesFromElements, Navigate, RouterProvider, Link } from 'react-router-dom'
import Chat from './chat/Chat'
import Layout from './Layout'

function Routes() {

  const router = createBrowserRouter(
    createRoutesFromElements(<>
      <Route path='/' element={<Layout />}>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="" element={<Link to={'/chat'} className='text-4xl text-blue-500'>Chat</Link>} />
        <Route path="chat" element={<Chat />} />
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