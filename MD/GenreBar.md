# Task: GenreBar.jsx 컴포넌트 구현

## 프로젝트 컨텍스트 (CLAUDE.md 기준)
- 프로젝트명: VODA (영상 큐레이션 OTT 플랫폼)
- 스택: React 19, Tailwind CSS v4, tailwind-merge
- 들여쓰기: 2 spaces / 문자열: 작은따옴표 / 세미콜론 생략
- 컴포넌트 패턴: 화살표 함수 + default export
- 파일 위치: src/components/GenreBar.jsx

## 컴포넌트 명세 (피그마 Bar_Movie 프레임 기준)

### 전체 래퍼
- `backdrop-blur-[20px] bg-[rgba(24,24,27,0.8)] py-[36px] w-full sticky top-0 z-10`
- 내부는 두 줄 고정 레이아웃 (총 높이 144px)
- 1줄: top-0, 2줄: top-[80px], 각각 절대 위치 + 수평 중앙 정렬
- 버튼 간격: gap-[16px]

### 버튼 스타일
**활성 상태 (selected):**
`bg-[#a78bfa] text-[#2e1065] font-semibold text-2xl h-[64px] px-[36px] py-[14px] rounded-full`

**비활성 상태:**
`bg-[#27272a] border-2 border-[#52525b] text-[#a1a1aa] font-semibold text-2xl h-[64px] px-[38px] py-[16px] rounded-full`

### 1줄 장르 목록 (11개)
전체, 드라마, 액션, 코미디, 스릴러, 어드벤처, SF, 공포, 애니메이션, 범죄, 미스테리

### 2줄 장르 목록 (9개)
로맨스, 판타지, 가족, 역사, 전쟁, 다큐멘터리, 음악, 서부, TV 영화

### Props
\`\`\`jsx
<GenreBar
  genres={['전체', '드라마', '액션', ...]}  // 장르 배열 (1줄+2줄 합친 전체)
  selected='전체'                           // 현재 선택된 장르
  onSelect={(genre) => {}}                 // 클릭 핸들러
/>
\`\`\`

## 작성 형식 (CLAUDE.md 컨벤션)
\`\`\`jsx
import { twMerge } from 'tailwind-merge'

const GenreBar = ({ genres, selected, onSelect }) => {
  // 1줄/2줄 분리: 첫 11개 / 나머지
  const row1 = genres.slice(0, 11)
  const row2 = genres.slice(11)

  return (
    <div className='...래퍼 클래스...'>
      ...
    </div>
  )
}

export default GenreBar
\`\`\`

## 요구사항
1. 선택된 장르 버튼만 활성 스타일 적용 (twMerge로 조건부 클래스 처리)
2. 버튼 클릭 시 onSelect(genre) 호출
3. genres props 배열로 주입받아 영화/TV 페이지 모두 재사용 가능하게 구현
4. 두 줄 고정 레이아웃 유지 (overflow 없음, 줄바꿈 없음)

## 주의사항
- A팀 GNB.jsx 완성 전까지 목업 GNB로 대체해서 개발 진행
- C팀 tmdbService.js 완성 전까지 장르 목록은 호출 측(MoviePage 등)에서 하드코딩으로 주입

## 공통 규칙 (매 작업마다 준수)
- A팀 컴포넌트(GNB, Footer, MovieCard, HeroSection) 미완성 시 → 목업으로 대체, import 경로만 맞춰두기
- C팀 tmdbService.js 미완성 시 → 파일 상단에 TODO 주석 명시 후 목업 데이터 사용
- 컴포넌트 파일 위치: src/components/ / 페이지 파일: src/pages/
- 명시된 라이브러리 외 임의 추가 금지
- 폰트: Pretendard (본문), Gmarket Sans (로고·포인트)