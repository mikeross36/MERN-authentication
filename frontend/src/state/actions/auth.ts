export enum AuthActionTypes {
  REGISTER_USER_REQUEST = "register_user_request",
  REGISTER_USER_SUCCESS = "register_user_success",
  REGISTER_USER_FAILED = "register_user_failed",
  LOGIN_USER_REQUEST = "login_user_request",
  LOGIN_USER_SUCCESS = "login_user_success",
  LOGIN_USER_FAILED = "login_user_failed",
  LOGOUT_USER_REQUEST = "logout_user_request",
  LOGOUT_USER_SUCCESS = "logout_user_success",
  LOGOUT_USER_FAILED = "logout_user_failed",
  RESET_PASSWORD_REQUEST = "reset_password_request",
  RESET_PASSWORD_SUCCESS = "reset_password_success",
  RESET_PASSWORD_FAILED = "reset_password_failed",
}

interface RegisterUserRequest {
  type: AuthActionTypes.REGISTER_USER_REQUEST;
}

interface RegisterUserSuccess {
  type: AuthActionTypes.REGISTER_USER_SUCCESS;
}

interface RegisterUserFailed {
  type: AuthActionTypes.REGISTER_USER_FAILED;
  payload: string;
}

interface LoginUserRequest {
  type: AuthActionTypes.LOGIN_USER_REQUEST;
}

interface LoginUserSuccess {
  type: AuthActionTypes.LOGIN_USER_SUCCESS;
  payload: object;
}

interface LoginUserFailed {
  type: AuthActionTypes.LOGIN_USER_FAILED;
  payload: string;
}

interface LogoutUserRequest {
  type: AuthActionTypes.LOGOUT_USER_REQUEST;
}

interface LogoutUserSuccess {
  type: AuthActionTypes.LOGOUT_USER_SUCCESS;
}

interface LogoutUserFailed {
  type: AuthActionTypes.LOGOUT_USER_FAILED;
  payload: string;
}

interface ResetPasswordRequest {
  type: AuthActionTypes.RESET_PASSWORD_REQUEST;
}

interface ResetPasswordSuccess {
  type: AuthActionTypes.RESET_PASSWORD_SUCCESS;
}

interface ResetPasswordFailed {
  type: AuthActionTypes.RESET_PASSWORD_FAILED;
  payload: string;
}

export type AuthActionType =
  | RegisterUserRequest
  | RegisterUserSuccess
  | RegisterUserFailed
  | LoginUserRequest
  | LoginUserSuccess
  | LoginUserFailed
  | LogoutUserRequest
  | LogoutUserSuccess
  | LogoutUserFailed
  | ResetPasswordRequest
  | ResetPasswordSuccess
  | ResetPasswordFailed;
