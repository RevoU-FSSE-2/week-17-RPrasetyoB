import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useAuthChecker = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie;
    const extractedToken = cookies
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("accessToken"));

    if (!extractedToken) {
      Swal.fire("warning", "Unauthorized");
      navigate("/login");
      setToken(null);
    } else {
      const splitCookie = extractedToken.split("=");
      const actualToken = splitCookie.length === 2 ? splitCookie[1] : "";
      setToken(actualToken);
    }
  }, [navigate]);

  return token;
};

export default useAuthChecker;
