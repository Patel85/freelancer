import React from "react";
import cn from "classnames";
import { Text } from "@components/ui";

function AccountWrapper({ wrapperClassName, heading, children }) {
  return (
    <div
      className={cn(
        "flex flex-col items-start w-full my-4 px-8 text-dark",
        wrapperClassName
      )}
    >
      <Text variant="articleHeading" className="mt-11">
        {heading}
      </Text>
      <hr className="w-full mb-10" />
      {children}
    </div>
  );
}

export default AccountWrapper;
