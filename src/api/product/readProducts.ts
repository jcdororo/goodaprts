import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

export const readProducts = async () => {
  const productInfos: DocumentData[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "Product"));
    querySnapshot.forEach((doc) => {
      productInfos.push(doc.data());
    });
    console.log("productInfos", productInfos);
    return productInfos;
  } catch (error) {
    console.log(error);
  }
};
