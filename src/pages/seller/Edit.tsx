import { ChangeEvent, FormEvent, useState } from "react";
import Options from "../../components/seller/Options";
const Edit = () => {
  const [majorCategory, setMajorCategory] = useState("");
  const [middleCategory, setMiddleCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [options, setOptions] = useState<[][]>([[]]);

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
    setOptions([...options, []]);
    console.log(options);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMIT !");
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
      {options.map((x, i) => (
        <Options key={i} index={i} options={options} setOptions={setOptions} />
      ))}
      <div onClick={handleAddOption}>옵션추가하기 +</div>
      <div>
        상품설명 : <input value={productDescription} onChange={handleProductDescriptionChange} />
      </div>
      <button type="submit">저장하기</button>
    </form>
  );
};

export default Edit;
