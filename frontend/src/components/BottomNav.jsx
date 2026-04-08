import { NavLink } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome, 
  faFilm, 
  faTv, 
  faUserGroup, 
  faUserCircle 
} from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge'
import useUI from '../hooks/useUI'

const BottomNav = () => {
  const ui = useUI()

  const tabs = [
    { name: ui.home,   path: '/',       icon: faHome },
    { name: ui.movie,  path: '/movie',  icon: faFilm },
    { name: ui.tv,     path: '/tv',     icon: faTv },
    { name: ui.person, path: '/person', icon: faUserGroup },
    { name: ui.profile, path: '/profile', icon: faUserCircle },
  ]

  const navLinkStyle = ({ isActive }) => 
    twMerge(
      'flex flex-col items-center justify-center gap-1 w-full h-full transition-colors',
      isActive ? 'text-primary-400' : 'text-neutral-500 hover:text-neutral-300'
    )

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-neutral-900/80 backdrop-blur-xl border-t border-white/10 h-16 safe-area-bottom'>
      <div className='flex items-center justify-around h-full'>
        {tabs.map((tab) => (
          <NavLink 
            key={tab.path} 
            to={tab.path} 
            end={tab.path === '/'} 
            className={navLinkStyle}
          >
            <FontAwesomeIcon icon={tab.icon} className='text-lg' />
            <span className='text-[10px] font-medium font-serif'>{tab.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
