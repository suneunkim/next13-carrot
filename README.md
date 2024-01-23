# 프로젝트 소개:

- PC 웹 기준 UI 개선하기: 홈 화면 레이아웃을 개선하여 시각적으로 더 깔끔하게 변경하기
- App Router 사용해보기: 서버 컴포넌트와 클라이언트 컴포넌트의 분리를 사용해보기
- 당근마켓 1버전에서 개선시키고 컴포넌트의 분리 숙련하기

## 사용 기술 스택:
```
NextJs, tailwindcss, Prisma, TypeScript, Cloudinary, swr
```

## 요약 & 추가하거나 변경하고 싶었던 사항

1. 메인 화면과 전체적인 레이아웃 수정을 통해 보여지는 모습 개선
2. next auth 이용해서 로그인, 회원가입 기능 구현
3. 페이지네이션 다른 라이브러리 사용해보기
4. 상품 업로드와 상세보기에서 카카오 맵으로 위치 정보를 추가
5. cloudinary 위젯 사용
6. 검색 기능 추가하기
7. 좋아요와 같은 뮤테이션 함수 다른 방식 사용
8. 카카오 지도 API 사용


## 페이지 별 기능

1. 홈
등록된 상품 조회, 상품마다 좋아요 버튼
카테고리 선택 시 선택한 카테고리의 상품 표시, 필터 제거 기능.
검색 기능

2. 상품 업로드 페이지
판매할 상품의 사진과 가격, 카테고리, 거래 위치를 지정하고 등록

3. 상품 상세 페이지
판매자의 정보와 상품 정보, 상세 설명 조회하기

4. 채팅 페이지
다른 유저에게 채팅과 사진 보내기

5. 사용자 페이지
- 회원가입과 로그인에 (next auth 사용)

## 페이지 별 스크린샷

<img src="https://private-user-images.githubusercontent.com/98196225/293149466-1cd74fc4-ecce-42cb-a4d2-0eadc51f1a5b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDM3NDQ4MzAsIm5iZiI6MTcwMzc0NDUzMCwicGF0aCI6Ii85ODE5NjIyNS8yOTMxNDk0NjYtMWNkNzRmYzQtZWNjZS00MmNiLWE0ZDItMGVhZGM1MWYxYTViLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjI4VDA2MjIxMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA2MmE3YWIyMmU5MjQ5NGYzMTJjMjFhNTMzYmQzYmM1MWFiNDQzOTk1NGNlZTE3YjRiYTc2ZDk5NWQxNTM0MjQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Nu5C-eN7gCsPeQN0Uusy7EXSTUzIfqSqYxtCou3wg7U"></img>
<img src="https://private-user-images.githubusercontent.com/98196225/293149486-3a24ac2e-0d22-420d-b6ee-fb34ed45935a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE3MDM3NDQ4MzAsIm5iZiI6MTcwMzc0NDUzMCwicGF0aCI6Ii85ODE5NjIyNS8yOTMxNDk0ODYtM2EyNGFjMmUtMGQyMi00MjBkLWI2ZWUtZmIzNGVkNDU5MzVhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEyMjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMjI4VDA2MjIxMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI5MGEyNjk2NDU4ZTlmNjBlMGIyNzgxZjYxMGMwMTdiZTNmZWI2MzlmY2FkOGNkMTNjZjY4ZWU0YWQ1YzM4OWQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.YmPTxkUEIrlDhE8Yf0AxZydTEX6zI2PdQW12VA40fHA"></img>
