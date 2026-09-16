Jeeho Park Portfolio

AI와 소프트웨어 개발 경험을 소개하는 개인 포트폴리오 웹사이트입니다. 삼성전자 삼성리서치 지원 이력서의 내용을 바탕으로 프로젝트, 경험, 학력과 자기소개를 구성했으며, 방문자가 메시지를 남길 수 있는 방명록 기능을 제공합니다.

## 주요 기능

- 프로필 사진과 간단한 자기소개를 보여주는 첫 화면
- AI, 음성합성, 자연어 처리 관련 프로젝트 소개
- NAVER 인턴, 동아리, 대외활동 및 학력 소개
- 방문자가 메시지를 남길 수 있는 방명록
- 데스크톱과 모바일 화면을 지원하는 반응형 레이아웃
- 상단 출처 표기: `삼성전자 삼성리서치 자기소개서 이력서.pdf`

## 화면 구성

- **Story**: 컴퓨터 소프트웨어와 수학을 공부하며 기술을 사람의 경험으로 연결해온 이야기
- **Work**: ASMR 음원 생성, 미디어 추천 시스템, 창업 프로토타입 프로젝트
- **Experience & Education**: NAVER 인턴, 고전음악회, 하이버디, 한양대학교 학력
- **Guestbook**: FastAPI 백엔드와 연결된 방문자 메시지 작성 및 조회 기능

## 기술 스택

- React 19
- Vite
- JavaScript
- CSS
- FastAPI
- SQLAlchemy
- SQLite 또는 PostgreSQL

## 프로젝트 구조

```text
memo-frontend/
├── src/
│   ├── assets/profile.jpg  # 프로필 사진
│   ├── App.jsx             # 포트폴리오와 방명록 화면
│   ├── App.css             # 페이지 스타일
│   └── index.css           # 전역 스타일
├── package.json
└── vite.config.js
```

방명록 API는 별도 프로젝트인 `memo-backend`에서 제공합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

기본 개발 주소는 `http://localhost:5173`입니다.

방명록을 로컬에서 사용하려면 FastAPI 백엔드를 먼저 실행하고, 필요하면 프론트엔드 루트에 `.env` 파일을 추가합니다.

```env
VITE_API_URL=http://localhost:8000
```

## 품질 검사

```bash
npm run lint
npm run build
```

## Vercel 배포

Vercel 프로젝트의 환경변수에 배포된 백엔드 주소를 등록해야 합니다.

```env
VITE_API_URL=https://memo-backend-sy19.onrender.com
```

환경변수 등록 후 새 배포를 실행해야 Vite 빌드에 API 주소가 반영됩니다. 백엔드의 CORS 설정에는 Vercel 사이트 주소가 포함되어야 합니다.

```text
https://memo-frontend-zeta.vercel.app
```

## 출처 및 개인정보

사이트의 자기소개 콘텐츠는 `삼성전자 삼성리서치 자기소개서 이력서.pdf`를 바탕으로 작성했습니다. 공개 웹사이트에 게시하는 목적을 고려해 원본 이력서에 포함된 이메일, 전화번호, 주소와 같은 개인정보는 화면에서 제외했습니다.
