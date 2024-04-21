import ConfirmButton from "../buttons/ConfirmButton";
import Logo from "../logo/Logo";
import Explanation from "./Explanation";
import InputInfo from "./InputInfo";
import NavigateFindPassword from "./NavigateFindPassword";
import GoogleIcon from "../../../public/icon/googleIcon.png";
import { useState, useEffect } from "react";
import { isValidateEmail } from "../../utils/isValidateEmail";
import InputPassword from "./InputPassword";
import SubmitButton from "../buttons/SubmitButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const navigate = useNavigate();
  const explaneText = "good parts 계정으로 로그인 해주세요";

  // 이메일 유효성 검사
  useEffect(() => {
    setIsValidEmail(isValidateEmail(email));
  }, [email]);

  const handleStep = () => {};
  const handleKeydownStep = () => {};

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인성공");
      navigate("/");
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[850px] h-[800px] py-[30px] px-[140px] my-[-10vh] rounded-lg border">
      <form onSubmit={handleLoginSubmit}>
        <Logo />

        <Explanation text={explaneText} />
        <InputInfo title="이메일" stateObject={email} setStateObject={setEmail} onKeyDown={handleKeydownStep} placeholder="your@email.com" />
        {isValidEmail ? <div className="text-blue-400 font-bold">유효한 이메일입니다! </div> : <div className="text-red-400 font-bold">유효하지 않은 이메일입니다.</div>}
        <div className="mt-[20px]">
          <InputPassword title="비밀번호" stateObject={password} setStateObject={setPassword} onKeyDown={handleKeydownStep} />
        </div>

        <div className="absolute w-[570px] bottom-4">
          <SubmitButton text="로그인" />
          <NavigateFindPassword />
          <div className="border-b-2 border-gray-300 border-solid " />
          <div className="flex justify-center mt-[20px]">
            <img src={GoogleIcon} alt="google" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
