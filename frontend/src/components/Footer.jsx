import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import useUI from '../hooks/useUI'

const SOCIAL = [
  { label: 'Facebook',  icon: faFacebook,  href: 'https://www.facebook.com' },
  { label: 'YouTube',   icon: faYoutube,   href: 'https://www.youtube.com' },
  { label: 'X',         icon: faXTwitter,  href: 'https://www.x.com' },
  { label: 'Instagram', icon: faInstagram, href: 'https://www.instagram.com' },
]

const Footer = () => {
  const ui = useUI()
  const footerLinks = [
    ui.footerSubtitles, ui.footerAudio, ui.footerHelp, ui.footerGift,
    ui.footerMedia, ui.footerIR, ui.footerJobs, ui.footerTerms,
    ui.footerPrivacy, ui.footerLegal, ui.footerCookies, ui.footerInfo, ui.footerContact,
  ]

  return (
    <footer className='bg-neutral-950 text-neutral-500 py-20 px-12 border-t border-white/5'>
      <div className='max-w-screen-2xl mx-auto'>

        {/* 상단: 브랜드 로고 및 소셜 링크 */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl font-bold text-primary-400 tracking-tighter'>VODA</h2>
            <p className='font-serif text-sm text-neutral-600'>최고의 몰입, 그 이상의 감동을 선사합니다.</p>
          </div>

          <div className='flex gap-4'>
            {SOCIAL.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='size-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300'
                aria-label={label}
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </div>

        {/* 중단: 서비스 링크 그리드 */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-12 mb-16'>
          {footerLinks.map((link) => (
            <a
              key={link}
              href='#'
              onClick={(e) => e.preventDefault()}
              className='font-serif text-sm hover:text-neutral-200 transition-colors duration-200 w-fit'
            >
              {link}
            </a>
          ))}
        </div>

        {/* 하단: 기업 정보 및 카피라이트 */}
        <div className='pt-8 border-t border-white/5 flex flex-col gap-6'>
          <div className='flex flex-wrap gap-x-6 gap-y-2 text-xs font-serif leading-relaxed text-neutral-600'>
            <span>{ui.footerCompanyName}</span>
            <span>{ui.footerCEO}</span>
            <span>사업자등록번호: 000-00-00000</span>
            <span>통신판매업 신고번호: 제 2026-서울강남-0000호</span>
            <address className='not-italic'>{ui.footerAddress}</address>
            <span>고객센터: 1588-0000 (평일 09:00~18:00)</span>
          </div>

          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2'>
            <p className='text-xs font-serif text-neutral-700 uppercase tracking-widest'>
              © 2026 VODA, Inc. All rights reserved.
            </p>
            <button className='text-xs uppercase font-bold tracking-tighter border border-neutral-800 px-3 py-1.5 rounded text-neutral-600 hover:text-neutral-400 hover:border-neutral-600 transition-all cursor-pointer'>
              {ui.footerServiceCode}: 800-455
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
