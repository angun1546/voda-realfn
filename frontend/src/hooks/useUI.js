import { useState, useEffect } from 'react'
import { getUI } from '../utils/settings'

/**
 * 현재 언어의 UI 번역 객체를 반환하는 훅.
 * 언어가 변경되면 자동으로 리렌더링된다.
 */
export default function useUI() {
  const [ui, setUi] = useState(getUI)

  useEffect(() => {
    const handler = () => setUi(getUI())
    window.addEventListener('voda-lang-change', handler)
    return () => window.removeEventListener('voda-lang-change', handler)
  }, [])

  return ui
}
