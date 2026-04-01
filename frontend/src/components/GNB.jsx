import { NavLink, useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faMagnifyingGlass, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const NAV_LINKS = [
  { label: '홈', path: '/' },
  { label: '영화보다', path: '/movie' },
  { label: 'TV보다', path: '/tv' },
  { label: '사람을 보다', path: '/people' },
  { label: '물어보다', path: '/ask' },
]

const GNB = () => {
  const navigate = useNavigate()

  return (
    <header className='sticky top-0 z-50 w-full backdrop-blur-lg bg-neutral-950/40 border-t border-white/10 shadow-glow-purple py-6 px-12'>
      <div className='flex items-center justify-between w-full'>

        {/* 좌측: 로고 + 내비게이션 */}
        <div className='flex items-center gap-18'>
          <NavLink
            to='/'
            className='font-sans font-bold text-3xl text-neutral-50 tracking-[-1.8px] leading-12'
          >
            VODA
          </NavLink>

          <nav className='flex items-center gap-12'>
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `font-serif text-xl tracking-[-0.525px] pb-2.5 border-b-4 transition-colors ${
                    isActive
                      ? 'text-primary-400 border-primary-400 font-extrabold'
                      : 'text-neutral-400 border-transparent font-semibold'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* 우측: 검색창 + 알림 + 아바타 */}
        <div className='flex items-center gap-7.5'>

          {/* 검색창 — 클릭 시 /search 이동 */}
          <button
            onClick={() => navigate('/search')}
            className='flex items-center gap-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-2 cursor-pointer'
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-neutral-400 text-xl' />
            <span className='font-serif text-neutral-400 text-xl w-72 text-left'>찾아보다</span>
          </button>

          {/* 알림 아이콘 */}
          <button className='text-neutral-400 hover:text-neutral-50 transition-colors text-2xl'>
            <FontAwesomeIcon icon={faBell} />
          </button>

          {/* 유저 아바타 — 클릭 시 /profile 이동 */}
          <button
            onClick={() => navigate('/profile')}
            className='size-14 rounded-full ring-2 ring-primary-400 overflow-hidden bg-neutral-700 flex items-center justify-center hover:ring-primary-300 transition-all'
          >
            <FontAwesomeIcon icon={faCircleUser} className='text-neutral-400 text-4xl' />
          </button>
        </div>
      </div>
    </header>
  )
}

export default GNB
