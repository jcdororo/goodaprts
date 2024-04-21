const ExitButton = () => {
  return (
    <div className="bg-gray-400 h-6 w-6 rounded-full flex items-center justify-center relative text-white">
      <span className="absolute block w-1 h-3 bg-white transform rotate-45"></span>
      <span className="absolute block w-1 h-3 bg-white transform -rotate-45"></span>
    </div>
  );
};

export default ExitButton;
