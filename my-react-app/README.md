### 11 / 13

### 강의 목표

1. 파이어 베이스를 활용해 실제 제품 단계 ( production- ready ) 만드는 방법 공부

2. 배우는 파이어 베이스 기술은

- authentication (인증,입증)

- firestore

- ftorage

- hosting 등

3. 배포까지 해봄

4. 이메일과 비밀번호로 로그인, 깃허브 계정 로그인, 트윗 보내기, 편집 ,삭제, 이미지 첨부, 유저ㅓ의 친구들. 보냈던 트윗등을 profile에서 볼 수 있는 application 만들기

5. 백엔드 코드는 사용하지 않을것

### 파이어 베이스란 무엇인가?

1. 파이어베이스는 백엔드 서버 서비스 or 앱,웹 개발 플랫폼이다.

2. 시간 절약을 위해서 사용하며, 여러가지 서비스가 존재한다.

3. 그 중 우리는 빌드 서비스를 사용한다. (카데고리 중 하나)

- db인 cloud firestore

- Authentication

- Hostion

- cloud Storage

4. cloud의 db언어는 NoSQL이다.

### Install and Set up

1. react install with vite

```bash

npm create vite@latest my-react-app --template react

```

- select a framework : React

- select a variant : TypeScript + SWC

2. npm 패키지 install

```bash

npm i

```

3. 파일 및 폴더 정리

- index.css, app.css, assets, app.tsx 삭제 및 파일 비우기

4. 깃허브 레파지토리에 추가하기 => 추후 내 프로젝트로 만들었을때 하기

5. react-router install

```bash

npm i react-router-dom@6.14.2

```

6. 처음보는 거 styled-reset

```bash

npm i styled-reset
npm i styled-components@6.0.7
npm i @types/styled-components -D

```

7. Routing set up

### 중첩 라우팅

```typescript
// layout.tsx
import { Outlet } from "react-router-dom";

export default funciton Layout() {
  return (
    <>
      <Outlet />
    </>
  )
}

```

```typescript
// App.tsx

import { creatBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    elemenet: <CreateAccount />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
```

- 해당 코드를 만들고 웹 브라우저 렌더시, 웰컴페이지는 Layout + Home 컴포넌트로 되어있고, /profile은 Layout + Profile 컴포넌트로 되어있는것을 확인 할 수 있다.

- component와 routes 폴더를 잘 분리하여 하자! Layout = component이며 Home, profile = routes

8. global styles with style components

```typescript
// App.tsx
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing : border-box;
  }
  body {
    background-color : black;
    color : white;
    font-family : system-ui, ... 생략
  }
`;

function App() {
  <GlobalStyles />;
}
```

- 디폴트 스타일이라고 함

- 어쨰서 layout은 home, profile에만 보여주고, login과 create-account에는 보여주지않는지 생각해보기

9. 파이어베이스 authentication에 필요한 로직 구현

- FireBase authentication이 작동하는 방식은 Firebase SDK와 Firebase server다.

- authentication에서 필요한 쿠키, 토큰 등 모든걸 담당한다.

- 사용자가 우리의 애플리케이션에 들어오면 잠시 도안 firebace SDK는 쿠키와 토큰을 가져와서 서버와 함께 확인한다.

- 사용자의 로그인 여부를 확인해주기 위해서 / => 확인하는 시간을 활용해 체크하는 동안 로딩 화면을 보여주기 (만약 로그인이 되어있다면 해당 디테일을 가져오기 위함)

```typescript
// App.tsx

const [isLoading, setIsLoading] = useState(true);
const init = async () => {
  // wait for firebase
  setIsLoading(false);
};
useEffect(() => {
  init();
}, []);
```

- 로딩이 될 되었을때의 화면을 구성

```typescript
// loading-screen.tsx
import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 24px;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Text>Loading</Text>
    </Wrapper>
  );
}
```

- 해당 코드를 App.tsx에 적용

```typescript
// App.tsx

// <RouterProvider router={rotuer} /> fixed
{
  isLoading ? <LoadingScreen /> : <RouterProvider router={rotuer} />;
}
```

! 테스트를 위한 setTimeout

```typescript
// init 함수를 수정해야 한다

init = async () => {
  setTimeout = (() => setIsLoading(false), 2000);
};

useEffect(() => {
  init();
}, []);
```

10. 파이어 베이스 install

```bash

// 강의에선 npm install firebase@10.1.0
npm install firebase

```

- routes/firebase.tsx 생성

```typescript
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAisrlSh0cwH0A8aNX9mfYX68rxVFsxyCo",
  authDomain: "twiter-clone-5dfaa.firebaseapp.com",
  projectId: "twiter-clone-5dfaa",
  storageBucket: "twiter-clone-5dfaa.firebasestorage.app",
  messagingSenderId: "551295352270",
  appId: "1:551295352270:web:700de21acd48f740daff9f",
  measurementId: "G-P24WEXCYXE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 
```

### 다음에 구현할것들 순서

1. authentication (인증), 계정 생성 페이지

2. 로그인 페이지

3. 로그인 사용자가 보게 될 홈 페이지

4. tweet, 이미지를 업로드 가능

5. profile 페이지

6. edit profile 기능, 거기있는 모든것들을 수정 가능

### 내용 정리 (새로 배운 것들)

- 스타일드 컴포넌트

- 중첩 라우팅

### 11/11

## 인증 과정 만들기

1. setUp

- 파이어 베이스의 기능들은 많아서 필요한 기능들을 직접 선택해줘야 한다. (default는 비활성화)

- https://console.firebase.google.com/

- 먼저 Authentication(인증)을 시작, 로그인 방법에서 이메일/패스워드만 체크 추후 깃허브 추가예정

- 활성화를 했다면, firebase.tsx 파일로 넘어가 추가를 해줘야함 / authentication를 원한다는 코드 작성

```typescript
// firebase.tsx
export const analytics = getAnalytics(app);

// App.tsx

const init = async () => {
  await auth.authStateReady(); // 이외 다양한 기능들이 있음. 비동기 함수이니 await 필수
};
```
2. 어떤 방식으로 createAccount를 설계 했는지?

- 스타일드 컴포넌트를 사용 

- input 태그에 타입=text와 벨류 + 이벤트를 사용해서 값 처리를 했음 

- input 태그에 타입=submit를 넣어서 form 태그가 작동하게 설계

3. firebase와 소통하기 

- createUserWithEmailAndPassword( auth : Auth, email : string, password : string );
  - 비동기 함수라 await 필수
  - Auth는 fireBase안에서 export 하는 값 getAuth(app);
  - 해당 함수가 정상적으로 돌아가면 user credential (사용자 자격 증명) 이된다.
  - 기본적으로 해당 이메일이 생성되었거나, 비밀번호 규격이 맞지 않으면 에러
  - 변수에 return값을 저장했다면 변수.user로 정보 가져올 수 있음.

- try-catch문 이전에 오류 값 1차 걸러내기 (빈값, loading이 true일때)

- 구조
  - 해당 아이디를 만들수 있나(try문) => 에러 => catch문 실행 => finally 실행
  - 성공 => finally 실행

- 프로필 업데이트 
  - 만약 name의 값을 받았다면 프로필 업데이트를 해주자
  - updateProfile(user :User, {displayName : string, photoURL : string}) => user 제외 다른값은 없어도됨

- 로그인
  - 해당 정보 입력에 성공하면 자동으로 로그인이 된다고 한다.
  - useNavigate()로 welcomepage로 이동



