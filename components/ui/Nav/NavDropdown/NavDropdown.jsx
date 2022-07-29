import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import classNames from "classnames";

import NavCard from "../NavCard";
import NavButton from "../NavButton";

/* 
 To Use NavDropdown wrap it around  
 <Popover.Group as="nav"/> from "@headlessui/react" 
 @params{buttonText} popover.button to toggleState
 @param{dropItems} are the NavCard
 @children must React.component
*/

function NavDropdown({ buttonText = "Solutions", dropItems, children }) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-gray-900" : "text-gray-500",
              "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            <NavButton>
              <span>{buttonText}</span>
              <icon
                className={classNames(
                  open ? "text-gray-600" : "text-gray-400",
                  "ml-2 h-5 w-5 group-hover:text-gray-500"
                )}
                aria-hidden="true"
              />
            </NavButton>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {dropItems.map((item) => (
                    <NavCard card={item} />
                  ))}
                </div>
                {children}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default NavDropdown;
