import React from "react";
import { Button, Text, FacebookIcon } from "@components/ui";

function FacebookButton({ onClick }) {
  return (
    <Button variant="accent" onClick={onClick}>
      <Text
        variant="text"
        className="flex items-center text-gray-400 font-semibold text-center"
      >
        <FacebookIcon />
        &nbsp;&nbsp;Facebook
      </Text>
    </Button>
  );
}

export default FacebookButton;
