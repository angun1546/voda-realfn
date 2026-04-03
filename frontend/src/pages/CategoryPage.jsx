import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import MovieCard from '../components/MovieCard'
import ChatBtn from '../components/ChatBtn'
import { EP } from '../api/tmdb'

const MovieCategoryPage = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    EP.nowPlaying('movie')
      .then((res) => {
        setMovies(res.data.results)
        setLoading(false)
      })
      .catch((err) => {
        console.error('영화 데이터 로딩 오류:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className='pt-20 text-center text-neutral-500'>로딩 중...</div>

  return (
    <main className='min-h-screen bg-neutral-950 pb-20'>
      {/* 헤더 섹션: 뒤로가기 + 타이틀 */}
      <div className='flex items-center gap-6 px-20 py-4'>
        <button
          onClick={() => navigate(-1)}
          className='text-2xl text-neutral-50 hover:text-primary-400 transition-colors bg-transparent border-none cursor-pointer'
          aria-label='뒤로 가기'
        >
          <i className='fa-solid fa-chevron-left' />
        </button>
        <h1 className='font-serif font-bold text-4xl text-neutral-50'>
          현재 상영작
        </h1>
      </div>

      {/* 4열 영화 카드 그리드 */}
      <div className='grid grid-cols-4 gap-6 px-20 pt-6'>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            type='movie'
            title={movie.title}
            genre='영화'
            year={movie.release_date?.slice(0, 4)}
            posterUrl={EP.img(movie.poster_path)}
          />
        ))}
      </div>

      {movies.length === 0 && (
        <div className='text-center py-20 text-neutral-500'>표시할 영화가 없습니다.</div>
      )}

      <ChatBtn />
    </main>
  )
}

export default MovieCategoryPage
