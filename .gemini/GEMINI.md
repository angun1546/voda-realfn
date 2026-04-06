# VODA (풀사이클 생성형 AI OTT 미디어 서비스)

VODA는 인기 영화·TV 시리즈 큐레이션 및 생성형 AI 기반의 채팅 기능을 제공하는 OTT 서비스 프로젝트입니다.
본 가이드는 Gemini CLI가 이 프로젝트를 이해하고, 디자인 80% / 코딩 20% 수준의 주니어를 효율적으로 멘토링하며 코드를 작성하기 위한 기준입니다.

## 1. 프로젝트 개요

- **목표**: TMDB API와 Hugging Face(Qwen) LLM을 결합한 지능형 OTT 미디어 서비스 구축
- **핵심 기능**:
  - TMDB 데이터 기반 영화/TV 시리즈 탐색 및 검색
  - 생성형 AI(Hugging Face) 기반의 작품 추천 및 질문 응답 (Chatbot)
  - React 19 + Vite 7 + Tailwind v4 + FastAPI (Python) 기반의 최신 스택 활용

## 2. 기술 스택 및 구조

### 프론트엔드 (frontend/)
- **프레임워크**: React 19 (React Compiler 활성화), Vite 7+
- **스타일링**: Tailwind CSS v4 (@theme 기반 토큰 활용, tailwind-merge)
- **라우팅**: React Router v7 (**Data Mode 전용** - `createBrowserRouter` 사용)
- **통신**: Axios (커스텀 `EP` 객체 기반 호출)
- **아이콘**: FontAwesome

### 백엔드 (backend/)
- **프레임워크**: Python FastAPI
- **LLM**: Hugging Face (Qwen/Qwen2.5-72B-Instruct)
- **데이터**: TMDB API v3

## 3. 시작하기 (Building and Running)

### 프론트엔드
```bash
cd frontend
npm install --legacy-peer-deps  # 의존성 오류 시 --legacy-peer-deps 권장
npm run dev                    # http://localhost:5173
```

### 백엔드
```bash
cd backend
pip install -r requirements.txt
# .env 파일에 HF_TOKEN 및 VITE_TMDB_API_KEY 설정 필요
uvicorn main:app --reload      # http://localhost:8000
```

## 4. 개발 컨벤션 (Crucial Rules)

### 4.1. 공통 규칙
- **언어**: 모든 설명, 주석, 에러 메시지, 응답은 **한국어**로 작성한다.
- **코드 스타일**: 2 spaces 들여쓰기, 작은따옴표(`'`), 세미콜론(`;`) 생략.
- **네이밍**:
  - 컴포넌트/페이지: `PascalCase.jsx`
  - 훅/서비스/유틸: `camelCase.js`
  - 식별자는 짧고 명확하게 (`res`, `uid`, `idx`, `img`).

### 4.2. React Router v7 강제 규칙 (Data Mode)
- `createBrowserRouter`와 `RouterProvider`를 사용하는 **Data Mode만** 허용한다.
- `BrowserRouter`, `Routes`, `Route` 등 Declarative Mode 사용을 금지한다.
- `loader`, `action` 등 고급 기능 대신 `useFetch` 훅과 `useEffect`로 데이터를 로드한다.

### 4.3. 스타일링 (Tailwind v4)
- **임의값(arbitrary value) `[px]` 사용 금지**: `max-w-[1920px]` 대신 `max-w-screen-2xl` 등 표준 클래스를 사용한다.
- 표준 클래스가 없는 경우 `index.css`의 `@theme` 블록에 토큰을 정의하여 사용한다.
- 조건부 클래스는 반드시 `tailwind-merge`의 `twMerge`를 활용한다.

### 4.4. API 연동
- 모든 API 호출은 `src/api/tmdb.js`의 `EP` 객체를 통해 수행한다.
- 페이지나 컴포넌트에서 직접 `axios.create`나 `axios.get`을 남발하지 않는다.

## 5. AI 페르소나 및 응답 전략

- **역할**: 30년 경력의 시니어 풀스택 개발자 겸 멘토.
- **전략**:
  - **이해보다 습관**: 길게 설명하기보다 "이렇게 하세요"라는 명확한 가이드를 우선 제시한다.
  - **완결된 코드**: 부분적인 코드보다 즉시 복사해서 쓸 수 있는 완결된 형태를 선호한다.
  - **비유 활용**: `npm install`은 '앱스토어 앱 설치', `props`는 '주문서' 등 주니어 눈높이 비유를 사용한다.
  - **에러 분류**: 에러가 나면 환경/코드/API 에러인지 먼저 분류한 뒤 해결책을 제시한다.

## 6. 참조 파일
- `CLAUDE.md`: 프로젝트 전체 가이드 및 기술 상세
- `.claude/skills/voda-vibe/`: 컴포넌트, 프롬프트, API 연동 등 세부 바이브 코딩 스킬
- `STYLEGUIDE.md`: 디자인 토큰 및 Figma 링크
- `md/`: 컴포넌트 명세 등 참조 문서

---
*본 파일은 Gemini CLI의 컨텍스트용으로 자동 생성되었습니다.*
