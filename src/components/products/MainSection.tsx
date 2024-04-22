import MiddleCategory from "./MiddleCategory";
import ProductList from "./ProductList";

const MainSection = () => {
  return (
    <section>
      {/* 중분류 카테고리 */}
      <MiddleCategory />

      {/* 상품리스트 */}
      <ProductList />
    </section>
  );
};

export default MainSection;
