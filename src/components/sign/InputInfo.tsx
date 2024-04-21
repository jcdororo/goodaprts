import { Dispatch, SetStateAction } from "react";
import ExitButton from "../buttons/ExitButton";

interface props {
  title: string;
  stateObject: any;
  setStateObject: Dispatch<SetStateAction<string>>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputInfo = ({ title, stateObject, setStateObject, onKeyDown, placeholder }: props) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateObject(e.target.value);
  };

  const handleExitButton = () => {
    setStateObject("");
  };

  return (
    <div>
      <div className="text-gray-500 mb-[5px] text-xl">{title}</div>
      <div className="relative border-b border-black border-solid ">
        <input onKeyDown={onKeyDown} placeholder={placeholder} className="text-gray-500 w-[100%] text-xl py-[8px]" value={stateObject} onChange={handleTextChange} />
        <div className="absolute right-2 top-[25%]" onClick={handleExitButton}>
          <ExitButton />
        </div>
      </div>
    </div>
  );
};

export default InputInfo;
