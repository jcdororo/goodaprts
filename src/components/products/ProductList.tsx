import { useEffect, useState } from "react";

import { readProducts } from "../../api/product/readProducts";
import { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const readMajorCategories = (await readProducts()) as [];
      setProducts(readMajorCategories);
    })();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`); // 예를 들어 제품 상세 페이지로 네비게이션
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map((x: Product, _) => (
        <div key={x.id} className="border p-4" onClick={() => handleProductClick(x.id)}>
          {x.productName}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
