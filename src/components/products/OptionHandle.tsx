import { ChangeEvent, useState } from "react";
import { ProductOptions } from "../../types/product";
import ExitButton from "../buttons/ExitButton";
interface SelectedOption extends ProductOptions {
  orderQuantity?: number;
}
interface Props {
  option: SelectedOption;
  handleOrderQuantity: (temp: SelectedOption, index: number) => void;
  handleSelectCancelOption: any;
  index: number;
}

const OptionHandle = ({ option, handleOrderQuantity, handleSelectCancelOption, index }: Props) => {
  const [counter, setCounter] = useState(option.orderQuantity || 0);

  const handleCounterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = Number(e.target.value);
    if (option.quantity < inputQuantity) {
      return;
    }
    setCounter(inputQuantity);
  };

  const handleIncrease = () => {
    if (option.quantity < counter + 1) {
      return;
    }

    setCounter(counter + 1);
    const temp = { ...option, orderQuantity: counter + 1 };
    handleOrderQuantity(temp, index);
  };

  const handleDecrease = () => {
    if (counter - 1 < 0) {
      return;
    }

    setCounter(counter - 1);
    const temp = { ...option, orderQuantity: counter - 1 };
    handleOrderQuantity(temp, index);
  };
  return (
    <div className="relative">
      <span>{option.optionName}</span>
      <div className="absolute right-0 top-0 flex gap-4">
        <button onClick={handleDecrease}> - </button>
        <input type="number" value={counter} onChange={handleCounterChange} />
        <button onClick={handleIncrease}> + </button>
        <div onClick={(e) => handleSelectCancelOption(e, index)}>
          <ExitButton />
        </div>
      </div>
    </div>
  );
};

export default OptionHandle;
