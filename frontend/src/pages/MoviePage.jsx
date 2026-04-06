import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import GenreTab from '../components/GenreTab'
import Feed from '../components/Feed'
import { EP } from '../api/tmdb'
import ChatBtn from '../components/ChatBtn'
import useUI from '../hooks/useUI'

const MoviePage = () => {
  const ui = useUI()
  const [heroMovie, setHeroMovie] = useState(null)
  const [genres, setGenres] = useState([{ id: 0, name: ui.viewAll }])
  const [activeTab, setActiveTab] = useState(0)
  
  const [rankMovies, setRankMovies] = useState([])
  const [newMovies, setNewMovies] = useState([])
  const [genreMovies, setGenreMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    EP.genres('movie').then((res) => {
      setGenres([{ id: 0, name: ui.viewAll }, ...res.data.genres])
    })

    EP.popular('movie').then((res) => {
      const results = res.data.results
      setHeroMovie(results[Math.floor(Math.random() * results.length)])
      setRankMovies(results.slice(0, 10))
      setLoading(false)
    })

    EP.nowPlaying('movie').then((res) => {
      setNewMovies(res.data.results)
    })
  }, [ui.viewAll])

  useEffect(() => {
    const params = activeTab !== 0 ? { with_genres: activeTab } : {}
    EP.discover('movie', params).then((res) => {
      setGenreMovies(res.data.results)
    })
  }, [activeTab])

  if (loading) return <div className='p-20 text-center text-zinc-500'>{ui.loading}</div>

  return (
    <div className='bg-neutral-950 min-h-screen pb-32'>
      {heroMovie && (
        <Hero
          type='movie'
          id={heroMovie.id}
          title={heroMovie.title}
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
            mediaType='movie'
            link={`/browse/movie/popular?title=${encodeURIComponent(ui.trending)}`}
          />
        )}

        <Feed
          key={activeTab}
          type='normal'
          title={activeTab === 0 ? ui.todayRecommend : `${genres.find(g => g.id === activeTab)?.name} ${ui.movie}`}
          subtitle={ui.todayRecommend}
          items={genreMovies}
          mediaType='movie'
          link={
            activeTab === 0
              ? `/browse/movie/discover?title=${encodeURIComponent(ui.todayRecommend)}`
              : `/browse/movie/discover?title=${encodeURIComponent(genres.find(g => g.id === activeTab)?.name + ' ' + ui.movie)}&genre=${activeTab}`
          }
        />

        <Feed
          type='normal'
          title={ui.nowPlaying}
          subtitle={ui.trending}
          items={newMovies}
          mediaType='movie'
          link={`/browse/movie/now_playing?title=${encodeURIComponent(ui.nowPlaying)}`}
        />
      </div>

      <ChatBtn />
    </div>
  )
}

export default MoviePage
