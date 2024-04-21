const NavigateFindPassword = () => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <button onClick={handleButtonClick} className="text-center w-[100%] text-gray-400 text-xl my-[20px] hover:underline">
      비밀번호 찾기
    </button>
  );
};

export default NavigateFindPassword;
