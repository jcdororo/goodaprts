import { ChangeEvent, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { ProductOptions } from "../../types/product";

interface Props {
  productDetail: DocumentData | undefined;
  handleSelectOption: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleOrderQuantity: any;
}

const SelectedProductOptions = ({ productDetail, handleSelectOption, handleOrderQuantity }: Props) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <>
      <select onChange={handleSelectOption} className="font-bold text-[16px] w-[100%]  h-[34px] my-[2px] bg-gray-200">
        <option>옵션선택</option>
        {productDetail?.options.map((x: ProductOptions, i: number) => (
          <option key={x.optionName}>{x.optionName}</option>
        ))}
      </select>
    </>
  );
};

export default SelectedProductOptions;
