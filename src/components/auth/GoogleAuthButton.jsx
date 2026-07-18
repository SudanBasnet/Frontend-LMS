import { googleAuthAPI } from "@services/authAPI";
import { fetchUserAction } from "@features/user/userAction";
import { storeAuthTokens } from "@/utils/authSession";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = ({ text = "continue_with", destination = "/users" }) => {
  const buttonRef = useRef(null);
  const pendingRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleCredentialResponse = useCallback(
    async ({ credential } = {}) => {
      if (!credential || pendingRef.current) return;

      pendingRef.current = true;
      setIsPending(true);
      const result = await googleAuthAPI(credential);
      if (result?.status === "success" && storeAuthTokens(result.payload)) {
        await dispatch(fetchUserAction());
        navigate(destination, { replace: true });
        return;
      }
      pendingRef.current = false;
      setIsPending(false);
    },
    [destination, dispatch, navigate],
  );

  useEffect(() => {
    if (!clientId || !buttonRef.current) return undefined;

    let cancelled = false;
    const initializeGoogleButton = () => {
      if (cancelled || !window.google?.accounts?.id || !buttonRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        ux_mode: "popup",
        use_fedcm_for_button: true,
        button_auto_select: false,
      });

      buttonRef.current.replaceChildren();
      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text,
        shape: "rectangular",
        logo_alignment: "left",
        width: Math.min(buttonRef.current.clientWidth || 400, 400),
      });
    };

    const script = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]',
    );

    if (window.google?.accounts?.id) {
      initializeGoogleButton();
    } else {
      script?.addEventListener("load", initializeGoogleButton, { once: true });
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", initializeGoogleButton);
    };
  }, [clientId, handleCredentialResponse, text]);

  if (!clientId) {
    return (
      <Alert variant="warning" className="small mb-0">
        Google sign-in requires <code>VITE_GOOGLE_CLIENT_ID</code>.
      </Alert>
    );
  }

  return (
    <div className="google-auth-button position-relative d-flex justify-content-center">
      <div ref={buttonRef} className={isPending ? "opacity-25" : ""} />
      {isPending && (
        <Spinner
          animation="border"
          size="sm"
          variant="success"
          className="position-absolute top-50 start-50 translate-middle"
          role="status"
        />
      )}
    </div>
  );
};

export default GoogleAuthButton;
