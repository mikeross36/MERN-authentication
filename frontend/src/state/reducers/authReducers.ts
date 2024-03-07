import { AuthActionType, AuthActionTypes } from "../actions/auth";
import { UserInfoType } from "../../types/UserTypes";

export type AuthStateType = {
  loading: boolean;
  error: string | null;
  userInfo: UserInfoType | undefined;
};

const initialState = {
  loading: false,
  error: null,
  userInfo: undefined,
};

export const registerUserReducer = (
  state: AuthStateType = initialState,
  action: AuthActionType
) => {
  switch (action.type) {
    case AuthActionTypes.REGISTER_USER_REQUEST: {
      return { loading: true, error: null };
    }
    case AuthActionTypes.REGISTER_USER_SUCCESS: {
      return { loading: false, error: null };
    }
    case AuthActionTypes.REGISTER_USER_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const loginUserReducer = (
  state: AuthStateType = initialState,
  action: AuthActionType
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER_REQUEST: {
      return { loading: true, error: null };
    }
    case AuthActionTypes.LOGIN_USER_SUCCESS: {
      return { loading: false, error: null, userInfo: action.payload };
    }
    case AuthActionTypes.LOGIN_USER_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const logoutUserReducer = (
  state: AuthStateType = initialState,
  action: AuthActionType
) => {
  switch (action.type) {
    case AuthActionTypes.LOGOUT_USER_REQUEST: {
      return { loading: true, error: null };
    }
    case AuthActionTypes.LOGOUT_USER_SUCCESS: {
      return { loading: false, error: null };
    }
    case AuthActionTypes.LOGOUT_USER_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const resetPasswordReducer = (
  state: AuthStateType = initialState,
  action: AuthActionType
) => {
  switch (action.type) {
    case AuthActionTypes.RESET_PASSWORD_REQUEST: {
      return { loading: true, error: null };
    }
    case AuthActionTypes.RESET_PASSWORD_SUCCESS: {
      return { loading: false, error: null };
    }
    case AuthActionTypes.RESET_PASSWORD_FAILED: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
