import { useState } from 'react'
import './App.css'
import GenreTab from './components/GenreTab'

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const testTabs = [
    { id: 0,     name: '전체' },
    { id: 18,    name: '드라마' },
    { id: 28,    name: '액션' },
    { id: 35,    name: '코미디' },
    { id: 53,    name: '스릴러' },
    { id: 12,    name: '어드벤처' },
    { id: 878,   name: 'SF' },
    { id: 27,    name: '공포' },
    { id: 16,    name: '애니메이션' },
    { id: 80,    name: '범죄' },
    { id: 9648,  name: '미스테리' },
    { id: 10749, name: '로맨스' },
    { id: 14,    name: '판타지' },
    { id: 10751, name: '가족' },
    { id: 36,    name: '역사' },
    { id: 10752, name: '전쟁' },
    { id: 99,    name: '다큐멘터리' },
    { id: 10402, name: '음악' },
    { id: 37,    name: '서부' },
    { id: 10770, name: 'TV 영화' },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold p-8">GenreTab 컴포넌트 테스트</h1>
      
      {/* 방금 만든 GenreTab 렌더링 */}
      <GenreTab 
        tabs={testTabs} 
        active={activeTab} 
        onChange={(id) => setActiveTab(id)} 
      />
      
      <div className="p-8">
        <p className="text-xl">현재 선택된 탭 ID: <span className="text-primary-400 font-bold">{activeTab}</span></p>
      </div>
    </div>
  )
}

export default App
