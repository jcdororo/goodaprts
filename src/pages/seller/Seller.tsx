import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readProducts } from "../../api/product/readProducts";
import { Product, ProductWithOptions } from "../../types/product";
import ExitButton from "../../components/buttons/ExitButton";
import { deleteProduct } from "../../api/product/deleteProduct";

const Seller = () => {
  const { sellerId } = useParams<string>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductWithOptions[]>([]);

  useEffect(() => {
    (async function () {
      const readMajorCategories = (await readProducts()) as [];
      setProducts(readMajorCategories);
    })();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/seller/${sellerId}/${productId}`); // 예를 들어 제품 상세 페이지로 네비게이션
  };

  const handleDeleteProduct = (productId: string) => {
    const sureDelete = confirm("정말 상품을 삭제하시겠습니까 ?");

    if (sureDelete) {
      deleteProduct(productId);
      alert("상품이 삭제되었습니다 !");
    }
  };

  return (
    <div>
      <div onClick={() => navigate("/seller/edit")}>상품 등록하기</div>
      <ul className="grid grid-cols-5 gap-4">
        {products
          .filter((v) => v.sellerId === sellerId)
          .map((x: Product, _) => (
            <li key={x.id} className="relative border p-4">
              <div onClick={() => handleProductClick(x.id)}>{x.productName}</div>
              <div className="absolute top-0 right-0" onClick={() => handleDeleteProduct(x.id)}>
                <ExitButton />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Seller;
