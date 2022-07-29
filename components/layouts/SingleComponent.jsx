import React from "react";
import cn from "classnames";
import { Text } from "@components/ui";

function SingleComponent({
  wrapperClassName,
  children,
  heading,
  size = "default",
  margin = "default",
  dir = "vertical",
}) {
  return (
    <div
      className={cn(
        "flex mx-auto w-full mb-16",
        {
          "max-w-7xl": size === "default",
          "max-w-9xl": size === "large",
        },
        {
          "my-12": margin === "default",
          "my-6": margin === "small",
          "": margin === "none",
        },
        {
          "flex-col items-center": dir === "vertical",
          "flex-row": dir === "horizontal",
        },
        wrapperClassName
      )}
    >
     { heading && <Text variant="sectionHeading" className="text-center mt-4 mb-2">
        {heading}
      </Text>}

      {children}
    </div>
  );
}

export default SingleComponent;
