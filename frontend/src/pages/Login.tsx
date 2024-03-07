import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { loginUserAction } from "../state/action-creators/authActions";
import { AuthActionType } from "../state/actions/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserAction(email, password) as unknown as AuthActionType);
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLoginUser}>
      <h3>Login</h3>
      <div className="form__element">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />
      </div>
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
      <Link to="/forgot-password" style={{ padding: "1rem 0" }}>
        Forgot your password?{"   "}
        <span style={{ textDecoration: "underline" }}>forgot password</span>
      </Link>
      <button type="submit">SUBMIT</button>
      <Link to="/register" style={{ padding: "1rem 0" }}>
        Do not have an account?{"   "}
        <span style={{ textDecoration: "underline" }}>register</span>
      </Link>
    </form>
  );
};

export default Login;
