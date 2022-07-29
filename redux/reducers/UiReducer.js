import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  OPEN_DROPDOWN,
  CLOSE_DROPDOWN,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MODAL_VIEW,
  SET_SIDEBAR_VIEW,
  SET_USER_AVATAR,
} from "@redux/actions/Types";

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: "UPDATE_EMAIL_VIEW",
  sidebarView: "CHECKOUT_VIEW",
  userAvatar: "",
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_SIDEBAR: {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case CLOSE_SIDEBAR: {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case OPEN_DROPDOWN: {
      return {
        ...state,
        displayDropdown: true,
      };
    }
    case CLOSE_DROPDOWN: {
      return {
        ...state,
        displayDropdown: false,
      };
    }
    case OPEN_MODAL: {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        displayModal: false,
      };
    }
    case SET_MODAL_VIEW: {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case SET_SIDEBAR_VIEW: {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
    case SET_USER_AVATAR: {
      return {
        ...state,
        userAvatar: action.value,
      };
    }
    default:
      return state;
  }
}

export default uiReducer;
