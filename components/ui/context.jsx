import React, { useCallback, useMemo } from "react";
import { ThemeProvider } from "./themeContext";

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: "LOGIN_VIEW",
  sidebarView: "ROUTER",
  userAvatar: "",
  activeSidebarLink: {
    id: "11",
    link: "/",
  }
};

export const UIContext = React.createContext(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case "OPEN_DROPDOWN": {
      return {
        ...state,
        displayDropdown: true,
      };
    }
    case "CLOSE_DROPDOWN": {
      return {
        ...state,
        displayDropdown: false,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case "SET_SIDEBAR_VIEW": {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
    case "SET_USER_AVATAR": {
      return {
        ...state,
        userAvatar: action.value,
      };
    }
    case "SET_ACTIVE_SIDEBAR_LINK": {
      return {
        ...state,
        activeSidebarLink: action.value,
      };
    }
  }
}

export const UIProvider = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openSidebar = useCallback(() => dispatch({ type: "OPEN_SIDEBAR" }), [
    dispatch,
  ]);
  const closeSidebar = useCallback(() => dispatch({ type: "CLOSE_SIDEBAR" }), [
    dispatch,
  ]);
  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: "CLOSE_SIDEBAR" })
        : dispatch({ type: "OPEN_SIDEBAR" }),
    [dispatch, state.displaySidebar]
  );
  const closeSidebarIfPresent = useCallback(
    () => state.displaySidebar && dispatch({ type: "CLOSE_SIDEBAR" }),
    [dispatch, state.displaySidebar]
  );

  const openDropdown = useCallback(() => dispatch({ type: "OPEN_DROPDOWN" }), [
    dispatch,
  ]);
  const closeDropdown = useCallback(
    () => dispatch({ type: "CLOSE_DROPDOWN" }),
    [dispatch]
  );

  const openModal = useCallback(() => dispatch({ type: "OPEN_MODAL" }), [
    dispatch,
  ]);
  const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), [
    dispatch,
  ]);

  const setUserAvatar = useCallback(
    (value) => dispatch({ type: "SET_USER_AVATAR", value }),
    [dispatch]
  );

  const setActiveSidebarLink = useCallback(
    (value) => dispatch({ type: "SET_ACTIVE_SIDEBAR_LINK", value }),
    [dispatch]
  );

  const setModalView = useCallback(
    (view) => dispatch({ type: "SET_MODAL_VIEW", view }),
    [dispatch]
  );

  const setSidebarView = useCallback(
    (view) => dispatch({ type: "SET_SIDEBAR_VIEW", view }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
      setUserAvatar,
      setActiveSidebarLink
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = ({ children }) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
);
