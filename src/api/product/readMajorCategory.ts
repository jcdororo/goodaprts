import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

export const readMajorCategory = async () => {
  const majorCategories = new Set();
  try {
    const querySnapshot = await getDocs(collection(db, "Product"));
    querySnapshot.forEach((doc) => {
      majorCategories.add(doc.data().majorCategory);
    });
    return [...majorCategories];
  } catch (error) {
    console.log(error);
  }
};
