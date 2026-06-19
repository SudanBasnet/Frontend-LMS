import { useEffect, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { activateNewUserAPI } from "../../services/authAPI";

const VerifyUser = () => {
  const [response, setResponse] = useState({});
  const [isPending, setisPending] = useState(true);
  const [searchParams] = useSearchParams();
  const shouldFetchRef = useRef(true);
  const navigate = useNavigate();

  const sessionId = searchParams.get("sessionId");
  const t = searchParams.get("t");
  console.log(sessionId, t);

  useEffect(() => {
    if (sessionId && t && shouldFetchRef.current) {
      (async () => {
        const result = await activateNewUserAPI({ sessionId, t });
        setResponse(result);
        setisPending(false);
      })();
      shouldFetchRef.current = false;
    }
    if (response.status === "success")
      setTimeout(() => {
        navigate("/login");
      }, 3000);
  }, [sessionId, t, response.status, navigate]);

  return (
    <div className="py-5 p-5">
      {isPending && (
        <div className="m-auto text-center" style={{ width: "450px" }}>
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>

          <div>
            Please do not go back or refresh the browser.please wait....
          </div>
        </div>
      )}
      {response?.message && (
        <Alert variant={response.status === "success" ? "success" : "danger"}>
          {response.message}
        </Alert>
      )}
    </div>
  );
};

export default VerifyUser;
