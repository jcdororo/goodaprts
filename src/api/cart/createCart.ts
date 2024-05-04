import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Cart } from "../../types/cart";
import { db } from "../../services/firebase";

export const createCart = async (cartInfo: Cart) => {
  // console.log("cartInfo", cartInfo);
  try {
    const cartCollectionRef = collection(db, "Cart");
    const cartResponse = await addDoc(cartCollectionRef, cartInfo);

    const cartIdUpdateRef = doc(db, "Cart", cartResponse.id);
    const cartIdUpdateResponse = await updateDoc(cartIdUpdateRef, {
      id: cartIdUpdateRef.id,
    });
  } catch (error) {
    console.log(error);
  }
};
