import EpisodeCard from './EpisodeCard'

/**
 * 에피소드 목록 섹션 컴포넌트
 * @param {Array} episodes - 에피소드 데이터 배열
 * @param {string} showTitle - TV 프로그램 제목
 */
const EpisodeSection = ({ episodes = [], showTitle }) => {
  if (!episodes || episodes.length === 0) return null

  return (
    <section className='px-20 py-8'>
      <h2 className='text-xl font-bold text-zinc-50 mb-6'>에피소드</h2>
      <div className='flex flex-col gap-6'>
        {episodes.map(ep => (
          <EpisodeCard
            key={ep.id}
            ep={ep.episode_number}
            title={ep.name}
            thumb={ep.still_path}
            duration={`${ep.runtime || 0}분`}
            overview={ep.overview}
          />
        ))}
      </div>
    </section>
  )
}

export default EpisodeSection
