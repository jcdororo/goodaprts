import { Cart } from "../../types/cart";

interface Props {
  cartInfo: Cart;
  index: number;
}

const CartInfo = ({ cartInfo, index, handleOptionQuantityIncrease, handleOptionQuantityDecrease, handleOptionDelete }: Props) => {
  // console.log("cartInfoasdasdasd", cartInfo);
  return (
    <div className="border p-4">
      {cartInfo.productName}
      {cartInfo.selectedOptions.map((x, i) => (
        <div key={x.optionName} className="my-[5px]">
          <div>상품명 : {x.optionName}</div>
          <div>주문 수량 : {x.orderQuantity}</div>
          <div>합산 가격 : {x.price * x.orderQuantity}</div>
          <div onClick={(e) => handleOptionQuantityIncrease(e, index, i)}>추가</div>
          <div onClick={(e) => handleOptionQuantityDecrease(e, index, i)}>감소</div>
        </div>
      ))}
    </div>
  );
};

export default CartInfo;
