// export default {} 기본 내보내기
export default {
  // module
  namespaced: true,
  // data
    // statd를 함수로 만드는 이유 : 객체 데이터는 참조형 데이터이다. 
    // 그래서 "데이터의 불변성"을 유지시키기 위해서는 함수로 반환해 줘야 state 송성에서 사용되는 데이터들이 고유해 진다.
  state: () => ({
    name : 'SRLEE',
    email : 'sharon329@naver.com',
    blog : 'https://heropy.blog',
    phone : '+82-10-1234-5678',
    image: 'https://heropy.blog/css/images/logo.png'
  })
};
