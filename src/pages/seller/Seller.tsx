import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readProducts } from "../../api/product/readProducts";
import { Product } from "../../types/product";

const Seller = () => {
  const { sellerId } = useParams<string>();

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const readMajorCategories = (await readProducts()) as [];
      setProducts(readMajorCategories);
    })();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/seller/${sellerId}/${productId}`); // 예를 들어 제품 상세 페이지로 네비게이션
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      <div onClick={() => navigate("/seller/edit")}>상품 등록하기</div>
      {products
        .filter((v) => v.sellerId === sellerId)
        .map((x: Product, _) => (
          <div key={x.id} className="border p-4" onClick={() => handleProductClick(x.id)}>
            {x.productName}
          </div>
        ))}
    </div>
  );
};

export default Seller;
