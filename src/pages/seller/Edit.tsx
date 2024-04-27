import { ChangeEvent, MouseEvent, FormEvent, useState } from "react";
import Options from "../../components/seller/Options";
import ExitButton from "../../components/buttons/ExitButton";
import { v4 as uuidv4 } from "uuid";
import { ProductOptions } from "../../types/product";
import { createProduct } from "../../api/product/createProduct";
import { userData } from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Edit = () => {
  const [majorCategory, setMajorCategory] = useState("");
  const [middleCategory, setMiddleCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setproductImage] = useState([]);
  const [options, setOptions] = useState<ProductOptions[]>([]);
  const [representativePrice, setRepresentativePrice] = useState<number>(0);
  const { user } = userData();
  const navigate = useNavigate();

  console.log("options", options);
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/signin");
      return;
    }
  });

  // [옵션이름, 금액, 수량];
  const handleMajorCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMajorCategory(e.target.value);
  };

  const handleMiddleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMiddleCategory(e.target.value);
  };

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductDescription(e.target.value);
  };

  const handleAddOption = () => {
    const temp = { id: uuidv4(), productId: "", optionName: "", price: 0, quantity: 0 };
    setOptions((prevOptions: ProductOptions[]) => [...prevOptions, temp]);
  };

  const handleExitButton = (_e: MouseEvent<HTMLDivElement>, i: number) => {
    setOptions([...options.filter((_: any, index: number) => index !== i)]);
  };

  const handleOptions = (_e: MouseEvent<HTMLDivElement>, index: number, tempOptions: ProductOptions) => {
    if (!checkInput(tempOptions)) {
      return;
    }
    setOptions([...options.slice(0, index), tempOptions, ...options.slice(index + 1)]);
  };

  const representativePriceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRepresentativePrice(Number(e.currentTarget.value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (options.length == 0) {
      alert("옵션은 1개이상 필수 입니다.");
      return;
    }

    if (representativePrice == 0) {
      alert("대표가격 입력은 필수 입니다.");
      return;
    }

    for (let i = 0; i < options.length; i++) {
      if (!checkInput(options[i])) {
        return;
      }
    }

    const tempProduct = {
      id: "",
      majorCategory,
      middleCategory,
      productImage,
      productName,
      representativePrice,
      sellerId: user.id,
      createAt: new Date(),
      updateAt: new Date(),
    };

    const tempProductOptions = options;
    const isCreated = await createProduct(tempProduct, tempProductOptions);

    if (isCreated) {
      alert("저장 성공");
    } else {
      alert("저장 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[1100px]  bg-cyan-100 mx-[auto]">
      <div className="w-[200px] h-[200px] bg-cyan-300">사진업로드</div>
      <div>
        대분류 : <input value={majorCategory} onChange={handleMajorCategoryChange} />
      </div>
      <div>
        중분류 : <input value={middleCategory} onChange={handleMiddleCategoryChange} />
      </div>
      <div>
        상품이름 : <input value={productName} onChange={handleProductNameChange} />
      </div>
      {options.map((option: ProductOptions, i: number) => (
        <div key={option.id}>
          <Options uniqueKey={option.id} index={i} handleOptions={handleOptions} />

          <div onClick={(e) => handleExitButton(e, i)}>
            <ExitButton />
          </div>
        </div>
      ))}
      <div onClick={handleAddOption}>옵션추가하기 +</div>
      <div>
        상품설명 : <input value={productDescription} onChange={handleProductDescriptionChange} />
      </div>
      <div>
        대표가격 :{" "}
        <select className="w-[100px]" onChange={representativePriceChange}>
          {options.map((x, i) => (
            <option key={x.id}>{x.price ? x.price : ""}</option>
          ))}
        </select>
      </div>
      <button type="submit">저장하기</button>
    </form>
  );
};

export default Edit;

function checkInput(obj: ProductOptions) {
  if (!obj.optionName) {
    alert("옵션 이름을 입력하세요");
    return false;
  }

  if (!obj.price) {
    alert("상품 가격을 입력하세요");
    return false;
  }

  if (!obj.quantity) {
    alert("상품 수량을 입력하세요");
    return false;
  }

  return true;
}
