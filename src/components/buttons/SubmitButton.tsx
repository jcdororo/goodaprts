interface props {
  text: string;
  width?: string;
}

const SubmitButton = ({ text, width = "100%" }: props) => {
  return (
    <button type="submit" className={`bg-[#3CECB7] text-white h-[60px] flex justify-center items-center text-xl font-bold rounded-lg cursor-pointer w-[${width}]`}>
      {text}
    </button>
  );
};

export default SubmitButton;
