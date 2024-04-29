import { ChangeEvent, MouseEvent, FormEvent, useState, useRef, useEffect } from "react";
import Options from "../../../components/seller/Options";
import ExitButton from "../../../components/buttons/ExitButton";
import { v4 as uuidv4 } from "uuid";
import { ProductOptions, ProductWithOptions } from "../../../types/product";
import { createProduct } from "../../../api/product/createProduct";
import { userData } from "../../../zustand/store";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { uploadImgToFirestorage } from "../../../api/product/uploadImgToFirestorage";
import UploadImages from "../../../components/seller/UploadImages";
import { readProductDetail } from "../../../api/product/readProductDetail";

const ProductEdit = () => {
  const { sellerId, productId } = useParams();
  console.log(sellerId, productId);
  const [majorCategory, setMajorCategory] = useState("");
  const [middleCategory, setMiddleCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  // const [productImage, setproductImage] = useState([]);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<ProductOptions[]>([]);
  const [representativePrice, setRepresentativePrice] = useState<number>(0);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState<string[]>([]);
  const { user } = userData();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/signin");
      return;
    }
  });

  useEffect(() => {
    (async () => {
      const productInfos = (await readProductDetail(productId!)) as ProductWithOptions;
      console.log("tempasdasdasd", productInfos);
      setMajorCategory(productInfos.majorCategory);
      setMiddleCategory(productInfos.middleCategory);
      setProductName(productInfos.productName);
      // setProductDescription()
      setImgPreview(productInfos.productImage);
      setRepresentativePrice(productInfos.representativePrice);

      setOptions(productInfos.options);
    })();
  }, [sellerId, productId]);

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
    if (Number(e.currentTarget.value) == 0) {
      return;
    }
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
    // 이미지파일 업로드
    const productImageURLs = [];
    for (const file of imgFiles) {
      const url = await uploadImgToFirestorage(file, file.name);
      productImageURLs.push(url);
    }

    const tempProduct = {
      id: "",
      majorCategory,
      middleCategory,
      productImage: productImageURLs,
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
      alert("저장 실패" + isCreated);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const previewUrl = URL.createObjectURL(files[0]);
      setImgPreview([...imgPreview, previewUrl]);
      setImgFiles([...imgFiles, files[0]]);
    }
  };

  const handleRemoveImgPreview = (_e: MouseEvent<HTMLDivElement>, idx: number) => {
    setImgPreview(imgPreview.filter((_x, i) => i !== idx));
    setImgFiles(imgFiles.filter((_x, i) => i !== idx));
  };

  const handleImgRefClick = () => {
    uploadRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="w-[1100px]  bg-cyan-100 mx-[auto]">
      <UploadImages imgPreview={imgPreview} handleRemoveImgPreview={handleRemoveImgPreview} />
      <div className="w-[430px] h-[510px] bg-cyan-300" onClick={handleImgRefClick}>
        업로드하기
      </div>
      <input type="file" accept=".jpg, .jpeg, .png" ref={uploadRef} className="hidden" onChange={handleInputChange} />

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
          <option>0</option>
          {options.map((x, _i) => (
            <option key={x.id}>{x.price ? x.price : ""}</option>
          ))}
        </select>
      </div>
      <button type="submit">저장하기</button>
    </form>
  );
};

export default ProductEdit;

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
