import React from "react";
import AccPageWrapper from "@components/layouts/account";
import { Text, NavButton } from "@components/ui";
import downloadsCard from "@components/signinFlow/downloadsCard.json";
import withPrivateRoute from "@hooks/withPrivateRoute";

function AccountApps() {
  return (
    <AccPageWrapper title="Account" heading="Account Settings">
      <Text variant="text" className="text-gray-900 text-bold">
        See your current plan details. Take your writing from good to great with
        Grammarly Premium.
        <div className="grid gap-4 grid-cols-1 max-w-sm overflow-hidden my-8">
          {downloadsCard.map((card) => (
            <div key={card.id} className="mb-10 pl-8">
              {card.image && (
                <img
                  src={card.image.src}
                  alt=""
                  style={{ height: `5rem`, width: `5rem` }}
                ></img>
              )}

              <Text variant="text" className="text-2xl mt-2">
                {card.title}
              </Text>
              <Text variant="text">{card.text}</Text>
              {/* <NavButton
                variant="accent"
                className="w-full mt-2 underline"
                link="/account/app"
                size="none"
              >
                {card.title}
              </NavButton> */}
              <a className="w-full mt-2 underline" href='/img/selectplan.png' download>{card.title}</a>
            </div>
          ))}
        </div>
      </Text>
    </AccPageWrapper>
  );
}

export default withPrivateRoute(AccountApps);
