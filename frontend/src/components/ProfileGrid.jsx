import { useState } from 'react'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
<<<<<<< HEAD
import {
  faBell, faUser, faCog, faChevronRight, faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { EP } from '../api/tmdb'
=======
import { faBell, faUser, faCog, faChevronRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useUI from '../hooks/useUI'

const QUALITY_LABELS = {
  '4k-60': '4K 60fps', '1080p-60': '1080p 60fps', '1080p-30': '1080p 30fps',
  '720p-60': '720p 60fps', '720p-30': '720p 30fps',
  '480p': '480p', '360p': '360p', 'auto': 'Auto',
}
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)

const Toggle = ({ on, onToggle }) => (
  <button
    onClick={onToggle}
    className={`flex h-7 w-14 shrink-0 p-1 rounded-full transition-colors cursor-pointer ${on ? 'bg-primary-400 justify-end' : 'bg-neutral-800 justify-start'}`}
  >
    <div className='size-5 rounded-full bg-neutral-50' />
  </button>
)

const CardTitle = ({ icon, title }) => (
  <div className='flex items-center gap-3 mb-8'>
    <FontAwesomeIcon icon={icon} className='text-primary-400 text-xl' />
    <p className='font-serif text-2xl text-white font-bold'>{title}</p>
  </div>
)

<<<<<<< HEAD
const ProfileGrid = ({ user, movies = [], onLogout }) => {
  const [alarmSettings, setAlarmSettings] = useState({
    curation: true,
    interest: true,
    marketing: false
  })
=======
const ProfileGrid = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const ui = useUI()
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)

  const [alarmSettings, setAlarmSettings] = useState({ curation: true, interest: true, marketing: false })
  const [viewSettings, setViewSettings] = useState({ subtitle: true, autoplay: true, dataSaver: false })

  const toggleAlarm = (key) => setAlarmSettings(prev => ({ ...prev, [key]: !prev[key] }))
  const toggleView  = (key) => setViewSettings(prev  => ({ ...prev, [key]: !prev[key] }))

  const langCode    = localStorage.getItem('voda-language') || 'ko'
  const qualityCode = localStorage.getItem('voda-quality')  || '1080p-60'

  // 현재 언어 표시명: UI 객체에서 가져오기
  const LANG_NATIVE = {
    ko: ui.lang_ko, en: ui.lang_en, ja: ui.lang_ja, 'zh-CN': ui.lang_zh_CN, 'zh-TW': ui.lang_zh_TW,
    fr: ui.lang_fr, de: ui.lang_de, es: ui.lang_es, it: ui.lang_it, pt: ui.lang_pt,
    ru: ui.lang_ru, ar: ui.lang_ar, hi: ui.lang_hi, nl: ui.lang_nl, pl: ui.lang_pl,
    sv: ui.lang_sv, no: ui.lang_no, da: ui.lang_da, fi: ui.lang_fi, cs: ui.lang_cs,
    hu: ui.lang_hu, ro: ui.lang_ro, tr: ui.lang_tr, th: ui.lang_th, id: ui.lang_id,
    ms: ui.lang_ms, vi: ui.lang_vi, fil: ui.lang_fil, el: ui.lang_el, he: ui.lang_he,
  }

  const QUALITY_LABELS = {
    '4k-60': '4K 60fps', '1080p-60': '1080p 60fps', '1080p-30': '1080p 30fps',
    '720p-60': '720p 60fps', '720p-30': '720p 30fps',
    '480p': '480p', '360p': '360p', 'auto': ui.qAuto,
  }

  return (
    <div className='flex flex-col gap-10 w-full max-w-screen-2xl mx-auto'>

<<<<<<< HEAD
      {/* 1. 상단 프로필 히어로 */}
      <div className='relative bg-neutral-900/50 border border-white/5 flex items-center justify-between p-10 rounded-3xl overflow-hidden'>
        
        {/* 배경 장식 (영화 포스터 그리드 - 우측 배치) */}
        <div className='absolute right-[-20px] top-[-20px] bottom-[-20px] w-1/3 flex gap-2 opacity-20 pointer-events-none skew-x-[-12deg]'>
          {movies.slice(0, 3).map((movie, idx) => (
            <div key={movie.id} className={`w-full h-full rounded-xl overflow-hidden border border-white/10 ${idx === 1 ? 'mt-12' : idx === 2 ? 'mt-24' : ''}`}>
              <img 
                src={EP.img(movie.poster_path, 'w500')} 
                alt='' 
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>

        <div className='relative z-10 flex items-center gap-8'>
=======
      {/* 상단 프로필 히어로 */}
      <div className='bg-neutral-900/50 border border-white/5 flex items-center justify-between p-10 rounded-3xl'>
        <div className='flex items-center gap-8'>
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)
          <div className='size-24 rounded-full bg-linear-to-br from-primary-400 to-secondary-400 p-0.5 shadow-glow-purple'>
            <div className='w-full h-full rounded-full bg-neutral-800 flex items-center justify-center text-3xl font-bold text-white'>
              {user?.name?.[0] || 'U'}
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-serif text-3xl text-white font-bold'>{user?.name}</p>
            <p className='font-serif text-lg text-neutral-500'>{user?.email}</p>
            {user?.isSubscribed && (
              <span className='mt-2 bg-secondary-500/20 text-secondary-400 border border-secondary-500/30 text-sm px-3 py-1 rounded-full w-fit'>
                {ui.profileSubscribed}
              </span>
            )}
          </div>
        </div>
<<<<<<< HEAD

        <div className='relative z-10 flex items-center gap-4'>
          <button className='bg-primary-500/10 text-primary-400 font-serif font-bold px-8 py-3 rounded-full hover:bg-primary-500/20 border border-primary-500/30 transition-colors cursor-pointer flex items-center gap-2'>
            구독 플랜
          </button>

          <button className='bg-zinc-900 border border-neutral-600 text-zinc-300 font-serif font-bold px-8 py-3 rounded-full hover:bg-zinc-800 hover:text-zinc-50 transition-colors cursor-pointer'>
            프로필 편집
=======
        <div className='flex items-center gap-4'>
          <button className='bg-primary-500/10 text-primary-400 font-serif font-bold px-8 py-3 rounded-full hover:bg-primary-500/20 border border-primary-500/30 transition-colors cursor-pointer flex items-center gap-2'>
            {ui.profilePlan}
          </button>
          <button className='bg-zinc-900 border border-[#525254] text-zinc-300 font-serif font-bold px-8 py-3 rounded-full hover:bg-zinc-800 hover:text-zinc-50 transition-colors cursor-pointer'>
            {ui.profileEdit}
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)
          </button>
        </div>
      </div>

      {/* 설정 카드 그리드 */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
<<<<<<< HEAD
        {/* 알림 설정 */}
        <div className='bg-zinc-900/40 p-8 rounded-36 border border-white/5 shadow-lg flex flex-col gap-8'>
          <CardTitle icon={faBell} title='알림 설정' />
=======

        {/* 알림 설정 */}
        <div className='bg-zinc-900/40 p-8 rounded-[32px] border border-white/5 shadow-lg flex flex-col gap-8'>
          <CardTitle icon={faBell} title={ui.notifSection} />
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)
          <div className='flex flex-col gap-6'>
            {[
              { key: 'curation', label: ui.notifCuration },
              { key: 'interest', label: ui.notifInterest },
              { key: 'marketing', label: ui.notifMarketing },
            ].map(item => (
              <div key={item.key} className='flex items-center justify-between'>
                <span className='text-zinc-500 font-serif text-[17px]'>{item.label}</span>
                <Toggle on={alarmSettings[item.key]} onToggle={() => toggleAlarm(item.key)} />
              </div>
            ))}
          </div>
        </div>

        {/* 계정 관리 */}
<<<<<<< HEAD
        <div className='bg-zinc-900/40 p-8 rounded-36 border border-white/5 shadow-lg flex flex-col gap-8'>
          <CardTitle icon={faUser} title='계정 관리' />
=======
        <div className='bg-zinc-900/40 p-8 rounded-[32px] border border-white/5 shadow-lg flex flex-col gap-8'>
          <CardTitle icon={faUser} title={ui.accountSection} />
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)
          <div className='flex flex-col gap-3 -mx-4'>
            {[ui.accountEmail, ui.accountPassword, ui.accountPayment, ui.accountCancel].map(label => (
              <button
                key={label}
                className='flex items-center justify-between w-full px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer'
              >
                <span className='text-zinc-500 font-serif text-[17px] group-hover:text-primary-300 transition-colors'>{label}</span>
                <FontAwesomeIcon icon={faChevronRight} className='text-primary-400/50 text-sm group-hover:text-primary-400 transition-colors' />
              </button>
            ))}
          </div>
        </div>

        {/* 시청 환경 */}
<<<<<<< HEAD
        <div className='bg-zinc-900/40 p-8 rounded-36 border border-white/5 shadow-lg flex flex-col gap-8'>
          <CardTitle icon={faCog} title='시청 환경' />
=======
        <div className='bg-zinc-900/40 p-8 rounded-[32px] border border-white/5 shadow-lg flex flex-col gap-8'>
          <CardTitle icon={faCog} title={ui.viewSection} />
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)
          <div className='flex flex-col gap-2 -mx-4'>
            <div className='flex flex-col gap-6 px-4 mb-4'>
              {[
                { key: 'subtitle',  label: ui.viewSubtitle },
                { key: 'autoplay',  label: ui.viewAutoplay },
                { key: 'dataSaver', label: ui.viewDataSaver },
              ].map(item => (
                <div key={item.key} className='flex items-center justify-between'>
                  <span className='text-zinc-500 font-serif text-[17px]'>{item.label}</span>
                  <Toggle on={viewSettings[item.key]} onToggle={() => toggleView(item.key)} />
                </div>
              ))}
            </div>

            {[
              { label: ui.settingLanguage, value: LANG_NATIVE[langCode] || langCode, path: '/settings/language' },
              { label: ui.settingQuality,  value: QUALITY_LABELS[qualityCode] || qualityCode,  path: '/settings/quality' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className='flex items-center justify-between w-full px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer'
              >
                <div className='flex flex-col items-start'>
                  <span className='text-zinc-500 font-serif text-[17px] group-hover:text-primary-300 transition-colors'>{item.label}</span>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className='text-primary-400/50 text-sm group-hover:text-primary-400 transition-colors' />
              </button>
            ))}
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* 3. 하단 액션 */}
=======
      {/* 하단 액션 */}
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)
      <div className='flex flex-col gap-3 pt-4 w-full'>
        <button
          onClick={onLogout}
          className='w-full flex items-center justify-start gap-4 px-8 py-4 rounded-full bg-neutral-900 border border-white/10 text-zinc-500 font-serif font-bold hover:bg-primary-400/10 hover:text-primary-400 hover:border-primary-400/20 transition-all cursor-pointer'
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-primary-400' />
          <span>{ui.logout}</span>
        </button>
        <button className='w-full flex items-center justify-start gap-4 px-8 py-4 rounded-full bg-neutral-900 border border-white/10 text-zinc-500 font-serif font-bold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all cursor-pointer'>
          <FontAwesomeIcon icon={faUser} className='text-red-500/60' />
          <span>{ui.deleteAccount}</span>
        </button>
      </div>
<<<<<<< HEAD

=======
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)
    </div>
  )
}

export default ProfileGrid
