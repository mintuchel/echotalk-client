<br>

<div align="center">
   <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
      <img src="src/assets/logo.png" alt="Logo" width="50" style="cursor: default; margin-bottom: 20px" />
      <h1 style="font-size: 55px; font-weight: bold; margin: 0;">EchoTalk</h1>
   </div>
  <p>Private Local Chatbot Service for Enterprises</p>
  <p>정보유출 걱정없는 기업 맞춤형 Private LLM</p>
</div>

## 프로젝트 소개

해당 프로젝트는 인턴십 기간 동안 수행한 사내 전용 로컬 챗봇 시스템입니다.
사내 문서와 각종 정보들을 벡터화하여 VectorDB에 저장하고, 이를 기반으로 로컬 LLM을 활용한 도메인 특화 질의응답 기능을 제공합니다.

외부 LLM 서비스에 사내 데이터를 직접 전송하는 것은 정보 보안상 위험이 따르기 때문에, 민감한 데이터를 외부에 직접 전송하지 않도록 온프레미스 환경에 설치된 LLM 모델을 활용하였습니다.

또한, LLM 기반 답변의 신뢰성과 정확도를 높이기 위해 주기적으로 VectorDB 데이터를 최신화하여 기업 내부 문서를 기반으로 응답을 생성하도록 하였습니다.

## 시스템 아키텍처

<img src="./public/architecture.png" alt="Logo" width="" style="margin-bottom: 0px;"/>

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
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Pydantic](https://docs.pydantic.dev/)

### VectorDB and AI Integration

- [Pinecone](https://www.pinecone.io/)
- [LangChain](https://www.langchain.com/)
- [LangChain OpenAI](https://js.langchain.com/docs/integrations/llms/openai)
- [LangChain Pinecone](https://js.langchain.com/docs/integrations/vectorstores/pinecone)

## 시작하기

해당 프로젝트를 로컬에서 실행하려면 우선 레포지토리를 클론해주세요.

```sh
git clone https://github.com/mintuchel/echotalk.git
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
   프로젝트의 패키지 및 의존성 관리를 효율적으로 처리해주는 Poetry를 설치합니다.
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

![LoginPage](./public/login.png)

### 2. 회원가입

![SignUpPage](./public/signup.png)

### 3. 일반 채팅

![Chat1](./public/chat1.png)

사내 정보와 직접적인 관련이 없는 일반적인 질문에 대해서는 OpenAI API를 통해 응답을 생성합니다.

### 4. 회사 정보 관련 채팅

4번부터 6번까지의 기능은 Pinecone이라는 VectorDB의 메타데이터 필터링 기능을 활용하여 특정 주제(리소스 메뉴)의 문서만 추출하고, 그중 유사도가 높은 **상위 5개의 문서를 질문과 함께** OpenAI에 전달해 질문의 의도와 맥락을 반영한 응답을 생성합니다.

![Chat2](./public/chat2.png)

리소스 메뉴에서 “직원 정보”를 선택하면, Pinecone의 메타데이터 필터링을 통해 "employee" 태그가 포함된 문서만 대상으로 유사도 검색을 수행합니다. 사용자의 질문을 벡터로 임베딩한 후, 해당 주제의 문서 중 코사인 유사도가 높은 벡터를 추출하고 이를 OpenAI에 전달하여 질문의 의도와 맥락을 고려한 응답을 생성합니다.

### 5. 직원/부서 정보 관련 채팅

![Chat3](./public/chat3.png)

리소스 메뉴에서 “직원 정보”를 선택한 경우, 직원 정보 관련된 문서들만 우선적으로 조회하여 답변을 제공합니다.

### 6. 규정 정보 관련 채팅

![Chat4](./public/chat4.png)

리소스 메뉴에서 “규정 정보”를 선택한 경우, 규정 정보 관련된 문서들만 우선적으로 조회하여 답변을 제공합니다.
조회된 문서들의 유사도가 임계 유사도보다 낮을 경우 문서 조회 범위를 넓히거나, OpenAI에게 직접 질문하여 답변을 가져옵니다.
