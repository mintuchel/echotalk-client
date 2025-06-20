<a id="readme-top"></a>

<br />
<div align="center">
  <img src="src/assets/icon.png" alt="Logo" height="130">
  <h3 align="center">Private Local Chatbot Service for Enterprises</h3>
  <h align="center">정보유출 걱정없는 기업 맞춤형 Private LLM</h>
  
</div>

## 프로젝트 소개

해당 프로젝트는 인턴십 기간 동안 수행한 프로젝트로, 사내 로컬 챗봇 서비스를 위한 클라이언트 사이드 애플리케이션입니다.

기획자의 요구사항에 따라, 전체적인 UI는 기존 상용 챗봇 서비스와 비슷하게 구성하였으며, 사내 정보를 보다 정확하게 탐색할 수 있도록 리소스 메뉴 컴포넌트를 채팅 화면 상단바에 추가하였습니다.

또한 피드백을 반영하여, 대화명 변경 및 삭제 시 모달 창을 활용한 동적 알림 기능을 구현해 사용자 인터랙션을 개선하였습니다.

사용할 언어는 자유롭게 선택하라고 하셔서, 레퍼런스가 많고 런타임 전에 타입에러를 잡아줄 수 있는 TypeScript를 선택했습니다.

짧은 기간에 구현해야했고, 리액트와 타입스크립트를 처음 접하여 UI는 Tailwind와 모듈화된 컴포넌트를 제공하는 Shadcn/UI를 사용하여 빠른 속도로 개발할 수 있게 하였습니다. 또한, 재사용될 가능성이 높은 컴포넌트들은 최대한 유연한 구조로 만들어 추후 사용하기 편하게 하였고, 훅들은 ~~하게 하여 필요없는 부분들도 리프레쉬 되는 것을 방지하였습니다.

## 기술 스택

### Frontend

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)

### Backend

- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/)
- [MySQL](https://www.mysql.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/) – ORM(Object Relational Mapping) 도구
- [Pydantic](https://docs.pydantic.dev/)

### VectorDB and AI Integration

- [Pinecone](https://www.pinecone.io/)
- [LangChain](https://www.langchain.com/)
- [LangChain OpenAI](https://js.langchain.com/docs/integrations/llms/openai)
- [LangChain Pinecone](https://js.langchain.com/docs/integrations/vectorstores/pinecone)

## 시작하기

해당 프로젝트를 로컬에서 실행하려면 우선 레포지토리를 클론해주세요.

```sh
git clone
https://github.com/mintuchel/echotalk.git
```

### Frontend

우선 클라이언트 폴더로 이동해주세요.

```sh
cd echotalk-client
```

1. Node.js와 Node Package Manager 설치

   ```sh
   brew install node
   ```

2. **의존성 패키지 설치**
   ```sh
   npm install
   ```
3. **서버 실행 후 접속**
   ```sh
   npm run dev
   ```
   브라우저에서 [http://localhost:5173](http://localhost:5173)로 접속

### Backend

우선 서버 폴더로 이동해주세요.

```sh
cd echotalk-client
```

1. **Python 3.13+ 설치**
   ```sh
   brew install python
   ```
   Homebrew로 다운로드 또는 Python 공식 홈페이지에서 3.x.x 버전 직접 다운로드
2. **Poetry 설치**
   ```sh
   pip install poetry
   ```
3. **의존성 패키지 설치**
   ```sh
   poetry install
   ```
4. **환경변수 파일 생성**
   ```sh
   OPENAI_API_KEY=your_openai_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   MYSQL_URL=mysql+pymysql://user:password@host:port/dbname
   ```
5. **서버 실행**

   ```sh
   poetry run uvicorn main:app
   ```

6. **API 문서 확인**

   브라우저에서 http://localhost:8000/docs 접속

## 주요 기능

### 1. 로그인

![LoginPage](https://github.com/user-attachments/assets/4e89b0bd-9aae-42af-b339-7faffaee00b4)

현재 로그인은 쿠키-세션 방식으로 구현되어있습니다.

### 2. 회원가입

![SignUpPage](https://github.com/user-attachments/assets/24dbb599-f118-46a7-b0ae-06023eadf7ff)

사내라는 제한된 환경에서 쓰이는 것이므로 echoit.co.kr 이라는 이메일만 허용되도록 하였습니다.

### 3. 일반 채팅

![Chat1](https://github.com/user-attachments/assets/aecac642-f33f-492e-8970-0f8dc0a4c20d)

사내 정보와는 관련이 없는 질문 시, OpenAI API를 활용하여 질문에 대한 응답을 받아옵니다.

### 4. 회사 정보 관련 채팅

4번부터 6번까지의 기능은 Pinecone이라는 VectorDB의 메타데이터 필터링 기능을 활용하여 특정 주제(리소스 메뉴)의 문서만 추출하고, 그중 유사도가 높은 **상위 5개의 문서를 질문과 함께** OpenAI에 전달해 질문의 의도와 맥락을 반영한 응답을 생성합니다.

![Chat2](https://github.com/user-attachments/assets/38c9fedb-4d87-4b3f-9a92-5728f44e30c9)

리소스 메뉴에서 “직원 정보”를 선택하면, Pinecone의 메타데이터 필터링을 통해 "employee" 태그가 포함된 문서만 대상으로 유사도 검색을 수행합니다. 사용자의 질문을 벡터로 임베딩한 후, 해당 주제의 문서 중 코사인 유사도가 높은 벡터를 추출하고 이를 OpenAI에 전달하여 질문의 의도와 맥락을 고려한 응답을 생성합니다.

### 5. 직원/부서 정보 관련 채팅

![Chat3](https://github.com/user-attachments/assets/cdc52e61-33cc-44de-829d-54b675b796b5)

리소스 메뉴에서 “직원 정보”를 선택한 경우, 직원 정보 관련된 문서들만 우선적으로 조회하여 답변을 제공합니다.

### 6. 규정 정보 관련 채팅

![Chat4](https://github.com/user-attachments/assets/0eb0e79d-8848-4c44-be32-39250be7ca95)

리소스 메뉴에서 “규정 정보”를 선택한 경우, 규정 정보 관련된 문서들만 우선적으로 조회하여 답변을 제공합니다.
조회된 문서들의 유사도가 임계 유사도보다 낮을 경우 문서 조회 범위를 넓히거나, OpenAI에게 직접 질문하여 답변을 가져옵니다.

## 아쉬운 점

1. 이번 Chatbot 시스템을 개발하면서 VectorDB에 대해 알게 되었습니다. VectorDB에 대한 공부를 통해 성능 개선까지 시도해보고 싶었는데 프로젝트 도중 다른 업무를 배정받게 되어 거기까지 나아가지는 못했다.

2. 현재 VectorDB에 GoogleColab을 통해서 데이터를 수동으로 복붙하고 DB 스키마에 맞게 직접 변환 과정을 거쳐 데이터를 저장하였다. 이러한 수고를 덜기 위해 데이터 파이프라인까지 만들어 손쉽게 데이터를 추가하려고 했으나 못했다.

3. 프롬프트 엔지니어링 관련
   VectorDB에서 조회된 유사도가 가장 높은 상위 5개의 문서들과 사용자의 질문을 함께 OpenAI에게 보낼때 일종의 프롬프트를 짜서 보내야되는데 이러한 프롬프트 템플릿에 대해 프롬프트 엔지니어링을 진행하지 못한점이 아쉽다.
