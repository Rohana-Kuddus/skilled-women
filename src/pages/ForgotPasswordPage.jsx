import { useState } from "react";
import InputEmail from "../components/InputEmail";
import Confirmation from "../components/Confirmation";

function ForgotPasswordPage() {
  const [nextPage, setNextPage] = useState(false);

  return (
    <div>
      {!nextPage ? <InputEmail setNextPage={() => setNextPage(true)}></InputEmail> : <Confirmation></Confirmation>}
    </div>
  );
}

export default ForgotPasswordPage;