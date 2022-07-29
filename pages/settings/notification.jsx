import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AccPageWrapper from "@components/layouts/account";
import withPrivateRoute from "@hooks/withPrivateRoute";
import { Text, Button, Switch } from "@components/ui";
import { errorToast, successToast } from "@utils/toast";
import api from "../../services/api";

const Notification = ({ auth, subscription }) => {
  const [resultSend, setResultSend] = useState(false);
  const [resultWeek, setResultWeek] = useState(false);
  const [explicitSend, setExplicitSend] = useState(false);
  const [excessOne, setExcessOne] = useState(false);
  const [excessTwo, setExcessTwo] = useState(false);
  const [excessFive, setExcessFive] = useState(false);
  const [excessTen, setExcessTen] = useState(false);

  const getEmailServices = () => {
    api
      .get(`/auth/email-services`)
      .then((res) => {
        console.log(res.data);
        setResultSend(res.data.email_result);
        setResultWeek(res.data.email_result_weekend);
        setExplicitSend(res.data.email_sent_explicit_instant);
        setExcessOne(res.data.email_sent_1_hour);
        setExcessTwo(res.data.email_sent_2_hour);
        setExcessFive(res.data.email_sent_5_hour);
        setExcessTen(res.data.email_sent_10_hour);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateEmailService = (
    resultSend,
    resultWeek,
    explicitSend,
    excessOne,
    excessTwo,
    excessFive,
    excessTen
  ) => {
    return api
      .post("/auth/update-email-services", {
        email_result: resultSend,
        email_result_weekend: resultWeek,
        email_sent_explicit_instant: explicitSend,
        email_sent_1_hour: excessOne,
        email_sent_2_hour: excessTwo,
        email_sent_5_hour: excessFive,
        email_sent_10_hour: excessTen,
      })
      .then((res) => {
        console.log(res.data);
        setResultSend(res.data.email_result);
        setExplicitSend(res.data.email_sent_explicit_instant);
        setExcessOne(res.data.email_sent_1_hour);
        setExcessTwo(res.data.email_sent_2_hour);
        setExcessFive(res.data.email_sent_5_hour);
        setExcessTen(res.data.email_sent_10_hour);
        successToast("Succesfully updated email services");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getEmailServices();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("UPDATING EMAIL SERVICE");
    updateEmailService(
      resultSend,
      resultWeek,
      explicitSend,
      excessOne,
      excessTwo,
      excessFive,
      excessTen
    );
  };

  return (
    <AccPageWrapper title="Account" heading="Email Notification">
      <div className="grid grid-cols-2 gap-4 items-center mb-4">
        <Text variant="text" className="text-gray-400 mr-4 font-normal">
          Email Results Everyday
        </Text>
        <Switch
          variant="secondary"
          defaultState={resultSend}
          onchange={() => setResultSend(!resultSend)}
        ></Switch>
        <Text variant="text" className="text-gray-400 mr-4 font-normal">
          Email Results Everyweek
        </Text>
        <Switch
          variant="secondary"
          defaultState={resultWeek}
          onchange={() => setResultWeek(!resultWeek)}
        ></Switch>
        <Text variant="text" className="text-gray-400 mr-4 font-normal">
          Warning! Explicit Content Visit
        </Text>
        <Switch
          variant="secondary"
          defaultState={explicitSend}
          onchange={() => setExplicitSend(!explicitSend)}
        ></Switch>
      </div>

      <div className="mt-8">
        <Text variant="text" className="text-gray-400 mr-4 font-normal">
          Warning! Excessive Use
        </Text>
        <div className="grid grid-cols-2 items-center">
          <Text variant="text" className="font-normal">
            On 1-Hour Use
          </Text>
          <Switch
            variant="secondary"
            defaultState={excessOne}
            onchange={() => setExcessOne(!excessOne)}
          ></Switch>
          <Text variant="text" className="font-normal">
            On 2-Hour Use
          </Text>
          <Switch
            variant="secondary"
            defaultState={excessTwo}
            onchange={() => setExcessTwo(!excessTwo)}
          ></Switch>
          <Text variant="text" className="font-normal">
            On 5-Hour Use
          </Text>
          <Switch
            variant="secondary"
            defaultState={excessFive}
            onchange={() => setExcessFive(!excessFive)}
          ></Switch>
          <Text variant="text" className="font-normal">
            On 10-Hour Use
          </Text>
          <Switch
            variant="secondary"
            defaultState={excessTen}
            onchange={() => setExcessTen(!excessTen)}
          ></Switch>
        </div>
      </div>
      <Button
        variant="textColor"
        className="border-black rounded-lg text-black mt-8 p-1"
        size="none"
        onClick={handleSubmit}
      >
        Update Changes
      </Button>
    </AccPageWrapper>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
  subscription: state.Auth.subscription,
});

export default withPrivateRoute(connect(mapStateToProps)(Notification));
