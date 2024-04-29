import React, { MouseEvent } from "react";
import ExitButton from "../buttons/ExitButton";

interface Props {
  imgPreview: string[];
  handleRemoveImgPreview: (_e: MouseEvent<HTMLDivElement>, idx: number) => void;
}

const UploadImages = ({ imgPreview, handleRemoveImgPreview }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {imgPreview.map((x, i) => (
        <div key={x} className="relative">
          <img src={x} alt="imgPreview" className="w-[430px] h-[510px] bg-cyan-300" />
          <div className="absolute right-0 top-0" onClick={(e) => handleRemoveImgPreview(e, i)}>
            <ExitButton />
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(UploadImages);
