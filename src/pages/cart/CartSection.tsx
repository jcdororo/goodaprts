import { useEffect, useState, MouseEvent } from "react";
import CartInfo from "../../components/cart/CartInfo";
import { useParams } from "react-router-dom";
import { readCart } from "../../api/cart/readCart";
import { Cart } from "../../types/cart";
import { updateCart } from "../../api/cart/updateCart";
import { deleteCart } from "../../api/cart/deleteCart";

const CartSection = () => {
  const { buyerId } = useParams();
  const [cartInfo, setCartInfo] = useState<Cart[]>([]);

  useEffect(() => {
    (async () => {
      const readCartInfo = await readCart(buyerId!);
      // console.log("readCartInfo", readCartInfo);
      setCartInfo(readCartInfo!);
    })();
  }, [buyerId]);

  const handleOptionQuantityIncrease = (_e: MouseEvent<HTMLDivElement>, index: number, i: number) => {
    const updatedCartInfo = [...cartInfo];

    updatedCartInfo[index].selectedOptions[i].orderQuantity += 1;

    setCartInfo(updatedCartInfo);
  };

  const handleOptionQuantityDecrease = (_e: MouseEvent<HTMLDivElement>, index: number, i: number) => {
    const updatedCartInfo = [...cartInfo];

    if (updatedCartInfo[index].selectedOptions[i].orderQuantity - 1 < 1) {
      return;
    }
    updatedCartInfo[index].selectedOptions[i].orderQuantity -= 1;

    setCartInfo(updatedCartInfo);
  };

  const handleOptionDelete = (_e: MouseEvent<HTMLDivElement>, index: number, i: number) => {
    const sureDelete = confirm("장바구니에서 삭제하시겠습니까?");
    if (!sureDelete) {
      return;
    }
    let updatedCartInfo = [...cartInfo];

    updatedCartInfo[index].selectedOptions.splice(i, 1);

    if (updatedCartInfo[index].selectedOptions.length === 0) {
      deleteCart("s");
    }

    if (updatedCartInfo[index].selectedOptions.length > 0) {
      // const sliceOtions = updatedCartInfo[index].selectedOptions.slice(i, 1);
      updateCart(updatedCartInfo[index]);
    }

    if (updatedCartInfo[index].selectedOptions.length === 0) {
      updatedCartInfo = updatedCartInfo.filter((_x, idx) => idx !== index);
    }

    setCartInfo(updatedCartInfo);
  };

  return (
    <section className="max-w-[1100px] mx-auto ">
      <div className="mt-[50px] h-[55px] flex items-center px-[30px] font-bold border-b-[2px] border-gray-400 border-solid">전체선택</div>
      {cartInfo &&
        cartInfo.map(
          (x, i) =>
            cartInfo[i].selectedOptions.length != 0 && (
              <div key={x.id}>
                <CartInfo cartInfo={x} index={i} handleOptionQuantityIncrease={handleOptionQuantityIncrease} handleOptionQuantityDecrease={handleOptionQuantityDecrease} handleOptionDelete={handleOptionDelete} />
              </div>
            )
        )}
      <div>총 상품 ({cartInfo.length})개</div>
      <div>총 가격 {totalPrice(cartInfo)}</div>
    </section>
  );
};

export default CartSection;

function totalPrice(cartInfo: Cart[]) {
  let result = 0;

  for (let i = 0; i < cartInfo.length; i++) {
    for (let j = 0; j < cartInfo[i].selectedOptions.length; j++) {
      result += cartInfo[i].selectedOptions[j].price * cartInfo[i].selectedOptions[j].orderQuantity;
    }
  }

  return result;
}
