import React, { useState } from "react";
import cn from "classnames";
import withLabel from "./Hoc/withLabel";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = (props) => {
  let [isVisible, setVisible] = useState(false);

  let toggleVisiblity = () => {
    setVisible((prev) => !prev);
  };

  const {
    id,
    className = "",
    placeholder = "",
    type = "text",
    error = false,
    errors = "",
    onChange,
    ref,
    handleOnChange,
    inputRef,
    helpText = "",
    ...rest
  } = props;

  let genIcon = () => {
    if (isVisible) {
      return <FaEye className="mx-4 text-gray-600" onClick={toggleVisiblity} />;
    }
    return (
      <FaEyeSlash className="mx-4 text-gray-400" onClick={toggleVisiblity} />
    );
  };

  return (
    <div className={cn("flex flex-col justify-start")}>
      <div
        className={cn(
          "flex text-base outline-none rounded-md border border-gray-300 transition duration-150 ease-in-out overflow-hidden items-center",
          {
            "focus-within:border-red border-red": error,
            "focus-within:border-primary border-gray-50": !error,
          },
          className
        )}
      >
        <input
          ref={inputRef}
          type={type === "password" ? (isVisible ? "text" : "password") : type}
          className="px-2 py-2 text-base outline-none rounded-md w-full"
          id={id}
          placeholder={placeholder}
          onChange={handleOnChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...rest}
        />
        {type === "password" && genIcon()}
      </div>
      <div style={{ minHeight: "0.75rem" }}>
        {error &&
          Array.isArray(errors) &&
          errors.map((errorText) => (
            <p className="text-xs pl-2 text-red">{errorText}</p>
          ))}
        {error && (typeof errors === "string" || errors instanceof String) && (
          <p className="text-xs pl-2 text-red">{errors}</p>
        )}
        {!error &&
          (typeof helpText === "string" || helpText instanceof String) && (
            <p className="text-xs pl-2 text-gray-400">{helpText}</p>
          )}
      </div>
    </div>
  );
};

export default withLabel(Input);
