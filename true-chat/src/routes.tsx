import { Route, createBrowserRouter, createRoutesFromElements, Navigate, RouterProvider } from 'react-router-dom'
import Chat from './chat/Chat'
import Layout from './Layout'

function Routes() {

  const router = createBrowserRouter(
    createRoutesFromElements(<>
      <Route path='/' element={<Layout />}>
        <Route path="*" element={<Navigate to="/" />} />
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