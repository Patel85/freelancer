import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Text, Button } from "@components/ui";
import cn from "classnames";
import { FaCheck } from "react-icons/fa";
import { connect } from "react-redux";
import withPrivateRoute from "@hooks/withPrivateRoute";
// import { userLogout } from "@redux/actions";
import {
  getPrice,
  subscribe,
  handlePaymentCheckout,
} from "@components/pricing";
import { LoadingDots } from "@components/ui";
import { useSelector, useDispatch } from "react-redux";
import { getSubscription } from "@redux/actions";

function Pricing(props) {
  const [load, setLoad] = useState("");
  let [filteredPrices, setPrices] = useState([]);
  const dispatch = useDispatch();
  const userType = useSelector((state) =>
    state.Auth.user.isIndividual ? "in" : "co"
  );
  const router = useRouter();

  useEffect(() => {
    if (!!props.subscription && props.subscription.is_active) {
      console.log("PRICING1", props);
    }
    let setFilteredPrices = async () => {
      let prices = await getPrice(userType);
      setPrices(prices);
    };
    setFilteredPrices();
  }, [props.subscription]);

  const handleSelectPlan = (price) => {
    if (price.type === "free") {
      setLoad(price.type);
      setSubscription(price.type, "free");
      setLoad("");
    } else {
      setLoad(price.type);
      handlePaymentCheckout(price, setSubscription, setLoad);
    }
  };

  const setSubscription = async (type, payment_id = "") => {
    let successfulSubscribe = await subscribe(type, "new", payment_id);
    setLoad("");
    if (successfulSubscribe) {
      console.log("PRICING1", successfulSubscribe);
      await getSubscription()(dispatch);
      await router.replace(`/signupFlow/DesktopAndroid/`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white px-4 py-10 text-gray-900 mb-10">
      {/* <Text variant="heading">filteredPrices</Text> */}
      {/* <Text variant="pageSubHeading">PACKAGES</Text> */}

      <div
        className={cn("justify-items-center overflow-hidden my-12", {
          "grid gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ":
            filteredPrices.length === 4,
          "grid gap-0 grid-cols-1 md:grid-cols-3 ": filteredPrices.length === 3,
          "grid gap-4 grid-cols-1 md:grid-cols-6 ": filteredPrices.length < 3,
        })}
      >
        {filteredPrices.length < 3 && <div></div>}
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
                    "bg-primary": price.tag.tagged,
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
                className={cn("my-4 w-full bg-accent-2 text-primary-600")}
                onClick={(e) => handleSelectPlan(price)}
                // loading={isLoading}
              >
                Get Started
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

      {/* <div className="text-center max-w-xl mx-auto">
        <p className="text-xs leading-tight">
          *Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          eligendi officiis, impedit ducimus eaque a corporis, dolore quia
          officia quam tenetur suscipit dolores, quos, quaerat quo provident
          iusto. Eius, impedit!
        </p>
      </div> */}
    </div>
  );
}

Pricing.getInitialProps = async (context) => {
  return {
    type: context.query.type || null,
  };
};

const mapStateToProps = (state) => ({ subscription: state.Auth.subscription });
// export default withPrivateRoute(
//   connect(mapStateToProps, { userLogout })(Pricing)
// );

export default withPrivateRoute(connect(mapStateToProps)(Pricing));
