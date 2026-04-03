import { useRef, useCallback } from 'react'

/**
 * 마우스 휠(세로 스크롤)을 가로 스크롤로 변환하는 훅
 * 콜백 ref 방식: ref가 실제 DOM에 연결될 때 리스너를 붙이므로,
 * 컴포넌트가 초기에 null을 반환해도 정상 동작한다.
 */
export default function useWheelScroll() {
  const cleanupRef = useRef(null)

  const ref = useCallback((el) => {
    // 이전 요소에 붙인 리스너 제거
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
    if (!el) return

    const handler = (e) => {
      if (e.deltaY === 0) return
      e.preventDefault()
      el.scrollLeft += e.deltaY * 1.2
    }

    // passive: false 로 등록해야 preventDefault() 가 적용됨
    el.addEventListener('wheel', handler, { passive: false })
    cleanupRef.current = () => el.removeEventListener('wheel', handler)
  }, [])

  return { ref }
}
