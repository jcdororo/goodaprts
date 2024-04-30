import { collection, deleteDoc, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../../services/firebase";

export const deleteProductOption = async (optionName) => {
  const collectionRef = collection(db, "ProductOptions");
  const q = query(collectionRef, where("optionName", "==", optionName));

  try {
    const querySnapshot = await getDocs(q);
    const promises = [];

    querySnapshot.forEach((d) => {
      const docRef = doc(db, "ProductOptions", d.id);
      promises.push(deleteDoc(docRef)); // 각 문서를 삭제하기 위한 Promise를 배열에 추가
    });

    await Promise.all(promises); // 모든 삭제 요청이 완료될 때까지 대기
    console.log("All documents with optionName '" + optionName + "' have been deleted.");
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
};
