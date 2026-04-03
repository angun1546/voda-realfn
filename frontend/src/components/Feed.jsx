import { twMerge } from 'tailwind-merge'
import SectionTitle from './SectionTitle'
import MovieCard from './MovieCard'
import RankCard from './RankCard'
import HCard from './HCard'
import PersonCard from './PersonCard'
import { EP } from '../api/tmdb'
import useWheelScroll from '../hooks/useWheelScroll'
import useScrollAnim from '../hooks/useScrollAnim'

const Feed = ({
  type = 'normal',
  title,
  subtitle,
  items = [],
  mediaType = 'movie',
  link = '#',
}) => {
  const { ref } = useWheelScroll()
  const [sectionRef, visible] = useScrollAnim(0.08)

  if (!items || items.length === 0) return null

  // 카드별 stagger 딜레이 (80ms 간격, 최대 400ms)
  const staggerDelay = (idx) => Math.min(idx * 80, 400)

  return (
    <section ref={sectionRef} className='w-full'>
      <SectionTitle title={title} subtitle={subtitle} link={link} />

      {/* 카드 리스트 (마우스 휠 가로 스크롤) */}
      <div
        ref={ref}
        className={twMerge(
<<<<<<< HEAD
          'flex gap-6 overflow-x-auto pb-8 no-scrollbar pt-4 cursor-grab active:cursor-grabbing select-none',
          type === 'rank' && 'gap-10 pl-10', 
          type === 'person' && 'gap-8 px-2', 
=======
          'flex gap-6 overflow-x-auto pb-8 no-scrollbar pt-4 select-none',
          type === 'rank' && 'gap-10',
          type === 'person' && 'gap-8 px-2',
>>>>>>> e1d6e8f (feat: 30개 국어 다국어화 전수 적용 및 비디오 트레일러 이탈 시 사운드 정지 로직 수정)
        )}
      >
        {items.map((item, idx) => {
          const commonProps = { id: item.id, type: mediaType, title: item.title || item.name }
          const cardClass = `card-enter shrink-0${visible ? ' is-visible' : ''}`
          const cardStyle = { transitionDelay: visible ? `${staggerDelay(idx)}ms` : '0ms' }

          if (type === 'person') {
            return (
              <div key={`person-${item.id}`} className={`w-80 ${cardClass}`} style={cardStyle}>
                <PersonCard
                  id={item.id}
                  name={item.name}
                  img={item.profile_path}
                  role={item.known_for_department}
                />
              </div>
            )
          }

          if (type === 'rank') {
            return (
              <div key={`rank-${item.id}`} className={cardClass} style={cardStyle}>
                <RankCard
                  {...commonProps}
                  rank={idx + 1}
                  poster={EP.img(item.poster_path)}
                  genre={item.genre_ids?.[0] ? (mediaType === 'tv' ? 'TV 시리즈' : '영화') : ''}
                />
              </div>
            )
          }

          if (type === 'play') {
            return (
              <div key={`h-${item.id}`} className={cardClass} style={cardStyle}>
                <HCard
                  {...commonProps}
                  poster={EP.img(item.backdrop_path || item.poster_path, 'w500')}
                  progress={item.progress || 30}
                  vote_average={item.vote_average}
                />
              </div>
            )
          }

          return (
            <div key={`card-${item.id}`} className={`min-w-80 w-80 ${cardClass}`} style={cardStyle}>
              <MovieCard
                {...commonProps}
                genre={item.genre_ids?.[0]}
                year={(item.release_date || item.first_air_date)?.slice(0, 4)}
                posterUrl={EP.img(item.poster_path)}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Feed
