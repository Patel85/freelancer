import { Fragment } from "react";
import { Transition } from "@headlessui/react";

function ScaleIn({ children }) {
  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
}

export default ScaleIn;
