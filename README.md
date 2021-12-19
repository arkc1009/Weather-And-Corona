# 이스트 프론트 프로젝트 백엔드

[개발과 함께한 넋두리](https://functional-aura-c82.notion.site/EST-Front-Project-Front-4d7743045fa9466fac8bcf886dd1b921)

## 어떤 프로젝트?

유저의 위치 정보를 토대로 해당 위치의 **지도**, **날씨**, **기상 정보**를 제공하며,
추가로 **코로나 관련 정보**를 제공합니다.

[날씨, 기상정보 API](https://openweathermap.org/)

[코로나 API](https://www.data.go.kr/data/15043376/openapi.do)

### 환경변수

```
SERVER_PORT= 백엔드 서버 포트 설정 / default: 3001

JWT_KEY= jwt토큰 시크릿 키 / default: jwt
JWT_ACCESS_TIME= 액세스 토큰 만료 시간 / default: 60*10 (600s, 10m)
JWT_REFRESH_TIME= 리프레시 토큰 만료 시간/ default: 60*60 (3600s, 1h)
```

토큰 만료 시간의 경우 문자열로 취급되며, 1s, 1m, 1h 등의 형식 가능.

숫자를 사용할 경우 오직 '\*' 연산 표시만 사용할것.

(불가능 => 60 + 60 / 가능 => 60 \* 60)

```
cp .env.temp .env
```

위 명령어를 통해 환경변수(.env) 파일을 생성해야 합니다.

### 의존성 설치

```
yarn
```

### 통합 시작

```
yarn start
```
입력시 백엔드, 프론트가 동시에 실행됩니다.

### 개발모드 시작

```
yarn start:dev
```

### 프로젝트 빌드

```
yarn build
```

### 서버 실행

```
yarn server
```

### 그 외 명령어들

```
yarn lint // eslint 검사를 명령어로 실행합니다.
yarn lint:fix // eslint 규칙에 맞게 소스코드를 수정합니다.
```
