import {
  AUTH_START,
  AUTH_FAILED,
  USER_LOADED,
  USER_LOGGEDOUT,
  USER_LOADING,
  LOGIN_SUCCESS,
  FIRST_LOGIN,
  USER_FAIL,
  USER_CREATE,
  USER_SUBSCRIPTION,
  AUTH_UPDATED,
  AUTH_DEACTIVATED,
  AUTH_ACTIVATED,
  NAME_UPDATE,
  EMAIL_VERIFY,
  EMAIL_UPDATE,
  DELETE_ACCOUNT,
  REFRESH_TOKEN,
  PASSWORD_UPDATE,
  GET_CURRENT_NAME
} from "@redux/actions/Types";
import AuthService from "@services/auth.service";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

const initialState = {
  token: null,
  isLoading: null,
  isAuthenticated: false,
  isUserCreated: false,
  subscription: { is_active: false },
  user: {
    username: "",
    first_name: "",
    last_name: "",
    email: " ",
    is_email_verified: false,
    is_first_time_log_in: true,
    is_update: false,
    is_activated: false,
    isIndividual: null,
    Name: "",
    Organisation: "",
  },
};

let AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_DEACTIVATED:
      return {
        ...state,
        user: {
          ...state.user,
          is_activated: false,
        },
      };
    case AUTH_ACTIVATED:
      return {
        ...state,
      };
    case AUTH_DEACTIVATED:
      return {
        ...state,
        user: {
          ...state.user,
          is_activated: false,
        },
      };
    case AUTH_UPDATED:
      return {
        ...state,
        user: {
          ...state.user,
          is_update: true,
        },
      };
    case USER_CREATE:
      cookieCutter.set("token", payload.Token);
      return {
        ...state,
        isUserCreated: false,
        isLoading: false,
        isAuthenticated: true,
        user: payload.user,
        token: payload.Token,
      };
    case USER_LOGGEDOUT:
      return {
        ...state,
        token: localStorage.removeItem("token"),
        isLoading: false,
        isAuthenticated: false,
        isUserCreated: false,
        subscription: { is_active: false },
        user: {},
      };
    case USER_SUBSCRIPTION:
      return {
        ...state,
        subscription: payload,
      };
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: payload,
      };
    case USER_LOADING:
    case AUTH_START:
      // console.log("token created",cookieCutter.get("token"))
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case USER_FAIL:
    case AUTH_FAILED:
      return {
        ...state,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        isUserCreated: false,
        subscription: { is_active: false },
      };
    case LOGIN_SUCCESS:
      cookieCutter.set("token", payload.Token);
      return {
        ...state,
        token: payload.Token,
        isAuthenticated: true,
        isLoading: false,
        isUserCreated: true,
        user: payload.user,
      };
    case FIRST_LOGIN: {
      return {
        ...state,
        user: { ...state.user, is_first_time_log_in: false },
      };
    }
    case NAME_UPDATE: {
      let newState = {
        ...state,
        user: { ...state.user, Name: payload.name, Organisation: payload.name },
      };
      localStorage.setItem("user", JSON.stringify(newState.user));
      return newState;
    }
    case EMAIL_VERIFY: {
      let newState = {
        ...state,
        user: { ...state.user, is_email_verified: true },
      };
      return newState;
    }
    case EMAIL_UPDATE: {
      console.log(payload.email)
      // let newState = {
      //   ...state,
      //   user: { ...state.user, email: payload.email },
      // };
      // newState = {
      //   ...state,
      //   token: localStorage.removeItem("token"),
      //   isLoading: false,
      //   isAuthenticated: false,
      //   isUserCreated: false,
      //   subscription: { is_active: false },
      //   user: {},
      // };
      // newState = {
      //   ...state,
      //   token: null,
      //   isLoading: null,
      //   isAuthenticated: false,
      //   isUserCreated: null,
      //   subscription: { is_active: false },
      //   user: {},
      // };
      let newState = {
        ...state,
        token: null,
        isLoading: null,
        isAuthenticated: false,
        isUserCreated: null,
        subscription: { is_active: false },
        user: {},
      };
      return newState;
    }
    case DELETE_ACCOUNT:
      return {
        ...state,
        token: null,
        isLoading: null,
        isAuthenticated: false,
        isUserCreated: null,
        subscription: { is_active: false },
        user: {},
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        user: { ...user, accessToken: payload },
      };
    case PASSWORD_UPDATE:
      return {
        ...state,
        token: null,
        isLoading: null,
        isAuthenticated: false,
        isUserCreated: null,
        subscription: { is_active: false },
        user: {},
      }
    case GET_CURRENT_NAME:
      console.log([payload.name, trueName])
      if(trueName !== payload.name)
      return {
        ...state,
        user: {
          ...state.user,
          Name: trueName
        }
      }

    default:
      return state;
  }
};

export default AuthReducer;
