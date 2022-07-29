import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

function useUI() {
  let dispatch = useDispatch();
  let state = useSelector((st) => st.UI);

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

  const openModal = useCallback(() => {
    dispatch({ type: "OPEN_MODAL" });
  }, [dispatch]);
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
      setActiveSidebarLink,
    }),
    [state]
  );

  return value;
}

export default useUI;
