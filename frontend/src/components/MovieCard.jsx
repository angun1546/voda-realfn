import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeXmark, faVolumeHigh, faFilm } from '@fortawesome/free-solid-svg-icons'
import { EP } from '../api/tmdb'
import useFetch from '../hooks/useFetch'
import { getVq } from '../utils/settings'

const MovieCard = ({ id, type = 'movie', title, genre, year, badgeText, posterUrl }) => {
  const [hovered, setHovered] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)
  const [muted, setMuted] = useState(true)
  const timerRef = useRef(null)
  const fetched = useRef(false)
  const iframeRef = useRef(null)

  // 마운트 시 detail 미리 로드 — 장르·연도·개요 즉시 표시
  const { data: detail } = useFetch(() => EP.detail(type, id), [id])

  const genreText = detail?.genres?.map(g => g.name).join(' · ') || (typeof genre === 'string' ? genre : '') || ''
  const yearText  = year || detail?.release_date?.slice(0, 4) || detail?.first_air_date?.slice(0, 4) || ''
  const overview  = detail?.overview || ''

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
    setMuted(true) // 나갈 때 항상 음소거로 초기화
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
    <Link
      to={`/${type}/${id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={twMerge(
        'group flex flex-col gap-3 transition-transform duration-300 w-full',
        !hovered && 'hover:-translate-y-2',
      )}
    >
      {/* 포스터 + 오버레이 컨테이너 */}
      <div className='relative aspect-2/3 rounded-2xl overflow-hidden shadow-lg border border-white/5'>
        <img
          src={posterUrl}
          alt={title}
          className='size-full object-cover transition-transform duration-500 group-hover:scale-110'
        />

        {badgeText && (
          <span className='absolute top-4 left-4 bg-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10'>
            {badgeText}
          </span>
        )}

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
                {/* 음소거 토글 버튼 */}
                <button
                  onClick={toggleMute}
                  className='absolute bottom-3 right-3 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/10'
                  aria-label={muted ? '소리 켜기' : '소리 끄기'}
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
            <h3 className='text-white font-bold leading-tight line-clamp-1'>{title}</h3>
            <div className='flex items-center gap-1.5 text-[10px] text-neutral-500 uppercase tracking-wider font-semibold'>
              {yearText && <span>{yearText}</span>}
              {yearText && genreText && <span className='opacity-30'>|</span>}
              {genreText && <span className='truncate'>{genreText}</span>}
            </div>
            <div className='mt-2 border-t border-white/5 pt-2'>
              <p className='text-neutral-400 text-[11px] leading-relaxed line-clamp-5'>
                {overview || '상세 정보를 불러오는 중입니다...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 카드 하단 기본 텍스트 */}
      <div className='flex flex-col px-1 mt-1 md:mt-1'>
        <h3 className='text-sm md:text-lg font-bold text-neutral-100 truncate group-hover:text-primary-400 transition-colors'>
          {title}
        </h3>
        <div className='flex items-center gap-2 text-[10px] md:text-xs text-neutral-500 mt-0.5 md:mt-1 font-medium'>
          <span className='truncate'>{genreText.split(' · ')[0]}</span>
          <span className='text-[8px] md:text-[10px] opacity-30'>•</span>
          <span>{yearText}</span>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
