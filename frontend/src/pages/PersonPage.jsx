import { useState, useEffect } from 'react'
import { EP } from '../api/tmdb'
import GenreTab from '../components/GenreTab'
import PersonCard from '../components/PersonCard'
import SearchBar from '../components/SearchBar'
import SectionTitle from '../components/SectionTitle'
import DirectorCard from '../components/DirectorCard'
import FocusCard from '../components/FocusCard'
import ChatBtn from '../components/ChatBtn'
import Feed from '../components/Feed'
import useUI from '../hooks/useUI'

const PersonPage = () => {
  const ui = useUI()

  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [activeTab, setActiveTab] = useState('trending')
  const [loading, setLoading] = useState(true)
  const [actors, setActors] = useState([])
  const [directors, setDirectors] = useState([])
  const [weekTrending, setWeekTrending] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    Promise.all([
      EP.personTrending('day'),
      EP.personPopular(),
      EP.personTrending('week'),
      EP.browsePerson('popular', 2),
    ])
      .then(([trendRes, popRes, weekRes, pop2Res]) => {
        const pop = popRes.data.results
        const popAll = [...pop, ...(pop2Res.data.results || [])]
        setTrending(trendRes.data.results)
        setPopular(pop)
        setActors(popAll.filter((p) => p.known_for_department === 'Acting'))
        setDirectors(popAll.filter((p) => p.known_for_department === 'Directing'))
        setWeekTrending(weekRes.data.results)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  const handleSearch = (q) => {
    const query = q?.trim() || ''
    setSearchQuery(query)
    if (!query) clearSearch()
  }

  useEffect(() => {
    const query = searchQuery?.trim()
    if (!query) {
      setSearchResults([])
      setSearchLoading(false)
      return
    }
    const timer = setTimeout(() => {
      setSearchLoading(true)
      EP.searchPerson(query)
        .then((res) => { 
          setSearchResults(res.data.results || [])
          setSearchLoading(false) 
        })
        .catch((err) => { 
          console.error('Search Error:', err)
          setSearchLoading(false) 
        })
    }, 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const clearSearch = () => { 
    setSearchQuery('')
    setSearchResults([])
    setSearchLoading(false) 
  }

  const persons =
    activeTab === 'trending' ? trending :
    activeTab === 'popular'  ? popular  :
    activeTab === 'actor'    ? actors   : directors

  if (loading) return <div className='p-20 text-center text-zinc-500'>{ui.loading}</div>

  const avatars = trending.slice(0, 3).map((p) => ({ id: p.id, photo: p.profile_path, name: p.name }))

  const TABS = [
    { id: 'trending', name: ui.tabTrending },
    { id: 'popular',  name: ui.tabPopular },
    { id: 'actor',    name: ui.tabActor },
    { id: 'director', name: ui.tabDirector },
  ]

  return (
    <div className='bg-zinc-950 min-h-screen pb-32'>
      {/* Hero 섹션 */}
      <section className='relative min-h-[500px] pt-32 pb-16 overflow-hidden'>
        <div className='absolute top-0 right-0 w-2/5 h-full pointer-events-none'>
          <div className='absolute top-1/4 right-0 w-96 h-96 bg-primary-600 opacity-20 rounded-full blur-3xl' />
          <div className='absolute top-1/3 right-24 w-64 h-64 bg-blue-600 opacity-15 rounded-full blur-3xl' />
        </div>

        <div className='relative z-10 max-w-screen-2xl mx-auto px-20 flex flex-col items-center text-center'>
          <p className='text-xs font-semibold tracking-widest text-primary-400 uppercase mb-4'>
            ETHEREAL PROFILES
          </p>
          <h1 className='text-8xl font-bold text-zinc-50 font-serif leading-tight mb-6'>
            {ui.personTitle}
          </h1>
          <p className='text-base text-zinc-400 leading-relaxed mb-10 max-w-4xl mx-auto w-full'>
            {ui.personDesc}
          </p>

          <div className='w-full max-w-4xl'>
            <SearchBar
              variant='normal'
              placeholder={ui.personSearch}
              value={searchQuery}
              onChange={(e) => { 
                setSearchQuery(e.target.value)
                if (!e.target.value) setSearchResults([]) 
              }}
              onSubmit={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* 검색 결과 */}
      {searchQuery && (
        <div className='px-12 mt-8'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-2.5'>
              <div className='w-3 h-12 bg-primary-400 rounded-full shrink-0' />
              <h2 className='font-serif font-bold text-3xl text-neutral-50'>
                {ui.searchResult.replace('{q}', searchQuery)}
              </h2>
            </div>
            <button
              onClick={clearSearch}
              className='flex items-center gap-2 text-neutral-400 hover:text-primary-400 transition-colors font-serif text-base'
            >
              <i className='fa-solid fa-xmark' />
              {ui.clearSearch}
            </button>
          </div>

          {searchLoading ? (
            <div className='text-center text-neutral-500 py-20'>{ui.searching}</div>
          ) : searchResults.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
              {searchResults.map((person) => (
                <PersonCard key={person.id} id={person.id} name={person.name} img={person.profile_path} role={person.known_for_department} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <i className='fa-solid fa-user-slash text-neutral-700 text-5xl mb-4 block' />
              <p className='text-neutral-500 font-serif text-lg'>{ui.noResult.replace('{q}', searchQuery)}</p>
            </div>
          )}
        </div>
      )}

      {!searchQuery && (
        <div className='mt-8'>
          <GenreTab tabs={TABS} active={activeTab} onChange={setActiveTab} />
        </div>
      )}

      {!searchQuery && (
        <div className='px-12'>
          <Feed 
            type='person' 
            title={ui.feedTrendingDay} 
            items={persons} 
            mediaType='person' 
            link='/person/category?title=오늘의+트렌딩+인물&category=trending_day' 
          />
          <Feed 
            type='person' 
            title={ui.feedTrendingWeek} 
            items={weekTrending} 
            mediaType='person' 
            link='/person/category?title=이번+주+트렌딩+인물&category=trending_week' 
          />
        </div>
      )}

      {!searchQuery && (
        <div className='px-12 mt-20'>
          <SectionTitle 
            title={ui.focusTitle} 
            subtitle={ui.focusSub} 
            link='/person/category?title=포커스+인물&category=popular' 
          />
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2'>
              <DirectorCard 
                label='Director Insight' 
                title='박찬욱의 미장센' 
                desc={'대칭의 미학, 폭력의 시적 표현.\n한국 영화를 세계로 알린 거장의 발자취를 따라가 봅니다.'} 
                btnText={ui.viewAll} 
                to='/find?curator=parkwook' 
              />
            </div>
            <div className='lg:col-span-1'>
              <FocusCard 
                title={ui.focusTitle} 
                desc='VODA가 예측하는 2026년 최고의 루키들을 소개합니다.' 
                avatars={avatars} 
                totalCount={24} 
                to='/person/category' 
              />
            </div>
          </div>
        </div>
      )}

      <ChatBtn />
    </div>
  )
}

export default PersonPage
