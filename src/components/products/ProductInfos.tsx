import { DocumentData } from "firebase/firestore";
import ConfirmButton from "../buttons/ConfirmButton";
import SubmitButton from "../buttons/SubmitButton";
import { useState, ChangeEvent, useEffect, MouseEvent } from "react";
import SelectedProductOptions from "./SelectedProductOptions";
import OptionHandle from "./OptionHandle";
import { v4 as uuidv4 } from "uuid";
import { ProductOptions } from "../../types/product";

interface Props {
  productDetail: DocumentData | undefined;
}

interface SelectedOption extends ProductOptions {
  orderQuantity?: number;
}

const ProductInfos = ({ productDetail }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  console.log("productDetail", productDetail);

  useEffect(() => {
    let total = 0;
    for (const selectedOption of selectedOptions) {
      if (selectedOption.orderQuantity) {
        total += selectedOption.price * selectedOption.orderQuantity;
      }
    }
    setTotalPrice(total);
  }, [selectedOptions]);

  const handleSelectOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const optionName = e.currentTarget.value;
    if (optionName == "옵션선택") {
      return;
    }
    const selectedOption = productDetail?.options.find((option: { optionName: string }) => option.optionName === optionName);

    if (!selectedOptions.find((option) => option.optionName === optionName)) {
      const temp = { ...selectedOption, orderQuantity: 0 };
      setSelectedOptions([...selectedOptions, temp]);
    }
  };

  const handleSelectCancelOption = (e: MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedOptions([...selectedOptions.filter((_, i) => i !== index)]);
  };
  const handleOrderQuantity = (temp: SelectedOption, index: number) => {
    setSelectedOptions([...selectedOptions.slice(0, index), temp, ...selectedOptions.slice(index + 1)]);
  };

  const handleAddCart = () => {};

  return (
    <div className="flex h-[650px] mt-[20px]">
      <div className="w-[40%] h-[80%] bg-slate-400 p-[5px]">
        <img src={productDetail?.productImage[0]} className="bg-yellow-500 w-full h-full" alt="img" />
      </div>

      <div className="w-[60%] h-[80%] bg-red-400 px-[70px] pt-[50px]">
        <div className="text-[18px]">{productDetail?.productName}</div>
        <div className="font-extrabold text-[18px]">₩{productDetail?.representativePrice}</div>
        <div className="h-[1px] w-[100%] bg-gray-400 mt-[20px] mb-[10px]"></div>

        <div className="px-[6px]">
          {/* <div className="font-bold text-[14px] flex items-center  h-[30px] bg-gray-200">옵션 확인하기</div> */}
          <SelectedProductOptions productDetail={productDetail} handleSelectOption={handleSelectOption} handleOrderQuantity={handleOrderQuantity} />

          {selectedOptions.map((x, i) => (
            <div key={uuidv4()}>
              <OptionHandle option={x} handleOrderQuantity={handleOrderQuantity} handleSelectCancelOption={handleSelectCancelOption} index={i} />
            </div>
          ))}

          <div>
            총 상품금액({selectedOptions.length}개) ₩{totalPrice}
          </div>
        </div>
        <div className="flex">
          <ConfirmButton text="카트 추가" onClick={handleAddCart} reversal={true} />
          <SubmitButton text="바로 구매" />
        </div>
      </div>
    </div>
  );
};

export default ProductInfos;
