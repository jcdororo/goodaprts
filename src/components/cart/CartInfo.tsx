import { Cart } from "../../types/cart";

interface Props {
  cartInfo: Cart;
  index: number;
}

const CartInfo = ({ cartInfo, index }: Props) => {
  console.log("cartInfoasdasdasd", cartInfo);
  return <div></div>;
};

export default CartInfo;
