import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const NAV_LINKS = [
  { label: '홈', path: '/' },
  { label: '영화보다', path: '/movies' },
  { label: 'TV보다', path: '/tv' },
  { label: '사람을 보다', path: '/people' },
  { label: '물어보다', path: '/ask' },
]

const GNB = () => {
  const location = useLocation()

  return (
    <header className='w-full bg-[#0e0e13] px-12 py-0 flex items-center justify-between h-[72px] border-b border-white/5'>
      {/* 로고 + 네비 */}
      <div className='flex items-center gap-12'>
        <Link to='/' className='text-[#fafafa] font-bold text-[30px] tracking-tight' style={{ fontFamily: 'Gmarket Sans TTF, sans-serif' }}>
          VODA
        </Link>
        <nav className='flex items-center gap-8'>
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[15px] font-medium transition-colors ${active ? 'text-[#a78bfa]' : 'text-[#a1a1aa] hover:text-[#fafafa]'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* 검색 + 알림 + 아바타 */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-3 bg-[#18181b] rounded-lg px-4 py-2.5 w-[280px]'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-[#71717a] text-sm' />
          <input
            type='text'
            placeholder='찾아보다'
            className='bg-transparent text-[#a1a1aa] text-sm outline-none w-full placeholder:text-[#a1a1aa]'
          />
        </div>
        <button className='text-[#71717a] hover:text-[#fafafa] transition-colors px-2'>
          <FontAwesomeIcon icon={faBell} className='text-xl' />
        </button>
        <div className='w-[38px] h-[38px] rounded-full bg-[#3f3f46] flex items-center justify-center cursor-pointer'>
          <span className='text-[#fafafa] text-sm font-medium'>U</span>
        </div>
      </div>
    </header>
  )
}

export default GNB
