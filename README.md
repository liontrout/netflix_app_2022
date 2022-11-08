### 수정사항
1. Play 버튼을 눌렀을 때 영상 소스가 없으면 에러메세지와 함께 5초 후 홈으로 리다이렉트
2. More Information 버튼을 누르면 DetailPage로 이동
3. Banner에 text-shadow 구현 (배경이 흰색일 경우 가독성이 떨어지는 것을 보완)
4. 검색창에 텍스트를 입력 후 완전히 지웠을 때 홈으로 이동
5. 검색창에 텍스트가 있을 경우 엔터 키를 누르면 검색이 되게 구현 (SearchPage에서 DetailPage로 이동했을 때 input에는 텍스트가 남아있는데, 다시 원래 SearchPage로 돌아가고 싶을 때를 위해서 기능을 구현함)
6. SearchPage에서 목록들을 hover했을 때 간단한 영화 정보가 보이게 구현
7. DetailPage에서 포스터를 포함 자세한 영화 정보가 표시되게 구현 (장르 추가)
8. firebase 기반 로그인 페이지 제작 / 이메일 및 구글 계정을 이용하여 가입 및 로그인
9. 홈 화면에서 우측 상단의 프로필 이미지를 누르면 프로필 페이지로 이동
10. 프로필 페이지 내에 프로필 선택과 로그아웃 기능 구현
11. "initializing..."에 css 구현
<!-- 12. MovieModal 및 DetailPage에 Play 버튼 구현: 버튼을 누르면 포스터 대신 Iframe 실행 -->