import React from "react";
import { Text, LoadingCircle, Card, Button } from "@components/ui";

function SideCard({ isLoading, data, className, title }) {
  const getSideCards = (cardArray) => {
    let cards = [];
    if (!cardArray) return null;
    for (let elem of cardArray.values()) {
      cards.push(elem);
    }
    return cards;
  };

  return (
    <Card variant="dashboard" className={`${className} flex flex-col`}>
      <Text variant="text" className="text-sm bg-gray-50 px-4 font-semibold">
        {title}
      </Text>
      <hr />
      {isLoading && (
        <LoadingCircle
          size={3}
          className="text-primary opacity-50 self-center m-2"
        />
      )}
      {!isLoading &&
        data &&
        (data?.size > 0 || data?.length > 0) &&
        getSideCards(data).map((value, index) => {
          return (
            <div key={index} className="flex my-2 items-center w-full px-4">
              <span className="bg-primary mr-4 text-primary h-2 w-2 rounded-full text-capitalized opacity-50"></span>
              {value}
            </div>
          );
        })}
      {!isLoading && (!data || data?.size < 1 || data?.length < 1) && (
        <div className="flex my-2 items-center w-full px-4">
          <Text variant="text" className="text-gray-500">
            No Data
          </Text>
        </div>
      )}
    </Card>
  );
}

export default SideCard;

export function CallToAction({ className }) {
  return (
    <Card variant="dashboard" className={className}>
      <Text variant="text" className="text-sm bg-gray-50 px-4 font-semibold">
        Not Yet Decided
      </Text>
      <hr />
      <div className="flex flex-col w-full">
        <div className="my-4 px-4">
          <Button className="w-full mb-3" variant="accent">
            Chat
          </Button>
          <Button className="w-full" variant="primary">
            Message
          </Button>
        </div>
      </div>
    </Card>
  );
}
