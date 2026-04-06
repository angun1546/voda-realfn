import { useState } from 'react'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { applyLanguage } from '../utils/settings'
import useUI from '../hooks/useUI'

const LanguagePage = () => {
  const navigate = useNavigate()
  const ui = useUI()

  const LANGUAGES = [
    { code: 'ko', flag: '🇰🇷', name: '한국어',            native: ui.lang_ko },
    { code: 'en', flag: '🇺🇸', name: 'English',           native: ui.lang_en },
    { code: 'ja', flag: '🇯🇵', name: '日本語',             native: ui.lang_ja },
    { code: 'zh-CN', flag: '🇨🇳', name: '中文 简体',       native: ui.lang_zh_CN },
    { code: 'zh-TW', flag: '🇹🇼', name: '中文 繁體',       native: ui.lang_zh_TW },
    { code: 'fr', flag: '🇫🇷', name: 'Français',          native: ui.lang_fr },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch',           native: ui.lang_de },
    { code: 'es', flag: '🇪🇸', name: 'Español',           native: ui.lang_es },
    { code: 'it', flag: '🇮🇹', name: 'Italiano',          native: ui.lang_it },
    { code: 'pt', flag: '🇧🇷', name: 'Português',         native: ui.lang_pt },
    { code: 'ru', flag: '🇷🇺', name: 'Русский',           native: ui.lang_ru },
    { code: 'ar', flag: '🇸🇦', name: 'العربية',           native: ui.lang_ar },
    { code: 'hi', flag: '🇮🇳', name: 'हिन्दी',            native: ui.lang_hi },
    { code: 'nl', flag: '🇳🇱', name: 'Nederlands',        native: ui.lang_nl },
    { code: 'pl', flag: '🇵🇱', name: 'Polski',            native: ui.lang_pl },
    { code: 'sv', flag: '🇸🇪', name: 'Svenska',           native: ui.lang_sv },
    { code: 'no', flag: '🇳🇴', name: 'Norsk',             native: ui.lang_no },
    { code: 'da', flag: '🇩🇰', name: 'Dansk',             native: ui.lang_da },
    { code: 'fi', flag: '🇫🇮', name: 'Suomi',             native: ui.lang_fi },
    { code: 'cs', flag: '🇨🇿', name: 'Čeština',           native: ui.lang_cs },
    { code: 'hu', flag: '🇭🇺', name: 'Magyar',            native: ui.lang_hu },
    { code: 'ro', flag: '🇷🇴', name: 'Română',            native: ui.lang_ro },
    { code: 'tr', flag: '🇹🇷', name: 'Türkçe',            native: ui.lang_tr },
    { code: 'th', flag: '🇹🇭', name: 'ไทย',               native: ui.lang_th },
    { code: 'id', flag: '🇮🇩', name: 'Bahasa Indonesia',  native: ui.lang_id },
    { code: 'ms', flag: '🇲🇾', name: 'Bahasa Melayu',     native: ui.lang_ms },
    { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt',        native: ui.lang_vi },
    { code: 'fil', flag: '🇵🇭', name: 'Filipino',         native: ui.lang_fil },
    { code: 'el', flag: '🇬🇷', name: 'Ελληνικά',          native: ui.lang_el },
    { code: 'he', flag: '🇮🇱', name: 'עברית',             native: ui.lang_he },
  ]

  const saved = localStorage.getItem('voda-language') || 'ko'
  const [selected, setSelected] = useState(saved)

  const handleSelect = (code) => {
    setSelected(code)
    applyLanguage(code)
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
          <h1 className='font-serif font-bold text-3xl text-white'>{ui.langTitle}</h1>
          <p className='font-serif text-sm text-neutral-500 mt-1'>{ui.langDesc}</p>
        </div>
      </div>

      {/* 언어 그리드 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-screen-2xl'>
        {LANGUAGES.map(({ code, flag, name, native }) => {
          const isSelected = selected === code
          return (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all text-left
                ${isSelected
                  ? 'bg-primary-500/15 border-primary-400/60 text-white'
                  : 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:bg-white/5 hover:border-white/10 hover:text-white'
                }`}
            >
              <span className='text-2xl shrink-0'>{flag}</span>
              <div className='flex flex-col min-w-0'>
                <span className='font-serif font-semibold text-sm truncate'>{name}</span>
                <span className='font-serif text-xs text-neutral-500 truncate'>{native}</span>
              </div>
              {isSelected && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className='absolute top-3 right-3 text-primary-400 text-xs'
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LanguagePage
