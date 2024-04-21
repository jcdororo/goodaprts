import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signin from "./components/sign/Signin.tsx";
import Signup from "./components/sign/Signup.tsx";

const router = createBrowserRouter([
  {
    path: "/", // 메인페이지
    element: <App />,
  },
  {
    path: "/signin", // 로그인
    element: <Signin />,
  },
  {
    path: "/signup", // 회원가입
    element: <Signup />,
  },
  {
    path: "/", // 비밀번호 찾기
    element: "",
  },
  {
    path: "/", // 장바구니
    element: "",
  },
  {
    path: "/", // 주문내역
    element: "",
  },
  {
    path: "/", // 결제하기
    element: "",
  },
  {
    path: "/", // 주문내역 상세
    element: "",
  },
  {
    path: "/", // 배송 주소 관리
    element: "",
  },
  {
    path: "/", // 상품 상세 페이지
    element: "",
  },
  {
    path: "/", // 판매자 물건등록, 수정페이지
    element: "",
  },
  {
    path: "/", // 판매자 페이지
    element: "",
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
