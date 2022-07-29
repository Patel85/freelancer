import Head from "next/head";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FIRST_LOGIN } from "@redux/actions/Types"
import SingleComponent from "@components/layouts/SingleComponent";
import { Card, Text, Button, NavButton } from "@components/ui";
import { ImageCard } from "@components/common";
import cn from "classnames";

import downloadsCard from "./downloadsCard.json";

const DesktopAndroidComponent = () => {
  const [progressBar, setProgressBar] = useState("");
  const [formProgress, setFormProgress] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const progressHandler = (e) => {
    e.preventDefault();
    setFormProgress(true);
    setProgressBar(true);
    dispatch({
      type: FIRST_LOGIN,
    });
    localStorage.setItem("firstLogin", "DONE");
  };
  const disable = (e) => {
    e.preventDefault();
    setDisabled(true);
  };

  const progressBackHandler = (e) => {
    e.preventDefault();
    setFormProgress(false);
    setProgressBar(false);
    setDisabled(false);
  };

  var classSate = progressBar ? "progress-bar bg-progress" : "bg-progress";

  return (
    <section>
      <Head>
        <title>onboarding-Download-app</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SingleComponent heading="Download our app for better experience">
        <Card className="p-8 mx-auto max-w-2xl">
          {!formProgress ? (
            <form className="step5Form" action="" method="POST">
              <input
                type="hidden"
                name="_token"
                value="LOFDeGFwvCZXvKMN6zldDogNXotsODBa850Jt0Th"
              />

              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 justify-center content-center">
                {downloadsCard.map((card) => (
                  <ImageCard
                    key={card.id}
                    card={card}
                    className={cn({ "col-span-2": downloadsCard.length === 1 })}
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      name="submit"
                      value="download"
                      onClick={disable}
                      className="mt-2"
                    >
                      {card.buttonText}
                    </Button>
                  </ImageCard>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  type="submit"
                  name="submit"
                  value="download"
                  disabled={!disabled}
                  variant="primary"
                  onClick={progressHandler}
                >
                  Continue
                </Button>
              </div>
            </form>
          ) : (
            <form
              className="step5Form"
              action=""
              method="POST"
              className="text-center flex flex-col items-center"
            >
              <Text variant="cardHeading">
                Thanks for joining StatsOut – you're good to go!
              </Text>
              <Text className="text-center">
                This is necessary to access all DeskTime features, oversee the
                dashboard and customize settings. Available for Windows, Mac,
                and Linux
              </Text>
              <NavButton
                variant="primary"
                className="mt-8 mx-auto"
                link="/dashboard"
              >
                Dashboard
              </NavButton>
            </form>
          )}
        </Card>
      </SingleComponent>
    </section>
  );
};

export default DesktopAndroidComponent;
