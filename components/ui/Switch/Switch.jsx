import { useState, useEffect } from "react";
import { Switch as Toggle } from "@headlessui/react";
import cn from "classnames";
import { errorToast } from "@utils/toast";

let Switch = ({ defaultState = false, onchange, width = 34, className }) => {
  const [enabled, setEnabled] = useState(defaultState);

  useEffect(() => {
    setEnabled(defaultState);
  }, [defaultState]);

  return (
    <Toggle
      checked={enabled}
      onChange={(state) => {
        setEnabled(state);
        if (onchange) {
          onchange(state);
        }
      }}
      style={{
        width: `${width + 4}px`,
        height: `${width / 2 + 4}px`,
      }}
      className={cn(
        "relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
        {
          "bg-primary": enabled,
          "bg-gray-300": !enabled,
        },
        className
      )}
    >
      <span className="sr-only">Agree Terms And Condition</span>
      <span
        aria-hidden="true"
        style={{
          width: `${width / 2}px`,
          height: `${width / 2}px`,
        }}
        className={cn(
          "absolute pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200",
          {
            "translate-x-full": enabled,
            "translate-x-0": !enabled,
          }
        )}
      />
    </Toggle>
  );
};

export default Switch;
