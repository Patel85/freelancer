import { toast } from "react-toastify";

export const showMessage = (obj) => {
  if (typeof obj === "string") return obj;
  const msg = Object.values(obj)[0][0];
  if (msg) {
    if (msg.length == 1) {
      return Object.values(obj)[0];
    }
    return msg;
  } else {
    return "Try Again";
  }
};

export const errorToast = (e) => {
  e.response &&
    e.response.data &&
    toast(showMessage(e.response.data), {
      type: "error",
    });

  typeof e === "string" &&
    toast(e, {
      type: "error",
    });
};

export const successToast = (msg) => {
  toast(msg, { type: "info" });
};
