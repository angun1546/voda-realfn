import { useState } from 'react'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { applyQuality } from '../utils/settings'
import useUI from '../hooks/useUI'

const QualityPage = () => {
  const navigate = useNavigate()
  const ui = useUI()

  const QUALITIES = [
    {
      id: '4k-60',
      label: '4K Ultra HD',
      detail: '2160p · 60fps',
      desc: ui.q4kDesc,
      badge: ui.qPremium,
      badgeColor: 'text-secondary-400 border-secondary-400/40 bg-secondary-500/10',
    },
    {
      id: '1080p-60',
      label: '1080p',
      detail: '1080p · 60fps',
      desc: ui.q1080_60Desc,
      badge: ui.qRecommended,
      badgeColor: 'text-primary-400 border-primary-400/40 bg-primary-500/10',
      default: true,
    },
    {
      id: '1080p-30',
      label: '1080p',
      detail: '1080p · 30fps',
      desc: ui.q1080_30Desc,
    },
    {
      id: '720p-60',
      label: '720p',
      detail: '720p · 60fps',
      desc: ui.q720_60Desc,
    },
    {
      id: '720p-30',
      label: '720p',
      detail: '720p · 30fps',
      desc: ui.q720_30Desc,
    },
    {
      id: '480p',
      label: '480p',
      detail: '480p · 30fps',
      desc: ui.q480Desc,
    },
    {
      id: '360p',
      label: '360p',
      detail: '360p · 30fps',
      desc: ui.q360Desc,
    },
    {
      id: 'auto',
      label: ui.qAuto,
      detail: 'Auto',
      desc: ui.qAutoDesc,
    },
  ]

  // 기본값: 1080P 60fps 우선
  const saved = localStorage.getItem('voda-quality') || '1080p-60'
  const [selected, setSelected] = useState(saved)

  const handleSelect = (id) => {
    setSelected(id)
    applyQuality(id)
  }

  return (
    <div className='min-h-screen bg-neutral-950 text-white px-12 py-12'>
      {/* 헤더 */}
      <div className='flex items-center gap-5 mb-12'>
        <button
          onClick={() => navigate('/profile')}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors'
        >
          <FontAwesomeIcon icon={faArrowLeft} className='text-neutral-300' />
        </button>
        <div>
          <h1 className='font-serif font-bold text-3xl text-white'>{ui.qualityTitle}</h1>
          <p className='font-serif text-sm text-neutral-500 mt-1'>{ui.qualityDesc}</p>
        </div>
      </div>

      {/* 화질 목록 */}
      <div className='flex flex-col gap-3 max-w-2xl'>
        {QUALITIES.map(({ id, label, detail, desc, badge, badgeColor }) => {
          const isSelected = selected === id
          return (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className={`relative flex items-center gap-5 px-6 py-5 rounded-2xl border transition-all text-left
                ${isSelected
                  ? 'bg-primary-500/15 border-primary-400/60'
                  : 'bg-zinc-900/40 border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
            >
              {/* 선택 인디케이터 */}
              <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all
                ${isSelected ? 'border-primary-400 bg-primary-400' : 'border-neutral-600'}`}>
                {isSelected && <div className='w-2 h-2 rounded-full bg-white' />}
              </div>

              {/* 화질 정보 */}
              <div className='flex-1 flex flex-col gap-0.5'>
                <div className='flex items-center gap-3'>
                  <span className={`font-serif font-bold text-lg ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {label}
                  </span>
                  <span className={`font-serif text-sm ${isSelected ? 'text-primary-400' : 'text-zinc-500'}`}>
                    {detail}
                  </span>
                  {badge && (
                    <span className={`font-serif text-xs px-2 py-0.5 rounded-full border ${badgeColor}`}>
                      {badge}
                    </span>
                  )}
                </div>
                <p className={`font-serif text-sm ${isSelected ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {desc}
                </p>
              </div>

              {isSelected && (
                <FontAwesomeIcon icon={faCheck} className='text-primary-400 text-sm shrink-0' />
              )}
            </button>
          )
        })}
      </div>

      {/* 안내 문구 */}
      <p className='mt-8 font-serif text-xs text-neutral-600 max-w-2xl'>
        {ui.qualityNote}
      </p>
    </div>
  )
}


export default QualityPage
