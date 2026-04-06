import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import SearchBar from '../components/SearchBar'
import MoodGrid from '../components/MoodGrid'
import SectionTitle from '../components/SectionTitle'
import MovieCard from '../components/MovieCard'
import { EP } from '../api/tmdb'
import useUI from '../hooks/useUI'

const SearchPage = () => {
  const ui = useUI()
  const [searchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [prevKeyword, setPrevKeyword] = useState('')

  // 추천 무드 데이터 (제목만 번역 연동)
  const mockMoods = [
    { title: ui.movie, desc: 'Action & Adventure', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop' },
    { title: 'Romance', desc: 'Heart fluttering first love', img: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=600&auto=format&fit=crop' },
    { title: 'Horror', desc: 'Sleepless nights, extreme fear', img: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop' },
    { title: 'Animation', desc: 'Warm world to soothe your daily life', img: 'https://images.unsplash.com/photo-1578632738908-4521c626df48?q=80&w=600&auto=format&fit=crop' }
  ]

  if (keyword !== prevKeyword) {
    setPrevKeyword(keyword)
    if (!keyword.trim()) {
      setResults([])
      setLoading(false)
    } else {
      setLoading(true)
    }
  }

  useEffect(() => {
    if (!keyword.trim()) return
    const timer = setTimeout(() => {
      EP.search(keyword)
        .then((res) => {
          setResults(res.data.results.filter(item => item.poster_path))
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }, 500)
    return () => clearTimeout(timer)
  }, [keyword])

  const handleMoodClick = (mood) => {
    setKeyword(mood.title)
  }

  return (
    <div className='bg-neutral-950 min-h-screen text-white px-12 py-16'>
      <div className='max-w-2xl mx-auto mb-20'>
        <h1 className='text-4xl font-bold text-center mb-8 bg-linear-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent'>
          {ui.search}
        </h1>
        <SearchBar 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={ui.personSearch}
        />
      </div>

      {!keyword && (
        <div className='animate-in fade-in slide-in-from-bottom-4 duration-700'>
          <MoodGrid moods={mockMoods} onItemClick={handleMoodClick} />
        </div>
      )}

      {keyword && (
        <div className='animate-in fade-in duration-500'>
          <div className='flex justify-between items-end mb-10'>
            <div>
              <h2 className='text-2xl font-bold text-zinc-50'>
                '<span className='text-primary-400'>{keyword}</span>' {ui.searchResult?.replace('{q}', '')}
              </h2>
              <p className='text-zinc-500 mt-1'>Total {results.length} found.</p>
            </div>
            <button 
              onClick={() => setKeyword('')}
              className='text-sm text-zinc-500 hover:text-zinc-300 underline underline-offset-4'
            >
              {ui.clearSearch}
            </button>
          </div>

          {loading ? (
            <div className='flex justify-center py-20'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500'></div>
            </div>
          ) : results.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10'>
              {results.map((item) => (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  type={item.media_type || 'movie'}
                  title={item.title || item.name}
                  posterUrl={EP.img(item.poster_path)}
                  year={(item.release_date || item.first_air_date || '').split('-')[0]}
                  genre={item.media_type === 'tv' ? 'TV' : ui.movie}
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800'>
              <p className='text-zinc-500 text-lg'>{ui.noResult?.replace('{q}', keyword)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchPage
