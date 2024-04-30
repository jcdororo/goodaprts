import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../services/firebase";

export const deleteStorageFile = async (fileName: string) => {
  const imageRef = ref(storage, `images/${fileName}`);
  try {
    await deleteObject(imageRef); // await 사용하여 비동기적으로 파일 삭제
  } catch (error) {
    console.log(error); // 에러 로깅
  }
};
