import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signin from "./pages/sign/Signin.tsx";

import Test from "./test/Test.tsx";
import Layout from "./components/common/Layout.tsx";
import Products from "./pages/Products.tsx";
import Edit from "./pages/seller/Edit.tsx";
import ProductDetail from "./components/products/ProductDetail.tsx";
import Seller from "./pages/seller/Seller.tsx";
import ProductEdit from "./pages/seller/productId/ProductEdit.tsx";
import Cart from "./pages/cart/CartSection.tsx";
import Signup from "./pages/sign/Signup.tsx";

const router = createBrowserRouter([
  {
    path: "/", // 메인페이지
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/products", // 상품검색페이지
    element: (
      <Layout>
        <Products />
      </Layout>
    ),
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
    path: "/cart/:buyerId", // 장바구니
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
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
    path: "/products/:productId", // 상품 상세 페이지
    element: (
      <Layout>
        <ProductDetail />
      </Layout>
    ),
  },
  {
    path: "/seller/edit", // 판매자 물건등록, 수정페이지
    element: (
      <Layout>
        <Edit />
      </Layout>
    ),
  },
  {
    path: "/seller/:sellerId", // 판매자 페이지
    element: (
      <Layout>
        <Seller />
      </Layout>
    ),
  },
  {
    path: "/seller/:sellerId/:productId", // 판매자 페이지
    element: (
      <Layout>
        <ProductEdit />
      </Layout>
    ),
  },
  {
    path: "/test", // 테스트페이지
    element: <Test />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
