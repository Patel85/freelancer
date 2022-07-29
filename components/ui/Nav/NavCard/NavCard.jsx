import React from "react";

function NavCard({ card }) {
  return (
    <a
      key={card.name}
      href={card.href}
      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
    >
      <card.icon
        className="flex-shrink-0 h-6 w-6 text-indigo-600"
        aria-hidden="true"
      />
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">{card.name}</p>
        <p className="mt-1 text-sm text-gray-500">{card.description}</p>
      </div>
    </a>
  );
}

export default NavCard;
