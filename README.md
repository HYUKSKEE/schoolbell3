# 과제 3

<aside>
💡 아래 폼을 구현해주세요 (어떤 프레임워크나 라이브러리를 사용해도 괜찮습니다.)

</aside>

![image](https://github.com/HYUKSKEE/schoolbell3/assets/85611408/f7e38f39-6752-4bf4-b3ae-1e14275508e2)
## 조건

- 유저 폼 추가 및 삭제
- 각 폼의 이름 인풋 중에서 중복되는 이름이 있으면 에러 표시
- 이름은 3글자 이상, 비밀번호는 6글자 이상

## 추가된 조건
- Name 입력폼 조건
  - 한글일 경우 한개의 글자가 완성된 이후 에러 체크
  - onBlur 이벤트 사용하여 duplicated 에러 체크
- Password 입력폼 조건
  - onBlur 이벤트 사용하여 requierd 에러 체크



## 프로젝트 실행

1. 프로젝트 clone
```
git clone https://github.com/HYUKSKEE/schoolbell3.git
```
2. 패키지 설치
```
npm install
```
3. 프로젝트 실행
```
npm run start
```
