import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className='w-full bg-black pt-16 pb-8'>
      <div className='max-w-[1664px] mx-auto px-8'>
        {/* 상단 */}
        <div className='flex gap-24 pb-10 border-b border-white/10'>
          {/* 브랜드 */}
          <div className='flex flex-col gap-4 max-w-[560px]'>
            <span className='text-white font-bold text-[30px]' style={{ fontFamily: 'Gmarket Sans TTF, sans-serif' }}>VODA</span>
            <p className='text-[#acabb1] text-sm leading-relaxed'>
              영화보다, 그 이상의 가치를 경험하는 에테리얼 큐레이션 플랫폼.<br />
              우리는 당신의 취향이 예술이 되는 순간을 함께합니다.
            </p>
            <div className='flex gap-4 mt-2'>
              <FontAwesomeIcon icon={faInstagram} className='text-[#acabb1] text-xl hover:text-white cursor-pointer transition-colors' />
              <FontAwesomeIcon icon={faXTwitter} className='text-[#acabb1] text-xl hover:text-white cursor-pointer transition-colors' />
              <FontAwesomeIcon icon={faYoutube} className='text-[#acabb1] text-xl hover:text-white cursor-pointer transition-colors' />
            </div>
          </div>

          {/* 링크 */}
          <div className='flex gap-16 ml-auto'>
            <div>
              <h6 className='text-white text-sm font-semibold mb-4'>Platform</h6>
              <ul className='flex flex-col gap-2'>
                {['VODA 소개', '이용약관', '개인정보처리방침'].map((item) => (
                  <li key={item}>
                    <a href='#' className='text-[#acabb1] text-sm hover:text-white transition-colors'>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className='text-white text-sm font-semibold mb-4'>Support</h6>
              <ul className='flex flex-col gap-2'>
                {['고객센터', '공지사항', '자주 묻는 질문'].map((item) => (
                  <li key={item}>
                    <a href='#' className='text-[#acabb1] text-sm hover:text-white transition-colors'>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className='flex items-center justify-between pt-6'>
          <span className='text-[#76747b] text-sm'>© 2026 나를 보다. The Ethereal Curator.</span>
          <div className='flex gap-6'>
            {['Terms of Art', 'Privacy Void', "Curator's Note"].map((item) => (
              <a key={item} href='#' className='text-[#76747b] text-sm hover:text-white transition-colors'>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
