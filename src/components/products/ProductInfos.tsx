import { DocumentData } from "firebase/firestore";
import ConfirmButton from "../buttons/ConfirmButton";
import SubmitButton from "../buttons/SubmitButton";
import { ProductOptions } from "../../types/product";
import { useState, ChangeEvent } from "react";
import SelectedProductOptions from "./SelectedProductOptions";

interface Props {
  productDetail: DocumentData | undefined;
}

interface SelectedOption extends ProductOptions {
  orderQuantity?: number;
}

const ProductInfos = ({ productDetail }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  const handleSelectOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const optionName = e.currentTarget.value;
    const selectedOption = productDetail?.options.find((option: { optionName: string }) => option.optionName === optionName);

    if (!selectedOptions.find((option) => option.optionName === optionName)) {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
  };

  const handleOrderQuantity = () => {};

  const handleAddCart = () => {};

  console.log(selectedOptions);
  return (
    <div className="flex h-[650px] mt-[20px]">
      <div className="w-[40%] h-[80%] bg-slate-400 p-[5px]">
        <img src={"https://cdn-contents.weverseshop.io/public/shop/68b43823716a52272e25fbc9706d26e7.png?q=95&w=720"} className="bg-yellow-500 w-full h-full" alt="img" />
      </div>
      <div className="w-[60%] h-[80%] bg-red-400">
        <div>{productDetail?.productName}</div>

        <div>옵션 확인하기</div>
        <SelectedProductOptions productDetail={productDetail} handleSelectOption={handleSelectOption} handleOrderQuantity={handleOrderQuantity} />

        {selectedOptions.map((x, i) => (
          <div key={i}>{x.optionName}</div>
        ))}

        <div>총 상품금액(1개) ₩49,000</div>
        <div className="flex">
          <ConfirmButton text="카트 추가" onClick={handleAddCart} reversal={true} />
          <SubmitButton text="바로 구매" />
        </div>
      </div>
    </div>
  );
};

export default ProductInfos;
