import { useEffect, useState } from "react";
import InputEmail from "../components/InputEmail";
import Confirmation from "../components/Confirmation";
import { useDispatch } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";

function ForgotPasswordPage() {
  const [nextPage, setNextPage] = useState(false);

  // reset footer's text + link
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);
  return (
    <div>
      {!nextPage ? <InputEmail setNextPage={() => setNextPage(true)}></InputEmail> : <Confirmation></Confirmation>}
    </div>
  );
}

export default ForgotPasswordPage;