import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faUserCircle, 
  faBell, 
  faBars, 
  faXmark,
  faCircleQuestion
} from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge'
import useUI from '../hooks/useUI'
import Alarm from './Alarm'

const GNB = () => {
  const [query, setQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ui = useUI()
  const navigate = useNavigate()
  const [isAlarmOpen, setIsAlarmOpen] = useState(false)

  const menus = [
    { name: ui.home || '홈',   path: '/' },
    { name: ui.movie || '영화보다',  path: '/movie' },
    { name: ui.tv || 'TV보다',     path: '/tv' },
    { name: ui.person || '찾아보다', path: '/person' },
    { name: ui.ask || '물어보다',    path: '/ask' },
  ]

  const linkStyle = ({ isActive }) =>
    twMerge(
      'relative font-serif text-sm md:text-base lg:text-xl font-bold tracking-tight transition-colors pb-3 whitespace-nowrap !text-primary-400',
      'after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full after:transition-all duration-300',
      isActive
        ? 'after:bg-white'
        : 'after:bg-transparent hover:after:bg-white/60',
    )

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <header className='sticky top-0 z-50 flex items-center justify-between px-4 py-4 md:px-8 lg:px-12 md:py-6 bg-[rgba(14,14,19,0.4)] backdrop-blur-md border-b border-white/10 shadow-glow-purple h-20 md:h-24'>
        <div className='flex items-center gap-4 md:gap-8 lg:gap-18'>
          {/* 모바일 햄버거 메뉴 버튼 */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className='md:hidden text-primary-400 hover:text-primary-300 transition-colors text-2xl px-1 flex items-center justify-center'
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <Link to='/' className='font-sans text-2xl md:text-3xl font-bold tracking-tighter text-neutral-50 whitespace-nowrap flex items-center'>VODA</Link>
          <nav className='hidden md:flex items-center gap-4 lg:gap-8 xl:gap-12'>
            {menus.map((m) => (
              <NavLink key={m.path} to={m.path} end={m.path === '/'} className={linkStyle}>{m.name}</NavLink>
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-3 md:gap-6 lg:gap-8'>
          <form onSubmit={handleSearch} className='flex items-center gap-2 md:gap-3 px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md'>
            <Link to='/find' className='flex items-center'><FontAwesomeIcon icon={faSearch} className='text-neutral-400 text-base md:text-lg hover:text-primary-400 transition-colors cursor-pointer' /></Link>
            <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder={ui.search} className='bg-transparent font-serif text-sm md:text-base lg:text-xl !text-white placeholder:text-neutral-500 w-24 sm:w-40 md:w-52 lg:w-72 outline-none' />
          </form>

          <div className='relative flex items-center justify-center'>
            <button onClick={() => setIsAlarmOpen(!isAlarmOpen)} className={`transition-colors text-xl md:text-2xl flex items-center justify-center h-10 w-10 ${isAlarmOpen ? 'text-primary-400' : 'text-neutral-400 hover:text-primary-400'}`}>
              <FontAwesomeIcon icon={faBell} />
            </button>
            <Alarm isOpen={isAlarmOpen} onClose={() => setIsAlarmOpen(false)} />
          </div>

          <Link to='/profile' className='hidden sm:flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-neutral-400 hover:text-primary-400 transition-colors text-2xl md:text-3xl ring-2 ring-primary-400 rounded-full overflow-hidden'>
            <FontAwesomeIcon icon={faUserCircle} />
          </Link>
        </div>
      </header>

      {/* 모바일 사이드 드로어 메뉴 */}
      <div className={twMerge(
        'fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden',
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )} onClick={() => setIsMenuOpen(false)}>
        <div 
          className={twMerge(
            'absolute top-0 left-0 bottom-0 w-[280px] bg-neutral-900 shadow-2xl transition-transform duration-300 p-6 flex flex-col',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex items-center justify-between mb-10'>
            <span className='font-sans text-2xl font-bold tracking-tighter text-primary-400'>VODA</span>
            <button onClick={() => setIsMenuOpen(false)} className='text-neutral-400 text-2xl'>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <nav className='flex flex-col gap-6 flex-1'>
            {menus.map((m) => (
              <NavLink 
                key={m.path} 
                to={m.path} 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => twMerge(
                  'font-serif text-xl font-semibold transition-colors flex items-center justify-between',
                  isActive ? 'text-primary-400' : 'text-neutral-300'
                )}
              >
                {m.name}
                <div className='w-1.5 h-1.5 rounded-full bg-primary-400/50' />
              </NavLink>
            ))}
          </nav>

          <div className='pt-6 border-t border-white/10'>
            <Link 
              to='/ask' 
              onClick={() => setIsMenuOpen(false)}
              className='flex items-center gap-3 text-neutral-400 hover:text-white transition-colors py-2'
            >
              <FontAwesomeIcon icon={faCircleQuestion} />
              <span className='font-serif font-medium'>도움말 및 지원</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}


export default GNB
