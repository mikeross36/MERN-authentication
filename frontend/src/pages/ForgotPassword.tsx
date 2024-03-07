import { useState } from "react";
import { apiClient } from "../utils/apiClient";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post("/api/v1/users/forgot-password", {
        email,
      });
      if (data.status === "success") {
        toast.success(data.message);
      }
      setEmail("");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h3>Enter email</h3>
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
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default ForgotPassword;
