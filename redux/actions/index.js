import {
  AUTH_START,
  AUTH_FAILED,
  USER_LOGGEDOUT,
  USER_LOADING,
  LOGIN_SUCCESS,
  USER_CREATE,
  USER_FAIL,
  USER_SUBSCRIPTION,
  EMAIL_VERIFY,
  AUTH_ACTIVATED,
  AUTH_DEACTIVATED,
  NAME_UPDATE,
  EMAIL_UPDATE,
  DELETE_ACCOUNT,
  FETCH_PROFESSION,
  FETCH_MEMBERS,
  FETCH_COUNTRY,
  FETCH_DASHBOARD_TIME_RANGE,
  FETCH_GRAPH_DATA,
  REFRESH_TOKEN,
  FETCH_MOBILE_GRAPH_DATA,
  RESET_STATE,
  GET_CURRENT_NAME,
  FETCH_ANALYZE_RESULT,
} from "./Types";

import { errorToast, successToast } from "@utils/toast";

import AuthService from "@services/auth.service";
import UserService from "@services/user.service";
import DashboardService from "@services/dashboard.service";
import { useRouter } from "next/router";

export const refreshToken = (accessToken) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: accessToken,
  });
};

export const createUser = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  try {
    let user = await AuthService.register(data);
    let theMail = user.user.email;
    console.log(theMail);
    dispatch({
      type: USER_CREATE,
      payload: user,
    });
    successToast("Please check your mail to Login.");
    //route to that verification
    window.location;
    return true;
  } catch (e) {
    dispatch({
      type: USER_FAIL,
    });
    errorToast(e);
    return false;
  }
};

export const authentication = (email, password) => async (dispatch) => {
  dispatch({
    type: AUTH_START,
  });

  try {
    let user = await AuthService.login(email, password);
    if (user) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
      return true;
    }
  } catch (e) {
    dispatch({
      type: AUTH_FAILED,
    });
    errorToast(e);
    return false;
  }
};

export const checkLocalUser =
  (shouldCheck = true) =>
  (dispatch) => {
    if (!shouldCheck) return;
    let { user, subscription, Token } = AuthService.getCurrentUser();
    if (!user) return { user, subscription };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, Token },
    });
    dispatch({
      type: USER_SUBSCRIPTION,
      payload: subscription,
    });

    return { user, subscription };
  };

export const userLogout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: USER_LOGGEDOUT,
  });
  dispatch({
    type: RESET_STATE,
  });
};

export const getSubscription = () => async (dispatch) => {
  try {
    let subscription = await UserService.getSubscription();
    if (subscription) {
      dispatch({
        type: USER_SUBSCRIPTION,
        payload: subscription,
      });
      return true;
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

export const deactivateAccount =
  (password = "") =>
  (dispatch) => {
    UserService.deactivateAccount(password)
      .then((res) => {
        dispatch({
          type: AUTH_DEACTIVATED,
          payload: false,
        });
        toast("Your Account is Deactivated", { type: "info" });
      })
      .catch(errorToast);
  };

export const activateAccount = () => (dispatch) => {
  UserService.deactivateAccount()
    .then((res) => {
      dispatch({
        type: AUTH_ACTIVATED,
        payload: true,
      });
      successToast("Check Your Email to Confirm your Account activation");
    })
    .catch(errorToast);
};

export const nameUpdateAction = (name) => (dispatch) => {
  UserService.updateName(name)
    .then(({ name, message = "Succesfully Updated Name" }) => {
      dispatch({
        type: NAME_UPDATE,
        payload: { name },
      });
      successToast(message);
    })
    .catch(errorToast);
};

export const emailUpdateAction = (email, password) => (dispatch) => {
  UserService.updateEmail(email, password)
    .then(({ email, message }) => {
      dispatch({
        type: EMAIL_UPDATE,
        payload: { email },
      });
      successToast(message);
    })
    .catch(errorToast);
};

export const passwordUpdateAction = (password, newPassword) => {
  UserService.updatePassword(password, newPassword)
    .then((message) => {
      toast(message, { type: "info" });
      AuthService.logout();
      dispatch({
        type: USER_LOGGEDOUT,
      });
      dispatch({
        type: RESET_STATE,
      });
    })
    .catch(errorToast);
};

export const emailVerifyAction = () => (dispatch) => {
  dispatch({
    type: EMAIL_VERIFY,
  });
};

export const deleteAccount = (password) => (dispatch) => {
  const router = useRouter();

  UserService.deleteAccount(password)
    .then((res) => {
      console.log(res);
      console.log("Bobby Charlton");
      dispatch({
        type: USER_LOGGEDOUT,
      });
      dispatch({
        type: DELETE_ACCOUNT,
        payload: {},
      });
      successToast("Your Account is successfully deleted redux actions");
      console.log("I got this");
      router.replace("/signin");
    })
    .catch(errorToast);
};

export const forgetPassword = (email) => (dispatch) => {
  return UserService.forgetPassword(email);
};

export const getProfessions = () => (dispatch) => {
  DashboardService.getProffesions()
    .then((data) =>
      dispatch({
        type: FETCH_PROFESSION,
        payload: data,
      })
    )
    .catch(errorToast);
};

export const getCountries = () => (dispatch) => {
  DashboardService.getCountries()
    .then((countries) => {
      dispatch({
        type: FETCH_COUNTRY,
        payload: {
          countries,
        },
      });
    })
    .catch(errorToast);
};

export const getMembersLengthInOrganisation = () => (dispatch) => {
  DashboardService.getOrganisationSizes()
    .then((members) =>
      dispatch({
        type: FETCH_MEMBERS,
        payload: {
          members,
        },
      })
    )
    .catch(errorToast);
};

export const getDashboardTimeRange = () => (dispatch) => {
  DashboardService.getTimeRanges()
    .then((data) =>
      dispatch({
        type: FETCH_DASHBOARD_TIME_RANGE,
        payload: {
          data,
        },
      })
    )
    .catch(errorToast);
};

export const getDesktopGraphData =
  (queryParam, name, serial_no) => (dispatch) => {
    if (serial_no !== undefined) {
      DashboardService.getDesktopGraphData(queryParam, serial_no)
        .then((data) => {
          dispatch({
            type: FETCH_GRAPH_DATA,
            payload: { data: { [name.toLowerCase()]: data } },
          });
        })
        .catch(errorToast);
    }
  };

export const getMobileGraphData =
  (queryParam, name, serial_no) => (dispatch) => {
    if (serial_no !== undefined) {
      DashboardService.getMobileGraphData(queryParam, serial_no)
        .then((data) => {
          dispatch({
            type: FETCH_MOBILE_GRAPH_DATA,
            payload: { data: { [name]: data } },
          });
        })
        .catch(errorToast);
    }
  };

export const getAnalyzeGraphData = (queryParam) => (dispatch) => {
  DashboardService.getAnalyzeResultData(queryParam)
    .then((data) => {
      dispatch({
        type: FETCH_ANALYZE_RESULT,
        payload: data,
      });
    })
    .catch((e) => console.log(e));
};

export const getCurrentName = (theName) => (dispatch) => {
  dispatch({
    type: GET_CURRENT_NAME,
    payload: { data: { name: theName } },
  });
};
