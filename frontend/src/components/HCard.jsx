import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeXmark, faVolumeHigh, faFilm, faStar } from '@fortawesome/free-solid-svg-icons'
import { EP } from '../api/tmdb'
import useFetch from '../hooks/useFetch'
import { getVq } from '../utils/settings'

const HCard = ({
  id,
  type,
  title,
  poster,
  genre,
  runtime,
  vote_average,
  showCurator = false,
}) => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)
  const [muted, setMuted] = useState(true)
  const timerRef = useRef(null)
  const fetched = useRef(false)
  const iframeRef = useRef(null)

  // 상세 데이터 로드
  const { data: detail } = useFetch(() => EP.detail(type, id), [id])

  const genreText   = detail?.genres?.map(g => g.name).join(' · ') || genre || ''
  const runtimeText = runtime || detail?.runtime || detail?.episode_run_time?.[0] || ''
  const overview    = detail?.overview || ''

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

  return (
    <div
      onClick={() => navigate(`/${type}/${id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='w-110 shrink-0 cursor-pointer group'
    >
      <div className='relative rounded-2xl overflow-hidden border border-white/5 bg-neutral-900/40 backdrop-blur-md flex flex-col transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary-500/10 group-hover:border-white/10'>
        {/* 썸네일 영역 */}
        <div className='aspect-video overflow-hidden relative'>
          <img
            src={poster}
            alt={title}
            className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent opacity-60' />
        </div>

        {/* 카드 하단 정보 */}
        <div className='p-5 flex flex-col gap-1.5'>
          <div className='flex items-center justify-between'>
            {showCurator ? (
              <span className='text-[10px] font-black text-secondary-500 tracking-tighter uppercase'>CURATOR'S CHOICE</span>
            ) : (
              <span />
            )}
            <div className='flex items-center gap-1.5 bg-neutral-800/50 px-2 py-0.5 rounded-full'>
              <FontAwesomeIcon icon={faStar} className='text-primary-400 text-[10px]' />
              <span className='text-xs font-bold text-neutral-200'>
                {vote_average?.toFixed(1)}
              </span>
            </div>
          </div>
          <h3 className='text-2xl font-bold text-neutral-50 truncate group-hover:text-primary-400 transition-colors'>{title}</h3>
          <p className='text-xs text-neutral-400 font-medium'>
            {[genreText.split(' · ')[0], runtimeText ? `${runtimeText}분` : ''].filter(Boolean).join(' • ')}
          </p>
        </div>

        {/* 호버 오버레이 (예고편 + 개요) */}
        <div
          className={twMerge(
            'absolute inset-0 flex flex-col bg-neutral-950 transition-opacity duration-300 z-20',
            hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          {/* 예고편 영역 (16:9) */}
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
                  className='absolute bottom-3 right-3 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/10'
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

          {/* 개요 영역 */}
          <div className='flex flex-col gap-2 p-5 flex-1 overflow-hidden bg-neutral-950'>
            <h3 className='text-white font-bold text-lg leading-tight truncate'>{title}</h3>
            <div className='mt-2 border-t border-white/5 pt-3'>
              <p className='text-neutral-400 text-xs leading-relaxed line-clamp-3'>
                {overview || '상세 정보를 불러오는 중입니다...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HCard
