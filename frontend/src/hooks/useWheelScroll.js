import { useCallback, useRef } from 'react'
import gsap from 'gsap'

/**
 * 마우스 휠(세로 스크롤)을 가로 스크롤로 변환하는 훅
 * GSAP를 사용하여 훨씬 부드러운 이동(Smoothness)을 구현합니다.
 */
export default function useWheelScroll() {
  const scrollTarget = useRef(0) // 실제 목표 스크롤 위치
  const cleanupRef = useRef(null)

  const ref = useCallback((el) => {
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
    if (!el) return

    // 현재 스크롤 위치 초기화
    scrollTarget.current = el.scrollLeft

    const handler = (e) => {
      if (Math.abs(e.deltaY) < 1) return // 미세한 휠 동작 무시
      
      e.preventDefault()
      e.stopPropagation() // Lenis(페이지 스크롤)로 이벤트 전파 차단

      // 스크롤 방향에 따라 목표치 갱신
      // 1.5배 가중치를 주어 더 경쾌하게 이동
      scrollTarget.current += e.deltaY * 1.5
      
      // 범위 제한 (0 ~ 최대 스크롤 가능 폭)
      const maxScroll = el.scrollWidth - el.clientWidth
      scrollTarget.current = Math.max(0, Math.min(scrollTarget.current, maxScroll))

      // GSAP를 이용한 부드러운 이동 (0.5초 동안 감속하며 이동)
      gsap.to(el, {
        scrollLeft: scrollTarget.current,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto' // 중복된 애니메이션 방지
      })
    }

    el.addEventListener('wheel', handler, { passive: false })
    cleanupRef.current = () => {
      el.removeEventListener('wheel', handler)
      gsap.killTweensOf(el) // 컴포넌트 언마운트 시 애니메이션 중단
    }
  }, [])

  return { ref }
}
