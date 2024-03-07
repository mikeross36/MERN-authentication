import { AuthActionTypes, AuthActionType } from "../actions/auth";
import { Dispatch } from "redux";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";

export const registerUserAction =
  (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) =>
  async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActionTypes.REGISTER_USER_REQUEST });
    try {
      const { data } = await apiClient.post("/api/v1/users", {
        userName,
        email,
        password,
        confirmPassword,
      });
      dispatch({ type: AuthActionTypes.REGISTER_USER_SUCCESS });
      if (data.status === "success") {
        toast.success(data.message);
        toast.warning("Please check you email on order to verify account!");
      }
      // console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: AuthActionTypes.REGISTER_USER_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const loginUserAction =
  (email: string, password: string) =>
  async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActionTypes.LOGIN_USER_REQUEST });
    try {
      const { data } = await apiClient.post("/api/v1/sessions", {
        email,
        password,
      });
      dispatch({ type: AuthActionTypes.LOGIN_USER_SUCCESS, payload: data });
      if (data.status === "success") {
        toast.success(data.message);
      }
      // console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: AuthActionTypes.LOGIN_USER_FAILED,
          payload: err.message,
        });
        toast.error("Invalid email or password!");
      }
    }
  };

export const logoutUserAction =
  () => async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActionTypes.LOGOUT_USER_REQUEST });
    try {
      const { data } = await apiClient.delete("/api/v1/sessions");
      dispatch({ type: AuthActionTypes.LOGOUT_USER_SUCCESS });
      if (data.status === "success") {
        toast.success("Logged out successfully!");
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: AuthActionTypes.LOGOUT_USER_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };

export const resetPasswordAction =
  (resetToken: string, password: string, confirmPassword: string) =>
  async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActionTypes.RESET_PASSWORD_REQUEST });
    try {
      const { data } = await apiClient.post(
        `api/v1/users/reset-password/${resetToken}`,
        { password, confirmPassword }
      );
      dispatch({ type: AuthActionTypes.RESET_PASSWORD_SUCCESS });
      if (data.status === "success") {
        toast.success("Password successfully reset!");
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: AuthActionTypes.RESET_PASSWORD_FAILED,
          payload: err.message,
        });
        toast.error(err.message);
      }
    }
  };
