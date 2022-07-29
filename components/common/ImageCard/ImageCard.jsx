import React from "react";
import { Card, Text } from "@components/ui";
import cn from "classnames";

function ImageCard({ className, card, onClick = null, children, size = 5 }) {
  return (
    <Card
      className={cn(
        className,
        "hover:border-primary hover:shadow-lg flex flex-col items-center p-4",
        {
          "cursor-pointer": !!onClick,
        }
      )}
      onClick={onClick}
    >
      {card.image && (
        <img
          src={card.image.src}
          alt=""
          style={{ height: `${size}rem`, width: `${size}rem` }}
        ></img>
      )}

      <Text variant="text" className="text-2xl mt-2 text-center">
        {card.title}
      </Text>
      <Text variant="text" className="text-center">
        {card.text}
      </Text>
      {children}
    </Card>
  );
}

export default ImageCard;
