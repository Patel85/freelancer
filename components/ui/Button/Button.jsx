import cn from "classnames";
import React, { forwardRef } from "react";
import s from "./Button.module.css";
import { LoadingDots } from "@components/ui";

const Button = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = "flat",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    size = "md",
    ...rest
  } = props;

  const rootClassName = cn(
    s.root,
    {
      [s.ghost]: variant === "ghost",
      [s.slim]: variant === "slim",
      [s.loading]: loading,
      [s.disabled]: disabled,
      [s.wide]: variant === "wide",
      [s.primary]: variant === "primary",
      [s.danger]: variant === "danger",
      [s.outline]: variant === "outline",
      [s.dangerOutline]: variant === "dangerOutline",
      [s.accent]: variant === "accent",
    },
    {
      "px-4 py-2.5": size === "md",
      "px-2 py-1.5": size === "sm",
      "max-w-max": size === "none",
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={buttonRef}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </button>
  );
});

export default Button;
