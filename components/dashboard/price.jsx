import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, Button } from "@components/ui";
import cn from "classnames";
import { FaCheck } from "react-icons/fa";
import {
  getPrice,
  subscribe,
  handlePaymentCheckout,
} from "@components/pricing";
import { getSubscription } from "@redux/actions";
import withPrivateRoute from "@hooks/withPrivateRoute";
import { LoadingDots } from "@components/ui";

function AccountPrice(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState("");
  let [filteredPrices, setPrices] = useState([]);

  const subscription = useSelector((state) => state.Auth.subscription.name);

  const userType = useSelector((state) =>
    state.Auth.user.isIndividual ? "in" : "co"
  );

  useEffect(() => {
    let setFilteredPrices = async () => {
      let prices = await getPrice(userType);
      prices.map((price) => {
        if (price.type === subscription) {
          price.tag = {
            tagged: false,
            text: "Current plan",
            primary: true,
          };
          return price;
        }
        price.tag = {
          ...price.tag,
          primary: true,
        };
        return price;
      });
      let _filteredPrices = prices.filter((price) => {
        if (subscription !== "free" && price.name === "free") {
          return false;
        }
        return true;
      });
      setPrices(_filteredPrices);
    };
    setFilteredPrices();
  }, []);

  const handleSelectPlan = (price) => {
    if (price.type === "free") {
      setLoad(price.type);
      setSubscription(price.type);
      setLoad("");
    } else {
      setLoad(price.type);
      handlePaymentCheckout(price, setSubscription, setLoad);
      console.log("LOAD>>", load);
    }
  };
  const setSubscription = async (type, payment_id) => {
    setIsLoading(true);
    let successfulSubscribe = await subscribe(type, "update", payment_id);
    if (successfulSubscribe) {
      await getSubscription()(dispatch);
      setPrices((prices) =>
        prices.map((price) => {
          if (price.type === type) {
            price.tag = {
              tagged: true,
              text: "Current plan",
              primary: true,
            };
          } else {
            price.tag = {
              tagged: true,
              text: price.type,
              primary: true,
            };
          }
          return price;
        })
      );
    }
    setLoad("");
    setIsLoading(false);
  };

  return (
    <>
      <Text variant="text" className="text-gray-900 text-bold">
        Please Upgrade to paid plan for results
      </Text>

      <div
        className={cn("justify-items-center overflow-hidden my-12", {
          "grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-4 ":
            filteredPrices.length === 4,
          "grid gap-4 grid-cols-1 md:grid-cols-3 ": filteredPrices.length === 3,
          "grid gap-4 grid-cols-1 md:grid-cols-6 ": filteredPrices.length < 3,
        })}
      >
        {filteredPrices.map((price) => (
          <div
            key={price.id}
            className={
              filteredPrices.length < 3 ? "col-span-2 self-stretch h-full" : ""
            }
          >
            <div
              className="border shadow-sm px-4 py-4 h-full"
              style={{ maxWidth: "18rem" }}
            >
              <div
                className={cn(
                  "rounded-sm px-1 py-0.5 text-xs font-bold max-w-max uppercase text-white",
                  {
                    "bg-primary": price.tag.tagged && price.tag.primary,
                    "bg-gray-500": price.tag.tagged && !price.tag.primary,
                  }
                )}
              >
                {price.tag.text}
              </div>
              <Text variant="cardHeading" className="capitalize">
                {price.type}
              </Text>
              <Text variant="text" className="text-lg font-semibold capitalize">
                ${price.rate}&nbsp;
                <span className="text-gray-400 text-medium">
                  / {price.rateCycle} days
                </span>
              </Text>
              <Text variant="small">{price.text}</Text>
              <Button
                className={cn(
                  "my-4 w-full text-primary-600",
                  price.type === subscription ? "bg-accent-2" : "bg-primary-2"
                )}
                onClick={(e) => handleSelectPlan(price)}
              >
                {price.type === subscription ? "Current Plan" : "Upgrade"}
                {price.type === load ? <LoadingDots /> : null}
              </Button>
              {price.features.map((feature) => (
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
          </div>
        ))}
        {filteredPrices.length < 3 && <div></div>}
      </div>
    </>
  );
}

export default withPrivateRoute(AccountPrice);
