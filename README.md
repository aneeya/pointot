# <img src="./src/assets/logo.png" alt="logo" width="200">

## 정의
숙박을 중심으로 여행지를 탐색하고 이용후, 숙소 근처 여행지를 소개할 수 있는 웹사이트 입니다.
<a href="https://velog.io/@wnjqkwnj/project%EA%B8%B0%ED%9A%8D">pointot란</a>

### 서비스 종류
+ 여행 스케줄 관리
+ 숙소 탐색
+ 숙소 상세페이지 내 근처 여행지 탐색
+ 숙소 근처 여행지 소개하기 
 
## 프로젝트 목적
crud 및 상태관리를 연습하기 위해 만든 개인 프로젝트입니다.

## 기능
### 일정등록
+ 여행제목, 여행지, 여행날짜 등록
+ 빈값으로 등록시 빈값을 채우라는 문구가 나오고 값을 다 입력했을 떄 문구가 사라짐
+ 등록 후 or 취소 버튼 클릭시 메인페이지로 이동
+ 여행날짜 입력란을 클릭시 달력띄우기
+ 해당 날짜 클릭시 여행날짜 입력란에 날짜 자동 입력

### 일정변경 및 삭제
+ 일정변경과 삭제는 일정관리 탭에 위치함
+ 저장한 일정들 중 하나를 선택하면 일정관리 탭이 활성화 되어 선택한 일정 내용을 볼 수 있음
+ 사용자가 지은 여행제목을 아이콘 버튼을 눌러 바로 변경가능
+ 예약한 숙소 리스트가 있을 경우에는 일정을 변경하거나 삭제할 수 없음

### dDay 알림
+ 저장한 일정 시작일을 기준으로 dDay 표시가 나타남
# pointot

### 핀리스트 저장 및 삭제
+ 핀 아이콘 토글 버튼을 클릭하여 숙소 항목을 저장 및 삭제할 수 있음
+ 저장 및 삭제 성공시 아이콘 버튼 색상이 변함
+ 핀리스트 탭에 저장 및 삭제한 항목이 반영됨
+ 여행 일정이 끝나면 자동으로 삭제됨

### 예약하기
+ 체크인, 체크아웃 날짜를 클릭하여 예약할 수 있음
+ 숙박일 수 만큼 가격이 반영됨
+ 예약 성공시 일정 관리탭 예약목록에 추가됨

### 예약취소하기
+ 예약목록에서 취소 버튼시 예약 취소됨

## API
<img src="https://velog.velcdn.com/images/wnjqkwnj/post/6753036d-6638-4ab8-90d8-57072aeab4bc/image.jpg">
<a href="https://velog.io/@wnjqkwnj/pointot-data">pointot-data</a>

### 🔧기술스택
+ react(CRA)
+ typescript
+ styled-compontnet
+ react-query

### 화면구조 및 컴포넌트 구조
<a herf="https://velog.io/@wnjqkwnj/pointot-component%EA%B5%AC%EC%84%B1">pointot-component</a>