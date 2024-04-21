import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo/main_logo_lg.png";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} className="cursor-pointer">
      <img src={logo} />
    </div>
  );
};

export default Logo;
