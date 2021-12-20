# 이스트 프론트 프로젝트 프론트엔드
2021/12/17 : **모바일 기기로 웹 서비스 이용시 위지위그 에디터 입력이 불가능한 이슈 발견** **해결**

## 어떤 프로젝트?

유저의 위치 정보를 토대로 해당 위치의 **지도**, **날씨**, **기상 정보**를 제공하며,
추가로 **코로나 관련 정보**를 제공합니다.

[날씨, 기상정보 API](https://openweathermap.org/)

[코로나 API](https://www.data.go.kr/data/15043376/openapi.do)

### 환경변수

```
REACT_APP_SERVER_URL= 백엔드 서버 주소 (ex. http://localhost:3001)

REACT_APP_WEATHER_KEY= openweather API KEY
REACT_APP_GOOGLE_MAP_KEY= 구글 맵 API KEY
REACT_APP_CORONA_KEY= 코로나 API KEY
```

```
cp .env.temp .env
```
위 명령어를 통해 환경변수(.env) 파일을 생성해야 합니다.

### 의존성 설치
```
yarn
```



### 개발모드 시작

```
yarn start
```

### 프로젝트 빌드

```
yarn build
```

### 그 외 명령어들

```
yarn lint // eslint 검사를 명령어로 실행합니다.
yarn lint:fix // eslint 규칙에 맞게 소스코드를 수정합니다.
yarn prettier // prettier 규칙에 맞게 소스코드를 수정합니다.
```
