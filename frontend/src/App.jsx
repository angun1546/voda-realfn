import { Outlet, useLocation } from 'react-router'
import { useEffect, useMemo } from 'react'
import GNB from './components/GNB'
import Footer from './components/Footer'
import ChatBtn from './components/ChatBtn'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const getPageAnim = (pathname) => {
  if (pathname === '/')                    return 'page-scale-fade'
  if (pathname === '/movie')               return 'page-slide-right'
  if (pathname === '/tv')                  return 'page-slide-right'
  if (pathname.startsWith('/person'))      return 'page-slide-up'
  if (pathname === '/ask')                 return 'page-slide-left'
  return 'page-fade'
}

const Layout = () => {
  const { pathname } = useLocation()
  const animClass = useMemo(() => getPageAnim(pathname), [pathname])
  const isAskPage = pathname === '/ask'

  return (
    <div className='min-h-screen flex flex-col bg-base'>
      <ScrollToTop />
      <GNB />
      <main className='flex-1 w-full max-w-content mx-auto'>
        <div key={pathname} className={animClass}>
          <Outlet />
        </div>
      </main>
      <Footer />
      {!isAskPage && <ChatBtn />}
    </div>
  )
}

export default Layout
