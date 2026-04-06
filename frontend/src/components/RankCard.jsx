import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeXmark, faVolumeHigh, faFilm } from '@fortawesome/free-solid-svg-icons'
import { EP } from '../api/tmdb'
import useFetch from '../hooks/useFetch'
import { getVq } from '../utils/settings'

const RankCard = ({ rank, id, type = 'movie', title, poster, genre, onClick }) => {
  const [hovered, setHovered] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)
  const [muted, setMuted] = useState(true)
  const timerRef = useRef(null)
  const fetched = useRef(false)
  const iframeRef = useRef(null)

  // 상세 데이터 로드
  const { data: detail } = useFetch(() => EP.detail(type, id), [id])
  const overview = detail?.overview || ''

  const findTrailer = (vids) => {
    if (!vids || vids.length === 0) return null
    return (
      vids.find(v => v.type === 'Trailer' && v.site === 'YouTube' && v.official) ||
      vids.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
      vids.find(v => v.type === 'Teaser' && v.site === 'YouTube') ||
      vids.find(v => v.site === 'YouTube') ||
      null
    )
  }

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setHovered(true)
      if (!fetched.current && detail) {
        fetched.current = true
        const allVids = detail?.videos?.results || []
        const koVids  = allVids.filter(v => v.iso_639_1 === 'ko')
        const key = findTrailer(koVids)?.key || findTrailer(allVids)?.key || null
        if (key) setTrailerKey(key)
      }
    }, 600)
  }

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current)
    setHovered(false)
    setMuted(true)
  }

  const toggleMute = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!iframeRef.current) return
    
    const nextMuted = !muted
    const command = nextMuted ? 'mute' : 'unMute'
    
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    )
    setMuted(nextMuted)
  }

  const handleClick = onClick ? (e) => { e.preventDefault(); onClick() } : undefined

  return (
    <Link
      to={`/${type}/${id}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='w-58 flex-shrink-0 relative block'
    >
      {/* 순위 숫자 — 오버레이 시 숨김 */}
      {!hovered && (
        <span className='absolute -left-8 bottom-12 text-9xl font-black text-white/90 font-sans drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] z-10 select-none italic'>
          {rank}
        </span>
      )}

      <div className={twMerge(
        'relative aspect-[2/3] rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl border border-white/5',
        hovered && 'ring-2 ring-primary-500 shadow-primary-500/20',
      )}>
        <img
          src={poster}
          alt={title}
          className='size-full object-cover transition-transform duration-700'
          style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        <div className='absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent' />

        {/* 호버 오버레이 (예고편 + 개요) */}
        <div
          className={twMerge(
            'absolute inset-0 flex flex-col bg-neutral-950 transition-opacity duration-300 z-20',
            hovered ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        >
          {/* 예고편 영역 */}
          <div className='relative w-full aspect-video shrink-0 bg-neutral-900 overflow-hidden'>
            {hovered && trailerKey ? (
              <>
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&enablejsapi=1&origin=${window.location.origin}${getVq() ? `&vq=${getVq()}` : ''}`}
                  className='w-full h-full scale-110'
                  allow='autoplay'
                  title={title}
                />
                <button
                  onClick={toggleMute}
                  className='absolute bottom-2 right-2 z-30 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/10'
                >
                  <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} size="xs" />
                </button>
              </>
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <FontAwesomeIcon icon={faFilm} className='text-neutral-700 text-3xl' />
              </div>
            )}
          </div>

          {/* 정보 영역 */}
          <div className='flex flex-col gap-2 p-4 flex-1 overflow-hidden bg-neutral-950'>
            <div className='flex items-center gap-2'>
              <span className='text-primary-400 font-black text-3xl italic font-sans'>{rank}</span>
              <h3 className='text-white font-bold text-sm leading-tight line-clamp-2'>{title}</h3>
            </div>
            <div className='mt-2 border-t border-white/5 pt-2'>
              <p className='text-neutral-400 text-[11px] leading-relaxed line-clamp-5'>
                {overview || '상세 정보를 불러오는 중입니다...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-3 px-1'>
        <h3 className='text-xl font-bold truncate text-neutral-100 group-hover:text-primary-400 transition-colors'>{title}</h3>
        <p className='text-xs text-neutral-500 mt-1 font-medium'>{genre}</p>
      </div>
    </Link>
  )
}

export default RankCard
