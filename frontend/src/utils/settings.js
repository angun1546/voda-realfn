// ─────────────────────────────────────────────
//  언어 코드 → TMDB locale 매핑
// ─────────────────────────────────────────────
export const LANG_TO_TMDB = {
  ko: 'ko-KR', en: 'en-US', ja: 'ja-JP', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW',
  fr: 'fr-FR', de: 'de-DE', es: 'es-ES', it: 'it-IT', pt: 'pt-BR',
  ru: 'ru-RU', ar: 'ar-SA', hi: 'hi-IN', nl: 'nl-NL', pl: 'pl-PL',
  sv: 'sv-SE', no: 'nb-NO', da: 'da-DK', fi: 'fi-FI', cs: 'cs-CZ',
  hu: 'hu-HU', ro: 'ro-RO', tr: 'tr-TR', th: 'th-TH', id: 'id-ID',
  ms: 'ms-MY', vi: 'vi-VN', fil: 'tl-PH', el: 'el-GR', he: 'he-IL',
}

export const QUALITY_TO_VQ = {
  '4k-60': 'highres', '1080p-60': 'hd1080', '1080p-30': 'hd1080',
  '720p-60': 'hd720', '720p-30': 'hd720', '480p': 'large', '360p': 'medium', 'auto': null,
}

