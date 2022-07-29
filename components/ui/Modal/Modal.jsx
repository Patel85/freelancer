import { FC, useRef, useEffect, useCallback } from "react";
import s from "./Modal.module.css";
import FocusTrap from "@utils/focus-trap";
import { Text, Button } from "@components/ui";
import { FaTimes } from "react-icons/fa";

import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll,
} from "body-scroll-lock";

const Modal = ({
  children,
  onClose,
  btnReverse = false,
  onCancel = () => {},
  title = "Modal",
  okButtonText = "Okay",
  cancelButtonText = "Cancel",
  onOk = () => {},
}) => {
  const ref = useRef();

  function handleButtonClick(e, type) {
    if (type === "okay") {
      onOk(e);
    } else {
      onCancel(e);
      onClose();
    }
  }

  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") {
        return onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (ref.current) {
      disableBodyScroll(ref.current, { reserveScrollBarGap: true });
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      if (ref && ref.current) {
        enableBodyScroll(ref.current);
      }
      clearAllBodyScrollLocks();
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return (
    <div className={s.root}>
      <div className={s.modal} role="dialog" ref={ref}>
        <Text variant="text" className={s.title}>
          {title}
        </Text>
        <button
          onClick={() => onClose()}
          aria-label="Close panel"
          className={s.close}
        >
          <FaTimes className="h-4 w-4" />
        </button>
        {/* <FocusTrap focusFirst> */}
        {children}
        {/* </FocusTrap> */}
        <div
          className={`${s.buttonContainer} ${
            btnReverse ? "flex-row-reverse justify-start" : "justify-end"
          }`}
        >
          {cancelButtonText && (
            <Button
              variant={btnReverse ? "primary" : "accent"}
              onClick={(e) => handleButtonClick(e, "cancel")}
            >
              {cancelButtonText}
            </Button>
          )}
          <Button
            variant={btnReverse ? "accent" : "primary"}
            type="submit"
            onClick={(e) => handleButtonClick(e, "okay")}
          >
            {okButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
