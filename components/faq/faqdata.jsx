import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Disclosure } from "@headlessui/react";

const FaqData = ({ title, description }) => {
  return (
    <Disclosure as="div" className="mt-2 flex flex-col w-full">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left  rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
            <span>{title}</span>
            <IoMdArrowDropdown
              className={`${
                open ? "transform rotate-180" : ""
              } w-5 h-5 text-primary`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
            {description}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default FaqData;
