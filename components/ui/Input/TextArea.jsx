import React from "react";
import withLabel from "./Hoc/withLabel";
import cn from "classnames"

function TextArea(props) {
  const {
    id,
    className = "",
    placeholder = "",
    type = "text",
    error = false,
    errorText = "",
    onChange,
    ref,
    handleOnChange,
    inputRef,
    ...rest
  } = props;
  return (
    <div className={cn("flex flex-col justify-start")}>
      <textarea
        ref={inputRef}
        type={type}
        className={cn(
          "px-2 py-2 text-base outline-none rounded-md border border-gray-300 transition duration-150 ease-in-out",
          {
            "focus-within:border-red-500 border-red-500": error,
            "focus-within:border-primary border-gray-50": !error,
          },
          className
        )}
        id={id}
        placeholder={placeholder}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
      {errorText && <p className="text-xs pl-2 text-red mb-4">{errorText}</p>}
    </div>
  );
}

export default withLabel(TextArea);
