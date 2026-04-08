import { Outlet, useLocation } from 'react-router'
import { useEffect, useRef, useMemo } from 'react'
import GNB from './components/GNB'
import Footer from './components/Footer'
import ChatBtn from './components/ChatBtn'
import BottomNav from './components/BottomNav'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger)

const Layout = () => {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const lenisRef = useRef(null)

  // 1. Lenis (Smooth Scroll) 초기화
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // GSAP ScrollTrigger와 Lenis 동기화
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  // 2. 페이지 전환 애니메이션 (GSAP)
  useEffect(() => {
    if (!mainRef.current) return

    // 이전 애니메이션 제거
    gsap.killTweensOf(mainRef.current)

    // 페이지 진입 효과: 살짝 아래에서 위로 올라오며 페이드인
    gsap.fromTo(mainRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', clearProps: 'all' }
    )

    // 페이지 변경 시 최상단으로 부드럽게 이동
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  const isAskPage = pathname === '/ask'

  return (
    <div className='min-h-screen flex flex-col bg-base overflow-x-hidden'>
      <GNB />
      <main ref={mainRef} className='flex-1 w-full max-w-content mx-auto outline-none'>
        <Outlet />
      </main>
      <Footer />
      {!isAskPage && <ChatBtn />}
      <BottomNav />
    </div>
  )
}

export default Layout
