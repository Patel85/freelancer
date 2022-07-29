import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { Fade } from "@components/common";
import cn from "classnames";
import withLabel from "./Hoc/withLabel";
import { FaChevronDown } from "react-icons/fa";

let List = (props) => {
  const [selected, setSelected] = useState("Select the options");

  useEffect(() => {
    setSelected(
      (props.selectDefault && props.items[0]) ||
        props.value || {
          name: "Select the options",
          id: "custom-list-id-random-id",
        }
    );
  }, [props.value]);

  return (
    <div className="w-full">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          if (props.onChange)
            props.onChange({
              target: { value: e, name: props.name },
              selected: e,
            });
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button
            className={cn(
              "border transition duration-150 ease-in-out relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-md cursor-default focus:outline-primary focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-primary focus-visible:ring-offset-primary focus-visible:ring-offset-2 focus-visible:border-primary sm:text-sm",
              {
                "focus-within:border-red border-red": props.error,
                "focus-within:border-primary border-gray-300": !props.error,
              },
              props.className
            )}
          >
            <span
              className={cn("block truncate text-base", {
                "text-base": selected.id !== "custom-list-id-random-id",
                "text-gray-500": selected.id === "custom-list-id-random-id",
              })}
            >
              {selected.name}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {props?.icon ? (
                <props.icon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                <FaChevronDown
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </span>
          </Listbox.Button>
          <Fade>
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-sm shadow-sm max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
              <Listbox.Option
                className={({ active }) =>
                  cn("cursor-default select-none relative py-2 px-4", {
                    "bg-gray-50": active,
                    "text-gray-900": !active,
                  })
                }
                disabled={true}
                value={null}
              >
                <span className="block truncate font-normal text-gray-600">
                  {props?.title || "Select the option"}
                </span>
              </Listbox.Option>

              {props?.items.map((listOption) => (
                <Listbox.Option
                  key={listOption.id}
                  className={({ active }) =>
                    cn("cursor-default select-none relative py-2 px-4", {
                      "bg-gray-50": active,
                      "text-gray-900": !active,
                    })
                  }
                  value={listOption}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={
                          ("block truncate",
                          {
                            "font-medium bg-gray-50": selected,
                            "font-medium bg-gray-50": active,
                            "font-normal": !selected,
                          })
                        }
                      >
                        {listOption.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Fade>
        </div>
        <div style={{ minHeight: "0.75rem" }}>
          {props.error &&
            Array.isArray(props.errors) &&
            props.errors.map((errorText) => (
              <p className="text-xs pl-2 text-red">{errorText}</p>
            ))}
          {props.error &&
            (typeof props.errors === "string" ||
              props.errors instanceof String) && (
              <p className="text-xs pl-2 text-red">{props.errors}</p>
            )}
          {!props.error &&
            (typeof props.helpText === "string" ||
              props.helpText instanceof String) && (
              <p className="text-xs pl-2 text-gray-400">{props.helpText}</p>
            )}
        </div>
      </Listbox>
    </div>
  );
};

export default withLabel(List);
