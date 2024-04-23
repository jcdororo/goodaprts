import { Product, ProductOptions } from "../../types/product";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebase";

export const createProduct = async (product: Product, productOptions: ProductOptions[]) => {
  try {
    const productCollectionRef = collection(db, "Product");
    const productOptionCollectionRef = collection(db, "ProductOptions");

    const productResponse = await addDoc(productCollectionRef, product);
    for (const property in productOptions) {
      const productOptionObject = productOptions[property];
      productOptionObject["id"] = productResponse.id;
      const productOptionResponse = await addDoc(productOptionCollectionRef, productOptionObject);
    }
    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
};
