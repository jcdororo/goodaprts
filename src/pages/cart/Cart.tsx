import { useEffect, useState } from "react";
import CartInfo from "../../components/cart/CartInfo";
import { useParams } from "react-router-dom";
import { readCart } from "../../api/cart/readCart";
import { Cart } from "../../types/cart";

const CartSection = () => {
  const { buyerId } = useParams();
  const [cartInfo, setCartInfo] = useState<Cart[]>([]);

  useEffect(() => {
    (async () => {
      const readCartInfo = await readCart(buyerId!);
      console.log("readCartInfo", readCartInfo);
      setCartInfo(readCartInfo!);
    })();
  }, [buyerId]);

  console.log(buyerId);

  const handleOptions = () => {};

  return (
    <section className="max-w-[1100px] mx-auto ">
      <div className="mt-[50px] h-[55px] flex items-center px-[30px] font-bold border-b-[2px] border-gray-400 border-solid">전체선택</div>
      {cartInfo.map((x, i) => (
        <div key={x.id}>
          <CartInfo cartInfo={x} index={i} />
        </div>
      ))}
    </section>
  );
};

export default CartSection;