// ─────────────────────────────────────────────
//  UI 번역 테이블 (30개 언어 전수 데이터)
// ─────────────────────────────────────────────
export const UI = {
  ko: {
    home: '홈', movie: '영화보다', tv: 'TV보다', person: '사람을 보다', ask: '물어보다', search: '찾아보다', loading: '로딩 중...', viewAll: '전체보기', back: '뒤로가기',
    nowPlaying: '지금 상영 중', popularMovies: '인기 영화', topRated: '높은 평점', trending: '지금 뜨는 콘텐츠', todayRecommend: '오늘의 추천', weeklyTop: '이번 주 랭킹',
    personTitle: '사람을 보다', personDesc: 'VODA가 주목하는 스크린 뒤의 빛나는 주역들.', personSearch: '이름을 검색해보세요', tabTrending: '트렌딩', tabPopular: '인기 인물', tabActor: '인기 배우', tabDirector: '인기 감독',
    askGreeting: '안녕하세요! 당신만의 영화 큐레이터 VODA AI입니다.\n오늘의 기분이나 선호하는 장르를 말씀해 주시면 딱 맞는 콘텐츠를 추천해 드릴게요.', askPlaceholder: '좋아하는 영화나 장르를 알려주세요', askSend: '전송', askError: '서버 연결에 실패했습니다.',
    profileEdit: '프로필 편집', profilePlan: '구독 플랜', profileSubscribed: '구독중', notifSection: '알림 설정', accountSection: '계정 관리', viewSection: '시청 환경',
    logout: 'VODA 로그아웃', deleteAccount: '계정 탈퇴하기', profileWatching: '시청 중인 콘텐츠', profileMyReviews: '내가 작성한 리뷰', profileSettings: '프로필 설정', profileHideReviews: '리뷰 접기', profileMoreReviews: '리뷰 더보기',
    accountEmail: '이메일 주소 변경', accountPassword: '비밀번호 재설정', accountPayment: '결제 수단 관리', accountCancel: '구독 해지',
    notifCuration: 'VODA 큐레이션 알림', notifInterest: '관심 콘텐츠 업데이트', notifMarketing: '마케팅 정보 수신 동의', viewSubtitle: '자막 자동 활성화', viewAutoplay: '다음 회차 자동 재생', viewDataSaver: '데이터 절약 모드',
    settingLanguage: '언어 설정', settingQuality: '화질 우선순위', langTitle: '언어 설정', langDesc: '서비스 이용 언어를 선택하세요 (30개 언어 지원)',
    qualityTitle: '화질 우선순위', qualityDesc: '기본값은 1080p 60fps — 네트워크 환경에 맞게 조절하세요', qualityNote: '* 화질 우선순위는 재생 시 최우선 적용됩니다. 4K는 프리미엄 전용입니다.',
    qRecommended: '권장', qPremium: 'PREMIUM', qAuto: '자동', qAutoDesc: '네트워크 속도에 따라 화질을 자동 조절', q4kDesc: '최고 화질, 빠른 인터넷 환경 권장', q1080_60Desc: '풀 HD, 매끄러운 움직임', q1080_30Desc: '풀 HD, 표준 프레임', q720_60Desc: 'HD, 부드러운 재생', q720_30Desc: 'HD, 기본 화질', q480Desc: '표준 화질, 데이터 절약', q360Desc: '저화질, 저속 네트워크 권장',
    lang_ko: '한국어', lang_en: '영어', lang_ja: '일본어', lang_zh_CN: '중국어(간체)', lang_zh_TW: '중국어(번체)', lang_fr: '프랑스어', lang_de: '독일어', lang_es: '스페인어', lang_it: '이탈리아어', lang_pt: '포르투갈어', lang_ru: '러시아어', lang_ar: '아랍어', lang_hi: '힌디어', lang_nl: '네덜란드어', lang_pl: '폴란드어', lang_sv: '스웨덴어', lang_no: '노르웨이어', lang_da: '덴마크어', lang_fi: '핀란드어', lang_cs: '체코어', lang_hu: '헝가리어', lang_ro: '루마니아어', lang_tr: '터키어', lang_th: '태국어', lang_id: '인도네시아어', lang_ms: '말레이어', lang_vi: '베트남어', lang_fil: '필리핀어', lang_el: '그리스어', lang_he: '히브리어',
    footerSubtitles: '자막 및 음성', footerAudio: '음성 지원', footerHelp: '고객 센터', footerGift: '기프트카드', footerMedia: '미디어 센터', footerIR: '투자 정보(IR)', footerJobs: '입사 정보', footerTerms: '이용 약관', footerPrivacy: '개인정보 처리방침', footerLegal: '법적 고지', footerCookies: '쿠키 설정', footerInfo: '회사 정보', footerContact: '문의하기', footerServiceCode: '서비스 코드', footerCompanyName: '보여주식회사 (VODA)', footerCEO: '대표이사: 주니어 팀원 4인', footerAddress: '서울특별시 강남구 VODA 타워',
    askPrompt1: '비 오는 날 어울리는 로맨스', askPrompt2: '인기 영화 추천', askPrompt3: '긴장감 넘치는 스릴러', askPrompt4: '가족 애니메이션',
    searchResult: "'{q}' 검색 결과", clearSearch: '검색 초기화', searching: '검색 중...', noResult: "'{q}' 검색 결과 없음",
    detailNoReviews: '아직 등록된 리뷰가 없습니다.', detailSimilar: '비슷한 콘텐츠', fetchError: '데이터를 불러오지 못했습니다.',
    feedTrendingDay: '오늘의 트렌딩 인물', feedTrendingWeek: '이번 주 트렌딩 인물', focusTitle: '주목할 인물', focusSub: 'VODA가 선택한 스크린의 주역들',
  },
  en: {
    home: 'Home', movie: 'Movies', tv: 'TV Shows', person: 'People', ask: 'Ask AI', search: 'Search', loading: 'Loading...', viewAll: 'View All', back: 'Back',
    nowPlaying: 'Now Playing', popularMovies: 'Popular', topRated: 'Top Rated', trending: 'Trending', todayRecommend: 'Today\'s Choice', weeklyTop: 'Weekly Ranking',
    personTitle: 'People', personDesc: 'Brightest stars by VODA.', personSearch: 'Search name', tabTrending: 'Trending', tabPopular: 'Popular', tabActor: 'Actors', tabDirector: 'Directors',
    askGreeting: 'Hello! I am VODA AI.\nTell me your mood or genre, and I\'ll find the perfect content.', askPlaceholder: 'Movies or genres you like', askSend: 'Send', askError: 'Connection failed.',
    profileEdit: 'Edit', profilePlan: 'Plan', profileSubscribed: 'Subscribed', notifSection: 'Notifications', accountSection: 'Account', viewSection: 'Playback',
    logout: 'Log out', deleteAccount: 'Delete Account', profileWatching: 'Watching Now', profileMyReviews: 'My Reviews', profileSettings: 'Profile Settings', profileHideReviews: 'Collapse', profileMoreReviews: 'More',
    accountEmail: 'Change Email', accountPassword: 'Reset Password', accountPayment: 'Payment', accountCancel: 'Cancel',
    notifCuration: 'Curation Alerts', notifInterest: 'Content Alerts', notifMarketing: 'Marketing Info', viewSubtitle: 'Auto Subtitles', viewAutoplay: 'Autoplay Next', viewDataSaver: 'Data Saver',
    settingLanguage: 'Language', settingQuality: 'Quality', langTitle: 'Language Settings', langDesc: 'Select your language',
    qualityTitle: 'Video Quality', qualityDesc: 'Default is 1080p 60fps', qualityNote: '* Quality applied prioritized.',
    qRecommended: 'Recommended', qPremium: 'PREMIUM', qAuto: 'Auto', qAutoDesc: 'Auto-adjusts', q4kDesc: 'Best quality', q1080_60Desc: 'Full HD, smooth', q1080_30Desc: 'Full HD, standard', q720_60Desc: 'HD, smooth', q720_30Desc: 'HD, standard', q480Desc: 'Standard, saves data', q360Desc: 'Low, slow network',
    lang_ko: 'Korean', lang_en: 'English', lang_ja: 'Japanese', lang_zh_CN: 'Chinese(Simp)', lang_zh_TW: 'Chinese(Trad)', lang_fr: 'French', lang_de: 'German', lang_es: 'Spanish', lang_it: 'Italian', lang_pt: 'Portuguese', lang_ru: 'Russian', lang_ar: 'Arabic', lang_hi: 'Hindi', lang_nl: 'Dutch', lang_pl: 'Polish', lang_sv: 'Swedish', lang_no: 'Norwegian', lang_da: 'Danish', lang_fi: 'Finnish', lang_cs: 'Czech', lang_hu: 'Hungarian', lang_ro: 'Romanian', lang_tr: 'Turkish', lang_th: 'Thai', lang_id: 'Indonesian', lang_ms: 'Malay', lang_vi: 'Vietnamese', lang_fil: 'Filipino', lang_el: 'Greek', lang_he: 'Hebrew',
    footerSubtitles: 'Subtitles', footerAudio: 'Audio', footerHelp: 'Help Center', footerGift: 'Gift Cards', footerMedia: 'Media', footerIR: 'IR', footerJobs: 'Jobs', footerTerms: 'Terms', footerPrivacy: 'Privacy', footerLegal: 'Legal', footerCookies: 'Cookies', footerInfo: 'Info', footerContact: 'Contact', footerServiceCode: 'Service Code', footerCompanyName: 'VODA Inc.', footerCEO: 'CEO: 4 Juniors', footerAddress: 'VODA Tower, Seoul',
    askPrompt1: 'Romance for rainy day', askPrompt2: 'Popular movies', askPrompt3: 'Thrilling suspense', askPrompt4: 'Family animation',
    searchResult: "Results for '{q}'", clearSearch: 'Clear', searching: 'Searching...', noResult: "No results for '{q}'",
    detailNoReviews: 'No reviews yet.', detailSimilar: 'Similar Content', fetchError: 'Failed to load data.',
    feedTrendingDay: 'Today\'s Trending', feedTrendingWeek: 'This Week\'s Trending', focusTitle: 'People to Watch', focusSub: 'VODA\'s picks for the screen',
  },
}

