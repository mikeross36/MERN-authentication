// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useAppDispatch } from "../hooks/useAppDispatch";
// import { resetPasswordAction } from "../state/action-creators/authActions";
// import { AuthActionType } from "../state/actions/auth";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { resetPasswordAction } from "../state/action-creators/authActions";
import { AuthActionType } from "../state/actions/auth";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetToken } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (resetToken) {
      dispatch(
        resetPasswordAction(
          resetToken,
          password,
          confirmPassword
        ) as unknown as AuthActionType
      );
    }
    setPassword("");
    setConfirmPassword("");
    navigate("/");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h3>Reset Password</h3>
      <div className="form__element">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form__element">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="confirm password..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form__input"
        />
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default ResetPassword;
