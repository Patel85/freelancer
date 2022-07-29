import React, { useState } from "react";
import { connect } from "react-redux";
import { FaCheck } from "react-icons/fa";
import cn from "classnames";
import { Button, Text } from "@components/ui";
import { errorToast, successToast } from "@utils/toast";
import AxiosInstance from "@services/api";
import { userLogout } from "@redux/actions";

let PriceTable = ({
  type,
  rate,
  rateCycle = "month",
  link = { primary: false, text: "GET STARTED" },
  text,
  features = [],
  tag,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  let setSubscription = async (type) => {
    if (type !== "free") {
      console.log("errorToast");
      errorToast("TRY FREE PLAN FOR NOW");
      setIsLoading(false);
    }
    // Router.push(`/payment`);

    if (type === "free") {
      try {
        let response = await AxiosInstance.post(
          `/auth/create-user-subscription`,
          {
            subscription: "free",
            status: "new",
          }
        );
        if (response.status === 200) {
          setIsLoading(false);
          successToast("Enjoy our services");
          // props.userLogout();
          return;
        }
      } catch (error) {
        errorToast(error);
        setIsLoading(false);
        return;
      }
    }
  };

  const handleSelectPlan = (type) => {
    setIsLoading(true);
    setSubscription(type);
  };

  return (
    <div
      className="border shadow-sm px-4 py-4 h-full"
      style={{ maxWidth: "18rem" }}
    >
      <div
        className={cn(
          "rounded-sm px-1 py-0.5 text-xs font-bold max-w-max uppercase text-white",
          {
            "bg-primary": tag.tagged,
          }
        )}
      >
        {tag.text}
      </div>
      <Text variant="cardHeading" className="capitalize">
        {type}
      </Text>
      <Text variant="text" className="text-lg font-semibold capitalize">
        ${rate}&nbsp;
        <span className="text-gray-400 text-medium">/ {rateCycle}</span>
      </Text>
      <Text variant="small">{text}</Text>
      <Button
        className={cn("my-4 w-full", {
          "bg-primary text-white": link.primary,
          "bg-accent-2 text-gray-600": !link.primary,
        })}
        onClick={(e) => handleSelectPlan(type)}
        loading={isLoading}
      >
        {link.text}
      </Button>
      {features.map((feature) => (
        <ul key={feature.id} className=" px-5 mb-4">
          <Text variant="text" className="font-semibold text-gray-600">
            {feature.title}
          </Text>
          {Array.isArray(feature.points) &&
            feature.points.map((point, index) => (
              <li key={index} className="flex">
                <FaCheck className="text-primary mt-1 mr-2" />
                <Text variant="small">{point}</Text>
              </li>
            ))}
          {typeof feature.points === "string" && (
            <li className="flex">
              <FaCheck className="text-primary mt-1 mr-2" />
              <Text variant="small">{feature.points}</Text>
            </li>
          )}
        </ul>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({});
export default PriceTable;
