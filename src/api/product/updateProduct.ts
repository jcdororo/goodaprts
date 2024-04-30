import { Product, ProductOptions } from "../../types/product";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../services/firebase";

export const updateProduct = async (productId: string, product: Product, productOptions: ProductOptions[]) => {
  try {
    // const productOptionCollectionRef = collection(db, "ProductOptions");

    const productIdUpdateRef = doc(db, "Product", productId);
    const productOptionCollectionRef = collection(db, "ProductOptions");
    const productIdUpdateResponse = await updateDoc(productIdUpdateRef, product);

    console.log("productOptions", productOptions);

    for (const property in productOptions) {
      const productOptionObject = productOptions[property];
      const productOptionsRef = collection(db, "ProductOptions");
      console.log("productOptionObject.optionName", productOptionObject.optionName);
      const q = query(productOptionsRef, where("optionName", "==", productOptionObject.optionName));
      const querySnapshot = await getDocs(q);
      console.log("querySnapshot.empty", querySnapshot.empty);

      if (querySnapshot.empty) {
        // 비어있으면 add
        const productOptionObject = productOptions[property];
        productOptionObject["id"] = productId;
        console.log("비어있으면 add", productOptions[property]);
        const productOptionResponse = await addDoc(productOptionCollectionRef, productOptionObject);
      } else {
        // 있으면 update
      }
    }

    // if (querySnapshot.empty) {
    //     const newOption = {
    //         id: "iamhpeNRFVomF5rX5lPs",
    //         optionName: "테스트테스트",
    //         price: 123123,
    //         quantity: 7
    //     };
    //     await addDoc(productOptionsRef, newOption);
    // } else {
    //     querySnapshot.forEach(async (document) => {
    //         const optionDocRef = doc(db, "ProductOptions", document.id);
    //         await updateDoc(optionDocRef, { quantity: 3 });
    //     });
    // }

    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
};
