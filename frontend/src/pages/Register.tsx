import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { AuthActionType } from "../state/actions/auth";
import { toast } from "react-toastify";
import { registerUserAction } from "../state/action-creators/authActions";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegisterUser = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    }
    dispatch(
      registerUserAction(
        userName,
        email,
        password,
        confirmPassword
      ) as unknown as AuthActionType
    );
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/");
  };

  return (
    <form onSubmit={handleRegisterUser}>
      <h3>Register</h3>
      <div className="form__element">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email..."
          autoComplete="off"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form__element">
        <label htmlFor="userName">User name</label>
        <input
          type="text"
          id="userName"
          placeholder="user name..."
          autoComplete="off"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="form__element">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="password..."
          autoComplete="off"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form__element">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="confirm password..."
          autoComplete="off"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit">submit</button>
      <Link to="/" style={{ padding: "1rem 0" }}>
        Already have an account?{"  "}
        <span style={{ textDecoration: "underline" }}>login</span>
      </Link>
    </form>
  );
};

export default Register;
