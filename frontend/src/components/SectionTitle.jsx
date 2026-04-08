import { useNavigate } from 'react-router'
import useScrollAnim from '../hooks/useScrollAnim'

const SectionTitle = ({ title, subtitle, link = '#', hideAllBtn = false }) => {
  const navigate = useNavigate()
  const [ref, visible] = useScrollAnim(0.2)

  return (
    <div
      ref={ref}
      className={`flex items-center w-full py-10 scroll-reveal${visible ? ' is-visible' : ''}`}
    >
      {/* 왼쪽: 제목 + 부제목 */}
      <div className='flex-1 flex flex-col gap-1.5 md:gap-3'>

        {/* 제목 행: 보라색 세로 바 + 타이틀 */}
        <div className='flex items-center gap-2 md:gap-2.5 py-0.5'>
          <div className='w-2 md:w-3 h-8 md:h-12 bg-primary-400 rounded-full shrink-0' />
          <h2 className='font-serif font-bold text-2xl md:text-4xl leading-none text-neutral-50 whitespace-nowrap'>
            {title}
          </h2>
        </div>

        {/* 부제목: subtitle prop이 있을 때만 표시 */}
        {subtitle && (
          <div className='flex items-start gap-2 md:gap-2.5'>
            <div className='w-2 md:w-3 shrink-0' />
            <p className='font-serif font-normal text-sm md:text-lg leading-relaxed md:leading-9 text-neutral-400'>
              {subtitle}
            </p>
          </div>
        )}
      </div>

      {/* 오른쪽: 전체보기 버튼 (hideAllBtn이 false일 때만 렌더링) */}
      {!hideAllBtn && (
        <button
          onClick={() => navigate(link)}
          className='flex items-center gap-1.5 md:gap-2 shrink-0 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none'
        >
          <span className='font-serif font-medium text-lg md:text-2xl text-primary-400'>전체보기</span>
          <i className='fa-solid fa-arrow-right text-primary-400 text-base md:text-xl' />
        </button>
      )}
    </div>
  )
}

export default SectionTitle
