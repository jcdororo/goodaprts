interface props {
  text: string;
}

const SubmitButton = ({ text }: props) => {
  return (
    <button type="submit" className="bg-[#3CECB7] text-white h-[60px] flex justify-center items-center text-xl font-bold rounded-lg cursor-pointer w-full">
      {text}
    </button>
  );
};

export default SubmitButton;
