import React from 'react'
import { twMerge } from 'tailwind-merge'
import { useNavigate } from 'react-router'

/**
 * MoodGrid 컴포넌트 (Bento Style Search Suggestions)
 * @param {Array} moods - 무드 데이터 배열 [{title, desc, img, mediaType, category, genre}]
 */
const MoodGrid = ({ moods = [] }) => {
  const navigate = useNavigate()
  
  // 무드 클릭 시 검색/브라우즈 페이지로 이동
  const handleMoodClick = (mood) => {
    const { mediaType, category, genre, title } = mood
    const path = genre 
      ? `/browse/${mediaType}/${category}?genre=${genre}&title=${encodeURIComponent(title)}`
      : `/browse/${mediaType}/${category}?title=${encodeURIComponent(title)}`
    
    navigate(path)
  }

  if (!moods || moods.length === 0) return null

  return (
    <section className='py-6 md:py-10 w-full'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-zinc-50 font-sans tracking-tight'>
        지금 이런 분위기 어때요?
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-150 aspect-[4/5] md:aspect-auto'>
        {moods.slice(0, 4).map((mood, idx) => (
          <div
            key={idx}
            onClick={() => handleMoodClick(mood)}
            className={twMerge(
              'relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer bg-zinc-900',
              idx === 0 ? 'col-span-2 row-span-2' : 
              idx === 1 ? 'col-span-2 row-span-1' : 
              'col-span-1 row-span-1'
            )}
          >
            {/* 배경 이미지 */}
            {mood.img && (
              <img
                src={mood.img}
                alt={mood.title}
                className='absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110'
              />
            )}

            {/* 그라데이션 오버레이 */}
            <div className='absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/20 to-transparent transition-opacity duration-300 group-hover:opacity-80' />

            {/* 텍스트 정보 */}
            <div className='absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-10'>
              <h3 className='text-lg md:text-2xl font-bold text-zinc-50 transform transition-transform duration-300 group-hover:-translate-y-1'>
                {mood.title}
              </h3>
              <p className='text-xs md:text-sm text-zinc-300 mt-1 md:mt-2 opacity-80 line-clamp-1'>
                {mood.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MoodGrid