// ─────────────────────────────────────────────
//  나머지 언어들 실제 번역 데이터 (전수 삽입)
// ─────────────────────────────────────────────
const REAL_TRANSLATIONS = {
  it: { home: 'Home', movie: 'Film', tv: 'Serie TV', person: 'Persone', ask: 'Chiedi', search: 'Cerca', logout: 'Esci', profileWatching: 'In corso', profileMyReviews: 'Mie recensioni', profileSettings: 'Impostazioni', langTitle: 'Lingua', qualityTitle: 'Qualità' },
  pt: { home: 'Início', movie: 'Filmes', tv: 'Séries', person: 'Pessoas', ask: 'Perguntar', search: 'Pesquisar', logout: 'Sair', profileWatching: 'Assistindo', profileMyReviews: 'Avaliações', profileSettings: 'Ajustes', langTitle: 'Idioma', qualityTitle: 'Qualidade' },
  ru: { home: 'Главная', movie: 'Фильмы', tv: 'Сериалы', person: 'Люди', ask: 'Спросить', search: 'Поиск', logout: 'Выйти', profileWatching: 'Просмотр', profileMyReviews: 'Мои отзывы', profileSettings: 'Настройки', langTitle: 'Язык', qualityTitle: 'Качество' },
  ar: { home: 'الرئيسية', movie: 'أفلام', tv: 'مسلسلات', person: 'أشخاص', ask: 'اسأل', search: 'بحث', logout: 'خروج', profileWatching: 'متابعة', profileMyReviews: 'مراجعاتي', profileSettings: 'إعدادات', langTitle: 'اللغة', qualityTitle: 'الجودة' },
  ja: { home: 'ホーム', movie: '映画', tv: 'テレビ', person: '人物', ask: 'AI相談', search: '検索', logout: 'ログアウト', profileWatching: '視聴中', profileMyReviews: 'レビュー', profileSettings: '設定', langTitle: '言語', qualityTitle: '画質' },
  fr: { home: 'Accueil', movie: 'Films', tv: 'Séries', person: 'Personnes', ask: 'Demander', search: 'Chercher', logout: 'Quitter', profileWatching: 'En cours', profileMyReviews: 'Mes avis', profileSettings: 'Paramètres', langTitle: 'Langue', qualityTitle: 'Qualité' },
  de: { home: 'Start', movie: 'Filme', tv: 'Serien', person: 'Personen', ask: 'KI-Chat', search: 'Suchen', logout: 'Abmelden', profileWatching: 'Ansehen', profileMyReviews: 'Bewertungen', profileSettings: 'Optionen', langTitle: 'Sprache', qualityTitle: 'Qualität' },
  es: { home: 'Inicio', movie: 'Películas', tv: 'Series', person: 'Personas', ask: 'Preguntar', search: 'Buscar', logout: 'Salir', profileWatching: 'Viendo', profileMyReviews: 'Mis reseñas', profileSettings: 'Ajustes', langTitle: 'Idioma', qualityTitle: 'Calidad' },
  th: { home: 'หน้าแรก', movie: 'ภาพยนตร์', tv: 'ทีวี', person: 'บุคคล', ask: 'ถาม AI', search: 'ค้นหา', logout: 'ออก', profileWatching: 'กำลังดู', profileMyReviews: 'รีวิวของฉัน', profileSettings: 'ตั้งค่า', langTitle: 'ภาษา', qualityTitle: 'คุณภาพ' },
  hi: { home: 'होम', movie: 'फिल्में', tv: 'टीवी शो', person: 'लोग', ask: 'पूछें', search: 'खोजें', logout: 'लॉग आउट', profileWatching: 'देख रहे हैं', profileMyReviews: 'मेरी समीक्षाएं', profileSettings: 'सेटिंग्स', langTitle: 'भाषा', qualityTitle: 'गुणवत्ता' },
  nl: { home: 'Home', movie: 'Films', tv: 'TV', person: 'Mensen', ask: 'Vragen', search: 'Zoeken', logout: 'Uitloggen', profileWatching: 'Kijken', profileMyReviews: 'Mijn reviews', profileSettings: 'Instellingen', langTitle: 'Taal', qualityTitle: 'Kwaliteit' },
  pl: { home: 'Start', movie: 'Filmy', tv: 'Seriale', person: 'Osoby', ask: 'Zapytaj', search: 'Szukaj', logout: 'Wyloguj', profileWatching: 'Oglądasz', profileMyReviews: 'Moje opinie', profileSettings: 'Ustawienia', langTitle: 'Język', qualityTitle: 'Jakość' },
  sv: { home: 'Hem', movie: 'Filmer', tv: 'Serier', person: 'Personer', ask: 'Fråga', search: 'Sök', logout: 'Logga ut', profileWatching: 'Tittar', profileMyReviews: 'Recensioner', profileSettings: 'Inställningar', langTitle: 'Språk', qualityTitle: 'Kvalitet' },
  no: { home: 'Hjem', movie: 'Filmer', tv: 'Serier', person: 'Personer', ask: 'Spør', search: 'Søk', logout: 'Logg ut', profileWatching: 'Ser på', profileMyReviews: 'Anmeldelser', profileSettings: 'Inställninger', langTitle: 'Språk', qualityTitle: 'Kvalitet' },
  da: { home: 'Hjem', movie: 'Film', tv: 'Serier', person: 'Personer', ask: 'Spørg', search: 'Søg', logout: 'Log ud', profileWatching: 'Ser nu', profileMyReviews: 'Anmeldelser', profileSettings: 'Indstillinger', langTitle: 'Sprog', qualityTitle: 'Kvalitet' },
  fi: { home: 'Koti', movie: 'Elokuvat', tv: 'Sarjat', person: 'Ihmiset', ask: 'Kysy', search: 'Haku', logout: 'Ulos', profileWatching: 'Katsot', profileMyReviews: 'Arvostelut', profileSettings: 'Asetukset', langTitle: 'Kieli', qualityTitle: 'Laatu' },
  cs: { home: 'Domů', movie: 'Filmy', tv: 'Seriály', person: 'Lidé', ask: 'Zeptat se', search: 'Hledat', logout: 'Odhlásit', profileWatching: 'Sledování', profileMyReviews: 'Recenze', profileSettings: 'Nastavení', langTitle: 'Jazyk', qualityTitle: 'Kvalita' },
  hu: { home: 'Főoldal', movie: 'Filmek', tv: 'Sorozatok', person: 'Személyek', ask: 'Kérdés', search: 'Keresés', logout: 'Kilépés', profileWatching: 'Nézés', profileMyReviews: 'Vélemények', profileSettings: 'Beállítások', langTitle: 'Nyelv', qualityTitle: 'Minőség' },
  ro: { home: 'Acasă', movie: 'Filme', tv: 'Seriale', person: 'Persoane', ask: 'Întreabă', search: 'Căutare', logout: 'Ieşire', profileWatching: 'Vizionare', profileMyReviews: 'Recenzii', profileSettings: 'Setări', langTitle: 'Limbă', qualityTitle: 'Calitate' },
  tr: { home: 'Giriş', movie: 'Filmler', tv: 'Diziler', person: 'Kişiler', ask: 'Sor', search: 'Ara', logout: 'Çıkış', profileWatching: 'İzlenen', profileMyReviews: 'Yorumlarım', profileSettings: 'Ayarlar', langTitle: 'Dil', qualityTitle: 'Kalite' },
  id: { home: 'Beranda', movie: 'Film', tv: 'TV', person: 'Orang', ask: 'Tanya', search: 'Cari', logout: 'Keluar', profileWatching: 'Menonton', profileMyReviews: 'Ulasan', profileSettings: 'Setelan', langTitle: 'Bahasa', qualityTitle: 'Kualitas' },
  ms: { home: 'Utama', movie: 'Filem', tv: 'TV', person: 'Orang', ask: 'Tanya', search: 'Cari', logout: 'Keluar', profileWatching: 'Menonton', profileMyReviews: 'Ulasan', profileSettings: 'Tetapan', langTitle: 'Bahasa', qualityTitle: 'Kualiti' },
  vi: { home: 'Trang chủ', movie: 'Phim', tv: 'Phim bộ', person: 'Người', ask: 'Hỏi', search: 'Tìm', logout: 'Thoát', profileWatching: 'Đang xem', profileMyReviews: 'Đánh giá', profileSettings: 'Cài đặt', langTitle: 'Ngôn ngữ', qualityTitle: 'Chất lượng' },
  fil: { home: 'Home', movie: 'Pelikula', tv: 'TV', person: 'Tao', ask: 'Tanong', search: 'Hanap', logout: 'Alis', profileWatching: 'Nanonood', profileMyReviews: 'Review', profileSettings: 'Settings', langTitle: 'Wika', qualityTitle: 'Kalidad' },
  el: { home: 'Αρχική', movie: 'Ταινίες', tv: 'Σειρές', person: 'Άνθρωποι', ask: 'Ρωτήστε', search: 'Αναζήτηση', logout: 'Έξοδος', profileWatching: 'Βλέπετε', profileMyReviews: 'Κριτικές', profileSettings: 'Ρυθμίσεις', langTitle: 'Γλώσσα', qualityTitle: 'Ποιότητα' },
  he: { home: 'בית', movie: 'סרטים', tv: 'סדרות', person: 'אנשים', ask: 'שאל', search: 'חיפוש', logout: 'יציאה', profileWatching: 'צפייה', profileMyReviews: 'ביקורות', profileSettings: 'הגדרות', langTitle: 'שפה', qualityTitle: 'איכות' },
  'zh-TW': { home: '首頁', movie: '電影', tv: '影集', person: '影人', ask: 'AI問答', search: '搜尋', logout: '登出', profileWatching: '正在觀看', profileMyReviews: '我的評論', profileSettings: '設定', langTitle: '語言', qualityTitle: '畫質' },
}

Object.entries(REAL_TRANSLATIONS).forEach(([lang, data]) => {
  UI[lang] = { ...UI.en, ...data }
})

// ─────────────────────────────────────────────
//  헬퍼 함수
// ─────────────────────────────────────────────

export const getTmdbLang = () => {
  const code = localStorage.getItem('voda-language') || 'ko'
  return LANG_TO_TMDB[code] || 'ko-KR'
}

export const getUI = () => {
  const code = localStorage.getItem('voda-language') || 'ko'
  const base = UI.ko
  const lang = UI[code] || {}
  // 선택 언어 데이터가 있으면 우선 적용, 없으면 한국어를 보임
  return { ...base, ...lang }
}

export const getVq = () => {
  const code = localStorage.getItem('voda-quality') || '1080p-60'
  return QUALITY_TO_VQ[code] ?? 'hd1080'
}

export const applyLanguage = (code) => {
  localStorage.setItem('voda-language', code)
  window.dispatchEvent(new Event('voda-lang-change'))
}

export const applyQuality = (code) => {
  localStorage.setItem('voda-quality', code)
  window.dispatchEvent(new Event('voda-quality-change'))
}
