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
      <select onChange={handleSelectOption}>
        {productDetail?.options.map((x: ProductOptions, i: number) => (
          <option>{x.optionName}</option>
        ))}
      </select>
    </>
  );
};

export default SelectedProductOptions;
