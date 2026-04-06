# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참조하는 가이드입니다.

## 저장소 개요

2개의 독립적인 OTT 미디어 서비스 프로젝트를 포함하는 **멀티 프로젝트 저장소**입니다. 9일 스프린트(2026.03.24 ~ 2026.04.03) 기간 동안 별도 팀이 개발합니다. 양 팀 모두 디자인 80% / 코딩 20% 숙련도이며, Gemini CLI·Claude CLI 바이브 코딩으로 구현합니다.

**모든 응답·주석·설명은 반드시 한국어로 작성한다.**

| 프로젝트 | 경로 | 설명 |
|----------|------|------|
| **VODA** | `VODA/` | 인기 영화·TV 시리즈 큐레이션 OTT 서비스 (4인 팀) |
| **Rookiz** | `Rookiz/` | 만 13세 미만 키즈 OTT 서비스, AI 캐릭터 '루' (3인 팀) |

각 프로젝트에 별도 `CLAUDE.md`가 있으며, **해당 디렉토리 작업 전 반드시 하위 CLAUDE.md를 먼저 읽어야 한다.**

## 공통 기술 스택

양 프로젝트가 동일한 핵심 스택을 사용한다:

- **프론트엔드**: React 19, Vite, Tailwind CSS v4, React Router v7 (Data Mode — `createBrowserRouter`), Axios, FontAwesome, tailwind-merge
- **백엔드**: Python FastAPI + TMDB API
- **구조**: 모노레포 (`frontend/` + `backend/`)

## 공통 빌드 명령어

양 프로젝트 모두 각각의 `frontend/` 디렉토리에서 동일한 명령어를 사용한다:

```bash
# 프론트엔드 ({프로젝트}/frontend/ 에서 실행)
npm install              # 의존성 설치 (오류 시 --legacy-peer-deps 추가)
npm run dev              # 개발 서버 (http://localhost:5173)
npm run build            # 프로덕션 빌드
npm run lint             # ESLint 검사
npm run preview          # 빌드 결과물 미리보기

# 백엔드 ({프로젝트}/backend/ 에서 실행)
pip install -r requirements.txt
uvicorn main:app --reload
```

## 아키텍처

```
team2/
├── VODA/                    # VODA 프로젝트
│   ├── frontend/            # React 19 + Vite 8 + Tailwind v4
│   │   └── src/
│   │       ├── api/         # Axios 인스턴스 + TMDB EP 객체 (tmdb.js, axios.js)
│   │       ├── components/  # 재사용 공통 컴포넌트
│   │       ├── pages/       # 라우트 단위 페이지
│   │       ├── hooks/       # 커스텀 훅 (useFetch 등)
│   │       └── router/      # createBrowserRouter 설정
│   ├── backend/             # FastAPI 서버
│   ├── md/                  # API 엔드포인트 문서
│   ├── json/                # 디자인 토큰 (색상, 타이포, 간격 등)
│   └── .claude/skills/      # VODA 전용 AI 코딩 스킬 정의
│
└── Rookiz/                  # Rookiz 프로젝트
    ├── frontend/            # React 19 + Vite 6 + Tailwind v4
    │   └── src/
    │       ├── api/         # TMDB API 호출
    │       ├── components/  # 공용 컴포넌트 (Nav, Card, Footer)
    │       ├── context/     # 전역 상태 (Profile, MovieModal, Mission)
    │       ├── hooks/       # 커스텀 훅 (useEyeGuard 등)
    │       ├── pages/       # 페이지 (Main, Detail, Category, Search)
    │       └── styles/      # Tailwind 토큰 + 글로벌 스타일
    └── backend/             # FastAPI + HuggingFace AI 챗봇
```

## 공통 코딩 컨벤션

- **들여쓰기**: 2 spaces (탭 금지)
- **문자열**: 작은따옴표 (`'`)
- **세미콜론**: JS/JSX에서 생략
- **파일 네이밍**: 컴포넌트·페이지는 PascalCase (`.jsx`), 훅·유틸은 camelCase (`.js`)
- **TypeScript 사용 금지** — `.jsx`와 `.js`만 사용
- **라우터**: React Router v7 Data Mode만 허용 (`createBrowserRouter` + `RouterProvider`). `BrowserRouter`/`Routes`/`Route` 선언적 모드 금지
- **Tailwind**: v4 유틸리티 클래스만 사용, 임의값 `[...]` 지양 — `@theme` 토큰 사용
- **API 호출**: 프로젝트별 Axios/EP 패턴을 통해서만 호출, 페이지에서 직접 `axios.create` 금지
- **커밋 메시지 접두사**: `feat:`, `fix:`, `docs:`
