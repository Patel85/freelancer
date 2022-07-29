import React, { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@components/ui";

function Modal({
  isActive = false,
  onCancel = () => {},
  children,
  title = "Modal",
  okButtonText = "Okay",
  cancelButtonText,
  onOk = () => {},
  reverse = false,
}) {
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isActive);
  }, [isActive]);

  function handleButtonClick(e, type) {
    if (type === "okay") {
      onOk(e);
    } else {
      onCancel(e);
      setIsOpen(false);
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onCancel={handleButtonClick}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-opacity-10 bg-black" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          {/* <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span> */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-md rounded-md">
              <Dialog.Title
                as="h3"
                className="text-xl font-medium leading-6 text-gray-900 pt-6 px-6"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2 px-6 py-3">{children}</div>

              <div
                className={`mt-4 bg-gray-50 gap-2 p-6 flex justify-end items-center ${
                  reverse && "flex-wrap-reverse"
                }`}
              >
                {cancelButtonText && (
                  <Button
                    variant="accent"
                    onClick={(e) => handleButtonClick(e, "cancel")}
                  >
                    {cancelButtonText}
                  </Button>
                )}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => handleButtonClick(e, "okay")}
                >
                  {okButtonText}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
