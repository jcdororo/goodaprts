import { useNavigate } from "react-router-dom";
import logo_lg from "../../../public/logo/main_logo_lg.png";
import logo from "../../../public/logo/main_logo.png";

const Logo = ({ isLargeSize = false }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} className="cursor-pointer">
      <img src={isLargeSize ? logo_lg : logo} />
    </div>
  );
};

export default Logo;
