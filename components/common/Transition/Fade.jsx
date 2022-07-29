import { Fragment } from "react";
import { Transition } from "@headlessui/react";

function Fade({ children }) {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}

export default Fade;
