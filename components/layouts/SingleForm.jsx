import React from "react";
import cn from "classnames";
import { Card } from "@components/ui";
import SingleComponent from "./SingleComponent";

function SingleForm({
  wrapperClassName = "",
  className = "",
  heading = "",
  onSubmit = null,
  children,
  footer = null,
}) {
  return (
    <SingleComponent
      wrapperClassName={wrapperClassName}
      heading={heading}
      footer={footer}
    >
      <Card className={cn("p-8 max-w-lg w-full", className)}>
        <form action="" onSubmit={onSubmit}>
          {children}
        </form>
      </Card>
      {footer}
    </SingleComponent>
  );
}

export default SingleForm;
