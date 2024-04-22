import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState, KeyboardEvent, FormEvent } from "react";
import { auth, db } from "../../services/firebase";
import Logo from "../logo/Logo";
import GoogleIcon from "../../../public/icon/googleIcon.png";
import Explanation from "./Explanation";
import InputInfo from "./InputInfo";
import { isValidateEmail } from "../../utils/isValidateEmail";
import { isValidatePassword } from "../../utils/isValidPassword";
import ConfirmButton from "../buttons/ConfirmButton";
import NavigateFindPassword from "./NavigateFindPassword";
import RevertButton from "../buttons/RevertButton";
import InputPassword from "./InputPassword";
import SubmitButton from "../buttons/SubmitButton";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  password: string;
  email: string;
  isSeller: boolean;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
}

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  // 이메일 유효성 검사
  useEffect(() => {
    setIsValidEmail(isValidateEmail(email));
  }, [email]);

  // 패스워드 유효성 검사
  useEffect(() => {
    setIsValidPassword(isValidatePassword(password));
    setIsValidPasswordConfirm(password != "" && passwordConfirm != "" && password === passwordConfirm);
  }, [password, passwordConfirm]);

  // 마우스로 누를 때
  const handleStep = async () => {
    if (step === 1) {
      // db에 중복된 이메일이 있는지 확인
      const users: User[] = [];
      const q = query(collection(db, "User"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log("doc", doc.data());
        users.push({
          id: doc.id,
          password: doc.data().password,
          email: doc.data().email,
          isSeller: doc.data().isSeller,
          nickname: doc.data().nickname,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
        });
      });
      const isDuplicate = users.filter((x, _) => x.email === email).length === 0;
      console.log(users);

      if (!isDuplicate) {
        alert("중복된 이메일입니다.");
        return;
      }
    }

    if ((step === 1 || step === 2) && isValidEmail) {
      setStep(step + 1);
      return;
    }

    if (step === 3 && isValidPassword && isValidPasswordConfirm) {
      setStep(step + 1);
      return;
    }
  };

  // 키보드 enter키로 누를 때
  const handleKeydownStep = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.type === "keydown" && e.key !== "Enter") {
      return; // 키 이벤트 중 Enter 키가 아니면 무시
    }

    if ((step === 1 || step === 2) && isValidEmail) {
      setStep(step + 1);
      return;
    }
  };

  const handleRevertStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step != 4 || !isValidEmail || !isValidPassword || nickname == "") {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "User", userCredential.user.uid), {
        // id: 0,
        email: email,
        isSeller: false,
        nickname: nickname,
        password: password, // 패스워드를 Firestore에 저장하는 것은 추천하지 않음 (보안 이슈)
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const explaneTextStep1 = "사용하실 이메일을 입력하세요";
  const explaneTextStep2 = "이 이메일은 새로 가입할 수 있는 이메일 입니다. 계속하시겠습니까?";
  const explaneTextStep3 = "비밀번호를 설정해 주세요";
  const explaneTextStep4 = "닉네임을 입력해주세요";

  return (
    <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[850px] h-[800px] py-[30px] px-[140px]  rounded-lg border">
      <form onSubmit={handleSubmit}>
        <Logo />
        {/* 사용하실 이메일은 입력하세요 */}
        {step === 1 && (
          <>
            <Explanation text={explaneTextStep1} />
            <InputInfo title="이메일" stateObject={email} setStateObject={setEmail} onKeyDown={handleKeydownStep} placeholder="your@email.com" />
            {isValidEmail ? <div className="text-blue-400 font-bold">유효한 이메일입니다! </div> : <div className="text-red-400 font-bold">유효하지 않은 이메일입니다.</div>}

            <div className="absolute w-[570px] bottom-4">
              <ConfirmButton text="다음" onClick={handleStep} />
              <NavigateFindPassword />
              <div className="border-b-2 border-gray-300 border-solid " />
              <div className="flex justify-center mt-[20px]">
                <img src={GoogleIcon} alt="google" />
              </div>
            </div>
          </>
        )}
        {/* 이 이메일은 새로 가입할 수 있는 이메일 입니다. 계속하시겠습니까? */}
        {step === 2 && (
          <>
            <div className="text-gray-400 text-xl mt-[30px] mb-[-30px]">{email.toString()}</div>
            <Explanation text={explaneTextStep2} />
            <div className="absolute w-[570px] bottom-4">
              <ConfirmButton text="계속하기" onClick={handleStep} />
              <RevertButton text="이전" onClick={handleRevertStep} />
            </div>
          </>
        )}
        {/* 비밀번호를 설정해 주세요 */}
        {step === 3 && (
          <>
            <Explanation text={explaneTextStep3} />
            <InputPassword title="새로운 비밀번호" stateObject={password} setStateObject={setPassword} onKeyDown={handleKeydownStep} />
            <div className="h-[80px]">
              {isValidPassword ? (
                <div className="text-blue-400 font-bold">유효한 비밀번호입니다! </div>
              ) : (
                <div className="text-red-400 font-bold">
                  <div>최소 8자리 이상</div>
                  <div>영어 대문자, 소문자, 숫자, 특수문자 중 3종류 문자 조합</div>
                </div>
              )}
            </div>
            <InputPassword title="새로운 비밀번호 확인" stateObject={passwordConfirm} setStateObject={setPasswordConfirm} onKeyDown={handleKeydownStep} />
            {isValidPasswordConfirm ? <div className="text-blue-400 font-bold">비밀번호가 일치합니다 </div> : <div className="text-red-400 font-bold">비밀번호가 일치하지 않습니다. 다시 확인해주세요</div>}
            <div className="absolute w-[570px] bottom-4">
              <ConfirmButton text="다음" onClick={handleStep} />
              <RevertButton text="이전" onClick={handleRevertStep} />
            </div>
          </>
        )}
        {/* 닉네임을 입력해주세요 */}
        {step === 4 && (
          <>
            <Explanation text={explaneTextStep4} />
            <div className="text-gray-400 text-xl mt-[-30px] mb-[30px]">나중에 계정 설정에서 변경할 수 있습니다.</div>
            <InputInfo title="닉네임" stateObject={nickname} setStateObject={setNickname} onKeyDown={handleKeydownStep} placeholder="배고픈조개" />
            {/* {isValidEmail ? <div className="text-blue-400 font-bold">유효한 이메일입니다! </div> : <div className="text-red-400 font-bold">유효하지 않은 이메일입니다.</div>} */}

            <div className="absolute w-[570px] bottom-4">
              <SubmitButton text="완료" />
              <RevertButton text="이전" onClick={handleRevertStep} />
            </div>
          </>
        )}
      </form>
      {/* <button>비밀번호 찾기</button> */}
    </div>
  );
};

export default Signup;
