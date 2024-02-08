import { useEffect } from "react";
import InputEmail from "../components/InputEmail";
import { useDispatch } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";

function ForgotPasswordPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);
  
  return (
    <div className="text-center mt-12">
      <InputEmail></InputEmail>
    </div>
  );
}

export default ForgotPasswordPage;