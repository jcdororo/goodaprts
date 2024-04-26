import { DocumentData, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import { ProductOptions } from "../../types/product";

interface Result {
  id: string;
  majorCategory: string;
  middleCategory: string;
  productImage: string[];
  productName: string;
  sellerId: string | undefined;
  createAt: Date;
  updateAt: Date;
  options?: {}[];
}

export const readProductDetail = async (productId: string) => {
  try {
    const docRef = doc(db, "Product", productId);
    const docSnap = await getDoc(docRef);
    let result = { ...docSnap.data() } as Result;

    const productOptionsRef = collection(db, "ProductOptions");
    const optionsQuery = query(productOptionsRef, where("id", "==", productId));

    const querySnapshot = await getDocs(optionsQuery);
    const options: {}[] | undefined = [];
    querySnapshot.forEach((doc) => {
      console.log("doc data", doc.data());
      options.push({ ...doc.data() });
    });
    result["options"] = options;

    return result;
  } catch (error) {
    console.log(error);
  }
};
