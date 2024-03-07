import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../utils/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const devApiUrl = import.meta.env.VITE_DEV_API_URL;

const VerifyAccount = () => {
  const { userId, verificationCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const { data } = await apiClient.post(
          `${devApiUrl}/api/v1/users/verify/${userId}/${verificationCode}`
        );
        if (data.status === "success") {
          navigate("/");
          toast.success(data.message);
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    };
    verifyAccount();
  }, [userId, verificationCode, navigate]);

  return <></>;
};

export default VerifyAccount;
