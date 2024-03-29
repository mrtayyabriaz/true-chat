import { Outlet } from 'react-router-dom'
// import { Footer } from './components'
// import Header from './components/Head/Header'

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default Layout