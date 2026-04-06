import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 요소가 뷰포트에 진입할 때 GSAP 애니메이션을 실행하는 훅
 * @param {Object} options - 애니메이션 옵션 (y: 이동거리, duration: 시간, delay: 지연시간)
 */
export default function useScrollAnim({ y = 50, duration = 1, delay = 0, ease = 'power3.out' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const anim = gsap.fromTo(el,
      { opacity: 0, y: y },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: ease,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%', // 뷰포트 85% 지점에 닿으면 시작
          toggleActions: 'play none none none', // 한 번만 실행
        }
      }
    )

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill()
      anim.kill()
    }
  }, [y, duration, delay, ease])

  // 기존 반환 형태 [ref, visible]를 유지하기 위해 visible은 항상 true처럼 작동하게 하거나,
  // 필요에 따라 구조를 맞춥니다. 여기서는 ref만 반환하는 형태로 간소화하거나 
  // 기존 호환성을 위해 [ref]를 반환합니다.
  return [ref, true] 
}
