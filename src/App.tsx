import { MouseEvent, useEffect, useState } from "react";
import "./App.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./services/firebase";
import { Link } from "react-router-dom";

function App() {
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        setSigned(true);
      } else {
        setSigned(false);
      }
    });
  }, []);

  const handleSignOut = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut(auth);
  };

  return (
    <>
      <h1>메인페이지</h1>
      {signed ? (
        <button onClick={handleSignOut}>로그아웃</button>
      ) : (
        <>
          <Link to={"/signin"}>로그인</Link>
          <br />
          <Link to={"/signup"}>회원가입</Link>
        </>
      )}
    </>
  );
}

export default App;
