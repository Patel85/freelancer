import React from "react";
import Link from "next/link";
import cn from "classnames";

function NavButton(props) {
  const {
    className,
    variant = "flat",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    link = "#",
    size = "md",
    ...rest
  } = props;

  const rootClassName = cn(
    "font-medium whitespace-nowrap inline-flex items-center justify-center rounded-md",
    {
      "border border-transparent shadow-sm text-white bg-primary hover:bg-primary-2":
        variant === "primary",
      "text-gray-500 hover:text-gray-900": variant === "flat",
      "border border-transparent text-primary bg-white hover:bg-gray-50":
        variant === "secondary",
      "text-primary hover:bg-gray-50": variant === "accent",
    },
    {
      "px-4 py-2": size === "md",
      "px-2 py-1": size === "sm",
      "max-w-max": size === "none",
    },
    className
  );

  return (
    <Link href={link}>
      <a
        aria-pressed={active}
        data-variant={variant}
        className={rootClassName}
        disabled={disabled}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}

export default NavButton;
