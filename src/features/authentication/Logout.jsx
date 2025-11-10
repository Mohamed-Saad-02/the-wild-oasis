import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon";

function Logout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login", { replace: true });
  };

  return (
    <ButtonIcon onClick={handleLogout}>
       <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
