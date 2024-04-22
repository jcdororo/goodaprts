import MainSection from "../components/products/MainSection";
import MajorCategory from "../components/products/MajorCategory";

const Products = () => {
  return (
    <div className="bg-lime-300 w-[1100px] h-8 mx-[auto]">
      <MajorCategory />
      <MainSection />
    </div>
  );
};

export default Products;
