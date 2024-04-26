interface props {
  text: string;
  onClick: () => void;
  reversal?: boolean;
  width?: string;
}

const ConfirmButton = ({ text, onClick, reversal = false, width = "auto" }: props) => {
  return (
    <div onClick={onClick} className={`${reversal ? "text-[#3CECB7] bg-white" : "bg-[#3CECB7] text-white"} h-[60px] flex justify-center items-center text-xl font-bold rounded-lg cursor-pointer w-[${width}]`}>
      {text}
    </div>
  );
};

export default ConfirmButton;
