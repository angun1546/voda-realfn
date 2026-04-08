import { useState, useEffect } from 'react'
import HeroSwiper from '../components/HeroSwiper'
import Feed from '../components/Feed'
import { EP } from '../api/tmdb'
import ChatBtn from '../components/ChatBtn'
import useUI from '../hooks/useUI'

const HomePage = () => {
  const ui = useUI()
  const [heroItems, setHeroItems] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [newMovies, setNewMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      EP.popular('movie'),
      EP.nowPlaying('movie'),
      EP.topRated('movie')
    ]).then(([pop, now, top]) => {
      const popResults = pop.data.results
      // 상위 5개를 히어로 스와이퍼 아이템으로 설정
      setHeroItems(popResults.slice(0, 5))
      setPopularMovies(popResults)
      setNewMovies(now.data.results)
      setTopRatedMovies(top.data.results)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className='p-20 text-center text-zinc-500'>{ui.loading}</div>

  return (
    <div className='bg-neutral-950 min-h-screen pb-20 md:pb-32'>
      {/* 히어로 슬라이더 섹션 (자동 재생 및 영상 배경 지원) */}
      <HeroSwiper items={heroItems} type='movie' />

      <div className='px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 mt-4 md:mt-8 flex flex-col gap-10 md:gap-20 lg:gap-24'>
        
        {/* 1. 이어보기 섹션 */}
        <Feed
          type='play'
          title={ui.profileWatching}
          subtitle={ui.todayRecommend}
          items={popularMovies.slice(0, 5)}
          mediaType='movie'
          link={`/browse/movie/popular?title=${encodeURIComponent(ui.profileWatching)}`}
        />

        {/* 2. 인기 섹션 */}
        <Feed
          type='rank'
          title={ui.trending}
          sub={ui.popularMovies}
          items={popularMovies}
          mediaType='movie'
          link={`/browse/movie/popular?title=${encodeURIComponent(ui.trending)}`}
        />

        {/* 3. 신작 섹션 */}
        <Feed
          type='normal'
          title={ui.nowPlaying}
          subtitle={ui.trending}
          items={newMovies}
          mediaType='movie'
          link={`/browse/movie/now_playing?title=${encodeURIComponent(ui.nowPlaying)}`}
        />

        {/* 4. 평점 높은 섹션 */}
        <Feed
          type='normal'
          title={ui.topRated}
          sub={ui.weeklyTop}
          items={topRatedMovies}
          mediaType='movie'
          link={`/browse/movie/top_rated?title=${encodeURIComponent(ui.topRated)}`}
        />
      </div>

      <ChatBtn />
    </div>
  )
}

export default HomePage
