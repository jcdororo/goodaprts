import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Cart } from "../../types/cart";

export const updateCart = async (cartInfo: Cart) => {
  try {
    const cartRef = doc(db, "Cart", cartInfo.id);
    const updateData = {
      selectedOptions: cartInfo.selectedOptions, // 선택한 옵션 업데이트
    };

    const updateResponse = await updateDoc(cartRef, updateData);
  } catch (error) {
    console.error(error);
  }
};
