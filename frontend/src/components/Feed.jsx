import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import SectionTitle from './SectionTitle'
import MovieCard from './MovieCard'
import RankCard from './RankCard'
import HCard from './HCard'
import PersonCard from './PersonCard'
import { EP } from '../api/tmdb'
import useWheelScroll from '../hooks/useWheelScroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Feed = ({
  type = 'normal',
  title,
  subtitle,
  items = [],
  mediaType = 'movie',
  link = '#',
}) => {
  const { ref: wheelRef } = useWheelScroll()
  const sectionRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || items.length === 0) return

    // 섹션 내 카드들 선택
    const cards = listRef.current.querySelectorAll('.feed-card')
    
    // GSAP Stagger 애니메이션: 카드가 순차적으로 차르르 나타남
    gsap.fromTo(cards, 
      { opacity: 0, x: 40, scale: 0.98 },
      { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [items])

  if (!items || items.length === 0) return null

  return (
    <section ref={sectionRef} className='w-full'>
      <SectionTitle title={title} subtitle={subtitle} link={link} />

      {/* 카드 리스트 영역: useWheelScroll 적용 */}
      <div
        ref={(el) => {
          wheelRef(el)
          listRef.current = el
        }}
        className={twMerge(
          'flex gap-6 overflow-x-auto pb-8 no-scrollbar pt-4 select-none',
          type === 'rank' && 'gap-10 pl-4',
          type === 'person' && 'gap-8 px-2',
        )}
      >
        {items.map((item, idx) => {
          const commonProps = { id: item.id, type: mediaType, title: item.title || item.name }
          
          let cardContent;
          if (type === 'person') {
            cardContent = (
              <div className='w-40 md:w-80'>
                <PersonCard
                  id={item.id}
                  name={item.name}
                  img={item.profile_path}
                  role={item.known_for_department}
                />
              </div>
            )
          } else if (type === 'rank') {
            cardContent = (
              <RankCard
                {...commonProps}
                rank={idx + 1}
                poster={EP.img(item.poster_path)}
                genre={item.genre_ids?.[0] ? (mediaType === 'tv' ? 'TV 시리즈' : '영화') : ''}
              />
            )
          } else if (type === 'play') {
            cardContent = (
              <HCard
                {...commonProps}
                poster={EP.img(item.backdrop_path || item.poster_path, 'w500')}
                progress={item.progress || 30}
                vote_average={item.vote_average}
              />
            )
          } else {
            cardContent = (
              <div className='w-44 md:w-80'>
                <MovieCard
                  {...commonProps}
                  genre={item.genre_ids?.[0]}
                  year={(item.release_date || item.first_air_date)?.slice(0, 4)}
                  posterUrl={EP.img(item.poster_path)}
                />
              </div>
            )
          }

          return (
            <div key={`${type}-${item.id}-${idx}`} className='feed-card shrink-0 opacity-0'>
              {cardContent}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Feed
