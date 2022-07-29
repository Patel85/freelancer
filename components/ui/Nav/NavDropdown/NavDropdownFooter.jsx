import React from "react";

function NavDropdownFooter({footerItems}) {
  return (
    <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
      {footerItems.map((item) => (
        <div key={item.name} className="flow-root">
          <a
            href={item.href}
            className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            <item.icon
              className="flex-shrink-0 h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <span className="ml-3">{item.name}</span>
          </a>
        </div>
      ))}
    </div>
  );
}

export default NavDropdownFooter;
