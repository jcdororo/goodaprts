interface props {
  text: string;
  onClick: () => void;
}

const ConfirmButton = ({ text, onClick }: props) => {
  return (
    <div onClick={onClick} className="bg-[#3CECB7] text-white h-[60px] flex justify-center items-center text-xl font-bold rounded-lg cursor-pointer">
      {text}
    </div>
  );
};

export default ConfirmButton;
