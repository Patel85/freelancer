import React from "react";
import cn from "classnames";

const Card = ({
  variant = "normal",
  children,
  className,
  cardRef = null,
  ...rest
}) => {
  let rootClassname = cn(
    "shadow-sm border",
    {
      "rounded-xl": variant === "normal",
      "": variant === "dashboard",
    },
    className
  );
  return (
    <div className={cn(rootClassname)} ref={cardRef} {...rest}>
      {children}
    </div>
  );
};

export default React.memo(Card);
