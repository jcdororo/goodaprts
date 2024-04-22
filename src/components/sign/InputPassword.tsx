import { Dispatch, SetStateAction, KeyboardEvent, ChangeEvent } from "react";
import ExitButton from "../buttons/ExitButton";

interface props {
  title: string;
  stateObject: any;
  setStateObject: Dispatch<SetStateAction<string>>;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const InputPassword = ({ title, stateObject, setStateObject, onKeyDown }: props) => {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStateObject(e.target.value);
  };

  const handleExitButton = () => {
    setStateObject("");
  };

  return (
    <div>
      <div className="text-gray-500 mb-[5px] text-xl">{title}</div>
      <div className="relative border-b border-black border-solid ">
        <input onKeyDown={onKeyDown} type="password" placeholder="*******" className="text-gray-500 w-[100%] text-xl py-[8px]" value={stateObject} onChange={handleTextChange} />
        <div className="absolute right-2 top-[25%]" onClick={handleExitButton}>
          <ExitButton />
        </div>
      </div>
    </div>
  );
};

export default InputPassword;
