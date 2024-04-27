import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/logo/Logo";
import { isValidateEmail } from "../utils/isValidateEmail";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import Explanation from "../components/sign/Explanation";
import InputInfo from "../components/sign/InputInfo";
import InputPassword from "../components/sign/InputPassword";
import SubmitButton from "../components/buttons/SubmitButton";
import NavigateFindPassword from "../components/sign/NavigateFindPassword";
import GoogleIcon from "../../public/icon/googleIcon.png";

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

  const handleKeydownStep = () => {};

  const handleSigninSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인성공");
      navigate("/");
    } catch (error) {
      alert("로그인 실패");
      console.log("로그인에러", error);
    }
  };
  return (
    <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[850px] h-[800px] py-[30px] px-[140px] rounded-lg border">
      <form onSubmit={handleSigninSubmit}>
        <Logo isLargeSize={true} />

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
