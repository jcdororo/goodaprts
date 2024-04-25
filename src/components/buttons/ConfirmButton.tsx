interface props {
  text: string;
  onClick: () => void;
  reversal?: boolean;
}

const ConfirmButton = ({ text, onClick, reversal = false }: props) => {
  return (
    <div onClick={onClick} className={`${reversal ? "text-[#3CECB7] bg-white" : "bg-[#3CECB7] text-white"} h-[60px] flex justify-center items-center text-xl font-bold rounded-lg cursor-pointer`}>
      {text}
    </div>
  );
};

export default ConfirmButton;
