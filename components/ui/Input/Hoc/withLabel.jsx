import React, { useRef } from "react";
import cn from "classnames";

const withLabel = (Component) => ({ ...props }) => {
  const {
    id = "",
    name = "",
    wrapperClassName = "",
    label = "",
    required = true,
    onChange,
    type = "text",
    align = "vertical",
  } = props;

  const inputRef = useRef(null);

  let htmlFor = () => {
    if (name) return name;
    if (id && !name) return id;
    throw new Error("Name or Id required for Input Field");
  };

  let handleOnChange = (e) => {
    if (onChange) onChange(e);
  };

  return (
    <div
      onClick={() => {
        if (inputRef.current) inputRef.current.focus();
      }}
      className={cn(wrapperClassName, {
        "flex items-start": type === "checkbox",
        "flex items-center": align === "horizontal",
        "mb-1": align !== "horizontal",
      })}
    >
      <label
        htmlFor={id}
        className={cn(
          "flex text-gray-700 hover:text-gray-900 placeholder-gray-gray4",
          {
            "order-last ml-2 mr-6": type === "checkbox",
            "mr-6": align === "horizontal",
          }
        )}
      >
        {label}
        {required && <span className="text-red">*</span>}
      </label>
      <Component
        {...props}
        inputRef={inputRef}
        handleOnChange={handleOnChange}
        className={cn({
          "w-4 mt-2": type === "checkbox",
          "w-full": type !== "checkbox",
        })}
        name={htmlFor()}
      />
    </div>
  );
};

export default withLabel;
