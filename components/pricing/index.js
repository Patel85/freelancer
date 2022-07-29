import AxiosInstance from "@services/api";
import { errorToast, successToast } from "@utils/toast";
import Router from "next/router";

export { default } from "./PriceTable";

export const getPrice = async (userType) => {
  let filteredPrices;
  try {
    let response = await AxiosInstance.get(`/auth/view-subscription`);
    let prices = response.data.map((price) => {
      return {
        id: price.id,
        name: price.name,
        type: price.name,
        rate: price.amount,
        rateCycle: price.cycle,
        tag: {
          tagged: !price.is_free_forever,
          text: price.name,
        },
        is_coprative: price.is_coprative,
        is_individual: price.is_individual,
        text: price.description,
        features: price.feature.map((point) => {
          return {
            id: point.id,
            title: point.name,
            points: point.description,
          };
        }),
      };
    });
    let _filterPrice = prices;
    if (userType) {
      let showPrices = [];
      if (userType === "in") {
        showPrices = _filterPrice.filter(
          (price) => price.is_individual === true
        );
      }
      if (userType === "co") {
        showPrices = _filterPrice.filter(
          (price) => price.is_coprative === true
        );
      }
      _filterPrice = showPrices;
    }
    filteredPrices = _filterPrice;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        default:
          errorToast(error);
      }
    }
    filteredPrices = [];
  }
  return filteredPrices;
};

export const subscribe = async (type, status = "new", payment_id = "") => {
  //   if (type !== "free") {
  //     errorToast("TRY FREE PLAN FOR NOW");
  //     return false;
  //   }

  try {
    let response = await AxiosInstance.post(`/auth/create-user-subscription`, {
      subscription: type,
      payment_id: payment_id,
      status,
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    errorToast(error);
    return false;
  }
};

export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const razorpayOrder = (type) => {
  let data = null;
  AxiosInstance.post(`/auth/payment`, {
    subscription: type,
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("RESPONSE>>", res.data);
        data = res.data;
      }
    })
    .catch((err) => {
      errorToast(err);
      data = [];
      return false;
    });
  return data;
};

export const handlePaymentCheckout = async (
  price,
  setSubscription,
  setLoad
) => {
  console.log(price);
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    errorToast("Razorpay SDK failed to load. Are you online?");
    return;
  }
  var data = null;
  await AxiosInstance.post(`/auth/payment`, {
    subscription: price.type,
  })
    .then((res) => {
      console.log("RESPONSE>>", res.data);
      data = res.data;
    })
    .catch((err) => {
      errorToast(err);
      return;
    });
  const options = {
    key: data.key,
    currency: "INR",
    amount: data.amount.toString(),
    order_id: data.order_id,
    name: price.type,
    description: `Subscription Plan for ${price.rateCycle} days`,
    handler: function (response) {
      setLoad("");
      setSubscription(price.type, response.razorpay_payment_id);
      successToast("Payment Success! Enjoy our services");
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.on("payment.failed", function (response) {
    errorToast("Payment Failed, Please retry again");
  });
  paymentObject.open();
};
