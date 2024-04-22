import { useEffect, useState, MouseEvent } from "react";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { userData } from "../../zustand/store";

const Header = () => {
  const [signed, setSigned] = useState(false);
  const { user, setUser } = userData();

  const handleSignOut = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut(auth);
    setUser({ id: "", password: "", email: "", isSeller: false, nickname: "", createdAt: new Date(), updatedAt: new Date() });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        (async () => {
          const docRef = doc(db, "User", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = {
              id: user.uid,
              password: docSnap.data().password,
              email: docSnap.data().email,
              isSeller: docSnap.data().isSeller,
              nickname: docSnap.data().nickname,
              createdAt: docSnap.data().createdAt,
              updatedAt: docSnap.data().updatedAt,
            };
            setUser(userData);
          }
        })();

        setSigned(true);
      } else {
        setSigned(false);
      }
    });
  }, []);

  return (
    <div className="relative mx-[auto] w-[1100px] h-[90px] flex items-center bg-orange-100">
      <Logo />
      <button onClick={() => console.log(user)}>zustand</button>
      <div className="absolute bg-fuchsia-200 flex right-0">
        <ul className="flex flex-row gap-3 mr-[30px] text-gray-400">
          <li className="after:absolute after:content-['|'] after:pl-[3px] after:translate-y-[-2px]">카트</li>
          <li className="after:absolute after:content-['|'] after:pl-[3px] after:translate-y-[-2px]">마이페이지</li>
          <li className="after:absolute after:content-['|'] after:pl-[3px] after:translate-y-[-2px]">공지사항</li>
          <li>고객센터</li>
        </ul>
        <ul className="flex flex-row gap-[10px]">
          {signed ? (
            <li>
              <button onClick={handleSignOut}>로그아웃</button>
            </li>
          ) : (
            <>
              <li>
                <Link to={"/signin"}>로그인</Link>
              </li>
              <li>
                <Link to={"/signup"}>회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
