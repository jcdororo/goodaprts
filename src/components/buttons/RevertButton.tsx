interface props {
  text: string;
  onClick: () => void;
}
const RevertButton = ({ text, onClick }: props) => {
  return (
    <div onClick={onClick} className=" text-gray-400 underline h-[60px] flex justify-center items-center text-xl font-bold rounded-lg cursor-pointer">
      {text}
    </div>
  );
};

export default RevertButton;
