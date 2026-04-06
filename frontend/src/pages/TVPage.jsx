import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import GenreTab from '../components/GenreTab'
import Feed from '../components/Feed'
import { EP } from '../api/tmdb'
import ChatBtn from '../components/ChatBtn'
import useUI from '../hooks/useUI'

const TVPage = () => {
  const ui = useUI()
  const [heroMovie, setHeroMovie] = useState(null)
  const [genres, setGenres] = useState([{ id: 0, name: ui.viewAll }])
  const [activeTab, setActiveTab] = useState(0)
  
  const [rankMovies, setRankMovies] = useState([])
  const [newMovies, setNewMovies] = useState([])
  const [genreMovies, setGenreMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    EP.genres('tv').then((res) => {
      setGenres([{ id: 0, name: ui.viewAll }, ...res.data.genres])
    })

    EP.popular('tv').then((res) => {
      const results = res.data.results
      setHeroMovie(results[Math.floor(Math.random() * results.length)])
      setRankMovies(results.slice(0, 10))
      setLoading(false)
    })

    EP.nowPlaying('tv').then((res) => {
      setNewMovies(res.data.results)
    })
  }, [ui.viewAll])

  useEffect(() => {
    const params = activeTab !== 0 ? { with_genres: activeTab } : {}
    EP.discover('tv', params).then((res) => {
      setGenreMovies(res.data.results)
    })
  }, [activeTab])

  if (loading) return <div className='p-20 text-center text-zinc-500'>{ui.loading}</div>

  return (
    <div className='bg-neutral-950 min-h-screen pb-32'>
      {heroMovie && (
        <Hero
          type='tv'
          id={heroMovie.id}
          title={heroMovie.name}
          backdrop={heroMovie.backdrop_path}
          poster={heroMovie.poster_path}
          overview={heroMovie.overview}
          rating={heroMovie.vote_average}
        />
      )}

      <GenreTab tabs={genres} active={activeTab} onChange={setActiveTab} />

      <div className='px-12 mt-12 flex flex-col gap-10'>
        {activeTab === 0 && (
          <Feed
            type='rank'
            title={ui.trending}
            subtitle={ui.popularMovies}
            items={rankMovies}
            mediaType='tv'
            link={`/browse/tv/popular?title=${encodeURIComponent(ui.trending)}`}
          />
        )}

        <Feed
          key={activeTab}
          type='normal'
          title={activeTab === 0 ? ui.todayRecommend : `${genres.find(g => g.id === activeTab)?.name} TV`}
          subtitle={ui.todayRecommend}
          items={genreMovies}
          mediaType='tv'
          link={
            activeTab === 0
              ? `/browse/tv/discover?title=${encodeURIComponent(ui.todayRecommend)}`
              : `/browse/tv/discover?title=${encodeURIComponent(genres.find(g => g.id === activeTab)?.name + ' TV')}&genre=${activeTab}`
          }
        />

        <Feed
          type='normal'
          title={ui.nowPlaying}
          subtitle={ui.trending}
          items={newMovies}
          mediaType='tv'
          link={`/browse/tv/on_the_air?title=${encodeURIComponent(ui.nowPlaying)}`}
        />
      </div>

      <ChatBtn />
    </div>
  )
}

export default TVPage
