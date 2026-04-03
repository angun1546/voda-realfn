import ax from './axios'
import { getTmdbLang } from '../utils/settings'

const IMG = 'https://image.tmdb.org/t/p'

// 현재 언어 파라미터 반환 (axios 기본값 ko-KR 을 덮어씀)
const lang = () => ({ language: getTmdbLang() })

export const EP = {
  // 이미지 URL 헬퍼 (슬래시 중첩 방지)
  img: (path, w = 'w500') => {
    if (!path) return null
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${IMG}/${w}/${cleanPath}`
  },
  bg: (path) => {
    if (!path) return null
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${IMG}/original/${cleanPath}`
  },

  // 인기/트렌딩
  popular:    (type)              => ax.get(`/${type}/popular`,           { params: lang() }),
  nowPlaying: (type)              => ax.get(`/${type}/now_playing`,       { params: lang() }),
  trending:   (type, win = 'week')=> ax.get(`/trending/${type}/${win}`,   { params: lang() }),
  topRated:   (type)              => ax.get(`/${type}/top_rated`,         { params: lang() }),

  // 상세
  detail: (type, id) => ax.get(`/${type}/${id}`, {
    params: { ...lang(), append_to_response: 'credits,reviews,videos,similar' }
  }),
  reviews: (type, id, l = 'en-US') => ax.get(`/${type}/${id}/reviews`, { params: { language: l } }),

  // 검색/필터
  search:       (q)            => ax.get('/search/multi',     { params: { ...lang(), query: q } }),
  searchPerson: (q)            => ax.get('/search/person',    { params: { ...lang(), query: q } }),
  discover:     (type, params) => ax.get(`/discover/${type}`, { params: { ...lang(), ...params } }),
  genres:       (type)         => ax.get(`/genre/${type}/list`, { params: lang() }),

  // 비디오 (언어별 탐색용 — 호출 측에서 lang 직접 지정)
  videos: (type, id, l) => ax.get(`/${type}/${id}/videos`, { params: { language: l } }),

  // 인물
  person: (id) => ax.get(`/person/${id}`, {
    params: { ...lang(), append_to_response: 'combined_credits' }
  }),
  personPopular:  ()              => ax.get('/person/popular',           { params: lang() }),
  personTrending: (win = 'day')   => ax.get(`/trending/person/${win}`,   { params: lang() }),

  // TV 시즌
  season: (id, num) => ax.get(`/tv/${id}/season/${num}`, { params: lang() }),

  // 전체보기 페이지용
  browsePage: (mediaType, category, page = 1, extra = {}) => {
    if (category === 'discover') {
      return ax.get(`/discover/${mediaType}`, { params: { ...lang(), ...extra, page } })
    }
    return ax.get(`/${mediaType}/${category}`, { params: { ...lang(), ...extra, page } })
  },

  // 인물 전체보기용
  browsePerson: (category, page = 1) => {
    if (category === 'trending_day')  return ax.get('/trending/person/day',  { params: { ...lang(), page } })
    if (category === 'trending_week') return ax.get('/trending/person/week', { params: { ...lang(), page } })
    return ax.get('/person/popular', { params: { ...lang(), page } })
  },
}
