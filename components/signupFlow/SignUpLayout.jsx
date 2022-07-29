import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Text } from "@components/ui";
import SingleForm from "@components/layouts/SingleForm";
import { ImageCard } from "@components/common";
import IndividualForm from "@components/signupFlow/individual/IndividualForm";
import CorporateForm from "@components/signupFlow/corporate/CorporateForm";

const SignuplayoutComponent = (props) => {
  const [group, setGroup] = useState({
    click: "null",
  });

  let [type, setType] = useState(null);
  let [step, setSteps] = useState("1");

  const router = useRouter();
  useEffect(() => {
    let { type, step } = router.query;

    if (!type || !step) {
      setGroup(0);
    }

    if (type) {
      let accountType = type.trim().toLowerCase();
      if (accountType === "individual" || accountType === "team") {
        setType(accountType);
      } else {
        setGroup(0);
      }
    }

    if (step) {
      let currentStep = step.trim().toLowerCase();
      if (currentStep === "1" || currentStep === "2") {
        setSteps(currentStep);
      } else {
        setGroup(0);
      }
    }
  }, [router.query.type, router.query.step]);

  const handleCardClick = (type) => {
    props.formData.isIndividual = type === "individual";
    Router.push(`/signup?type=${type}&step=2`);
  };

  let linkCards = [
    {
      id: "individual",
      image: {
        src: "/img/freelancer-circle.svg",
        alt: "freelancer circle img",
      },
      title: "As a individual",
      text: "We'll use it for company time management",
      click: 1,
      type: "individual",
    },
    {
      id: "corporate",
      image: {
        src: "/img/team-circle.svg",
        alt: "team circle img",
      },
      title: "As a Corporate",
      text: " I work alone or want to manage only my own workflow",
      click: 2,
      type: "team",
    },
  ];

  function Steps(step) {
    return (
      <div className="w-full flex justify-center  mt-2">
        <div
          className={`w-3 h-3 mx-1 rounded-full ${
            step === "1" ? "bg-primary" : "bg-gray-400"
          }`}
        ></div>
        <div
          className={`w-3 h-3 mx-1 rounded-full ${
            step === "2" ? "bg-primary" : "bg-gray-400"
          }`}
        ></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {step === "1" && (
        <SingleForm heading="Set up your profile" footer={Steps(step)}>
          <Text variant="cardHeading" className="text-center">
            How will you use DeskTime?
          </Text>
          <Text className="text-center">
            The first step is deciding on your account type. You can choose
            between using DeskTime individually or as a team. Bear in mind that
            the dashboard is a bit different for each account type.
          </Text>

          <Text className="text-center my-6 font-bold">
            Select one to continue
          </Text>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {linkCards.map((card) => (
              <ImageCard
                key={card.id}
                card={card}
                onClick={() => handleCardClick(card.type)}
              />
            ))}
          </div>
        </SingleForm>
      )}

      {/* On click of freelancer or team component change */}

      {type === "individual" && step === "2" && (
        <IndividualForm {...props} footer={Steps(step)} />
      )}
      {type === "team" && step === "2" && (
        <CorporateForm {...props} footer={Steps(step)} />
      )}
    </div>
  );
};

export default SignuplayoutComponent;
