# CloneBunjang
번개장터 클론 프로젝트 입니다.

## Environment
<img src="https://img.shields.io/badge/-Amazon AWS-232F3E?style=flat&logo=Amazon AWS&logoColor=white"/>
AWS EC2 서버의 t2.micro 환경에서 구동 중입니다.

DATABASE는 MongoDB를 활용 중이며 ec2 인스턴스에서만 접근 할 수 있습니다.

## Technical Stacks
<div float: left; >
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Mongodb-47A248?style=flat&logo=Mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
</div>

JAVASCRIPT, NODEJS, EXPRESS, MongoDB를 활용합니다.
- 서버는 Amazon Web Service EC2 인스턴스에서 구동 중
- Joi라이브러리를 활용한 이메일, 비밀번호 형식 구현
- USER : 회원가입, 로그인 기능, 로그인 토큰을 이용해서 홈페이지 활동 권한 구현
- POST : 게시글 작성, 삭제, 수정, 조회(최신순, 가격순), 등록시간 구현
- MYPAGE
- SOCKET : 구현중

## Prerequisite
<div float: left; >
  <img src="https://img.shields.io/badge/-Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Mongodb-47A248?style=flat&logo=Mongodb&logoColor=white"/>
</div>
 
- Node.js - Node.js 및 npm 패키지 관리자를 [다운로드 및 설치합니다](https://nodejs.org/en/download/) . 문제가 발생하면 이 GitHub Gist 를 사용하여 Node.js를 설치할 수도 있습니다.
- MongoDB - MongoDB 를 [다운로드 및 설치](http://mongodb.org/) 하고 기본 포트(27017)에서 실행 중인지 확인합니다.

## ERD
![CFD6CEB0-44A0-4349-A01F-F4B909AB78BE](https://user-images.githubusercontent.com/105096793/175244009-791a6f6e-e8a3-4fed-827a-72015790f17a.jpeg)


## API Design

![screencapture-teamsparta-notion-site-f03818558a8e44798a47a0bd270611d3-2022-06-23-17_31_51](https://user-images.githubusercontent.com/105096793/175254418-9ae42a18-c99e-40ac-a45c-318999649ded.png)

