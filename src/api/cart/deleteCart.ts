import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";

export const deleteCart = async (cartId: string) => {
  // try {
  //   const cartRef = doc(db, "Cart", cartId);
  //   const deleteResponse = await deleteDoc(cartRef);
  //   // console.log("deleteResponse", deleteResponse);
  // } catch (error) {
  //   console.log(error);
  // }
};
