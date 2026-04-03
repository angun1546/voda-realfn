import { useRef, useState, useEffect } from 'react'

/**
 * 요소가 뷰포트에 진입하면 visible = true 로 변경하는 훅
 * @param {number} threshold - 0~1, 요소가 몇 % 보일 때 트리거할지
 */
export default function useScrollAnim(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}
