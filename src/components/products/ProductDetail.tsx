import { useEffect, MouseEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { readProductDetail } from "../../api/product/readProductDetail";
import ProductOptions from "./ProductInfos";
import ProductDescription from "./ProductDescription";
import { DocumentData } from "firebase/firestore";

const ProductDetail = () => {
  const { productId } = useParams<string>();
  const [productDetail, setProductDetail] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    if (productId) {
      (async () => {
        const detail = await readProductDetail(productId);
        setProductDetail(detail);
      })();
    }
  }, []);

  const handleBuyProductSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SubMit !!");
  };

  return (
    <section className="max-w-[1100px] mx-[auto]">
      <form onSubmit={handleBuyProductSubmit}>
        {/* 위쪽 컴포넌트 */}
        <ProductOptions productDetail={productDetail} />
        {/* 상품설명 컴포넌트 */}
        <ProductDescription />
      </form>
    </section>
  );
};

export default ProductDetail;
