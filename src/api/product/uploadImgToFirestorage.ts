import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";

export const uploadImgToFirestorage = async (file: Blob | ArrayBuffer, fileName: string) => {
  // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
  const imageRef = ref(storage, `images/${fileName}`);
  try {
    await uploadBytes(imageRef, file);
  } catch (error) {
    console.log(error);
  }
  // 파일 URL 가져오기
  const downloadURL = await getDownloadURL(imageRef);

  return downloadURL;
};
