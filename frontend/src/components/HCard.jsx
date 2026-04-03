import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { EP } from '../api/tmdb'
<<<<<<< HEAD
import useFetch from '../hooks/useFetch'
=======
import { getVq } from '../utils/settings'
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)

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
<<<<<<< HEAD
=======
  const [overview, setOverview] = useState('')
  const [muted, setMuted] = useState(true)
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)
  const timerRef = useRef(null)
  const fetched = useRef(false)
  const iframeRef = useRef(null)

  // 마운트 시 detail 미리 로드 — 장르·상영시간·개요 즉시 표시
  const { data: detail } = useFetch(() => EP.detail(type, id), [id])

  const genreText   = detail?.genres?.map(g => g.name).join(' · ') || ''
  const runtimeText = detail?.runtime
    ? `${detail.runtime}분`
    : detail?.episode_run_time?.[0] ? `${detail.episode_run_time[0]}분` : ''
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
      if (!fetched.current) {
        fetched.current = true
        // detail은 이미 로드됨 — 예고편 key만 세팅
        const allVids = detail?.videos?.results || []
        const koVids  = allVids.filter(v => v.iso_639_1 === 'ko')
        const key = findTrailer(koVids)?.key || findTrailer(allVids)?.key || null
        if (key) setTrailerKey(key)
      }
    }, 600)
  }

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current)
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'mute', args: [] }),
        '*'
      )
    }
    setHovered(false)
    setMuted(true)
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    if (!iframeRef.current) return
    const next = !muted
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: next ? 'mute' : 'unMute', args: [] }),
      '*'
    )
    setMuted(next)
  }

  return (
    <div
      onClick={() => navigate(`/${type}/${id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='w-110 shrink-0 cursor-pointer'
    >
      <div className='relative rounded-2xl overflow-hidden border-2 border-neutral-800 bg-neutral-900/40 backdrop-blur-md flex flex-col'>
        {/* 썸네일 */}
        <div className='aspect-video overflow-hidden'>
          <img
            src={poster}
            alt={title}
            className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>

        {/* 카드 하단 정보 */}
        <div className='p-5 flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            {showCurator ? (
              <span className='text-sm font-bold text-secondary-500'>CURATOR'S CHOICE</span>
            ) : (
              <span />
            )}
            <div className='flex items-center gap-1'>
              <i className='fa-solid fa-star text-primary-400 text-sm' />
              <span className='text-sm font-bold text-primary-400'>
                {vote_average?.toFixed(1)}
              </span>
            </div>
          </div>
          <h3 className='text-2xl font-regular text-neutral-50 truncate'>{title}</h3>
          <p className='text-sm text-neutral-400'>
            {[genre || genreText, runtime ? `${runtime}분` : runtimeText].filter(Boolean).join(' • ')}
          </p>
        </div>

        {/* 호버 오버레이 — 카드 전체 덮기 */}
        <div
          className={`absolute inset-0 flex flex-col bg-neutral-950 transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* 예고편 (16:9) */}
          <div className='relative w-full aspect-video shrink-0 bg-neutral-900'>
            {hovered && trailerKey ? (
              <>
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&enablejsapi=1${getVq() ? `&vq=${getVq()}` : ''}`}
                  className='w-full h-full'
                  allow='autoplay'
                  title={title}
                />
                {/* 음소거 토글 버튼 */}
                <button
                  onClick={toggleMute}
                  className='absolute bottom-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white text-xs hover:bg-black/80 transition-colors'
                  aria-label={muted ? '소리 켜기' : '소리 끄기'}
                >
                  <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
                </button>
              </>
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <i className='fa-solid fa-film text-neutral-700 text-3xl' />
              </div>
            )}
          </div>

          {/* 개요 */}
          <div className='flex flex-col gap-2 p-4 flex-1 overflow-hidden'>
            <h3 className='text-white font-bold leading-tight truncate'>{title}</h3>
            {overview ? (
              <p className='text-neutral-400 text-xs leading-relaxed line-clamp-3'>
                {overview}
              </p>
            ) : (
              <div className='flex flex-col gap-1.5 mt-1'>
                <div className='h-2.5 bg-neutral-800 rounded animate-pulse w-full' />
                <div className='h-2.5 bg-neutral-800 rounded animate-pulse w-4/5' />
                <div className='h-2.5 bg-neutral-800 rounded animate-pulse w-3/5' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HCard