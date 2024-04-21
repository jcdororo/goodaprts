import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./services/firebase";

function App() {
  const [count, setCount] = useState(0);

  const logOut = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };
  return (
    <>
      <h1>메인페이지</h1>
      <button onClick={logOut}>로그아웃</button>
    </>
  );
}

export default App;
