import { ChangeEvent, useEffect, useRef, useState } from "react";

const Options = ({ uniqueKey, index, handleOptions }: any) => {
  const [optionName, setOptionName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [options, setOptions] = useState({});
  const tempOptions = useRef({});
  useEffect(() => {
    const temp = {
      id: uniqueKey,
      optionName,
      price,
      quantity,
    };
    tempOptions.current = temp;
  }, [optionName, price, quantity]);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOptionName(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      return;
    }
    setPrice(Number(e.target.value));
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      return;
    }
    setQuantity(Number(e.target.value));
  };

  return (
    <div>
      <div>
        옵션 이름 : <input value={optionName} onChange={handleOptionChange} />
      </div>
      <div>
        상품 금액 : <input type="number" value={price} onChange={handlePriceChange} />
      </div>
      <div>
        수량 : <input type="number" value={quantity} onChange={handleQuantityChange} />
      </div>
      <div onClick={(e) => handleOptions(e, index, tempOptions.current)}>확인</div>
    </div>
  );
};

export default Options;
