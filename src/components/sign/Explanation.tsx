interface props {
  text: String;
}
const Explanation = ({ text }: props) => {
  return <div className="mt-[50px] mb-[50px] font-bold text-3xl">{text}</div>;
};

export default Explanation;
