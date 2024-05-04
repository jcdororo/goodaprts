import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Cart } from "../../types/cart";

export const readCart = async (buyerId: string) => {
  const cartInfos = [] as Cart[];
  try {
    const cartRef = collection(db, "Cart");
    const optionsQuery = query(cartRef, where("buyerId", "==", buyerId));
    const querySnapshot = await getDocs(optionsQuery);
    querySnapshot.forEach((doc) => {
      cartInfos.push({ ...doc.data() } as Cart);
    });
    return cartInfos;
  } catch (error) {
    console.log(error);
  }
};
