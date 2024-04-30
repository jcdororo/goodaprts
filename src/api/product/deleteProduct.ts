import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";

export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, "Product", productId);
    const deleteResponse = await deleteDoc(productRef);
    console.log("deleteResponse", deleteResponse);
  } catch (error) {
    console.log(error);
  }
};
