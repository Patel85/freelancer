import React, { useEffect, useState } from "react";
import Head from "next/head";
import { emailVerifyAction } from "@redux/actions";
import { connect } from "react-redux";
import Router, { useRouter } from "next/router";
import { Input, Button, Text } from "@components/ui";
import SingleForm from "@components/layouts/SingleForm";
import AxiosInstance from "@services/api";
import { errorToast, successToast } from "@utils/toast";
import withPrivateRoute from "@hooks/withPrivateRoute";
import { TailSpin } from "react-loader-spinner";
import Loader from "../components/ui/Loader/Loader";

const ConfirmPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState({ email: "", confirmCode: [] });
  const [formData, setFormData] = useState({
    email: "eemail@email.com",
    confirmCode: "",
  });
  const router = useRouter();

  useEffect(() => {
    setFormData({ ...formData, email: router.query.email });
  }, [router.query.email]);

  const onsubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, confirmCode } = formData;

    setFieldError({ email: "", confirmCode: "" });

    //@TODO move validation to Input Field itshelf
    if (!email) {
      setFieldError((prev) => {
        return { ...prev, email: "Email is Required" };
      });
    }

    if (!confirmCode) {
      setFieldError((prev) => {
        prev.confirmCode.push("verification code is Required");
        return { ...prev };
      });
    }

    if (!fieldHasError(fieldError.confirmCode)) {
      try {
        let response = await AxiosInstance.post(`/auth/verify-email`, {
          otp: +confirmCode,
        });
        if (response.status === 202) {
          props.emailVerifyAction();
          setIsLoading(false);
          successToast("Your email has been successfully verified!!");
          Router.replace({
            pathname: "/pricing",
            query: { type: props.isIndividual ? "in" : "co" },
          });
          return;
        }
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 406: {
              setFieldError((prev) => {
                prev.confirmCode.push("Invalid Confirmation Code");
                return { ...prev };
              });
              break;
            }
            case 408: {
              setFieldError((prev) => {
                prev.confirmCode.push(
                  "Confirmation Code Expired. Click the Resend button"
                );
                return { ...prev };
              });
              break;
            }
            default:
              errorToast(error);
          }
        }
      }
    }
    setIsLoading(false);
    return;
  };

  //@TODO move this logic to utils file
  const fieldHasError = (field) => {
    if (Array.isArray(fieldError[field]) && fieldError[field].length > 0) {
      return true;
    }

    if (
      (typeof fieldError[field] === "string" ||
        fieldError[field] instanceof String) &&
      !!fieldError[field]
    ) {
      return true;
    }

    return false;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resendOTP = async (e) => {
    e.preventDefault();

    try {
      let response = await AxiosInstance.post(`/auth/send_otp_again`);
      if (response.status === 200) {
        successToast("Confirmation code is send to your email address");
      }
    } catch (error) {
      if (error.response) {
        errorToast(error);
      }
    }
  };

  return (
    <section className="overflow-hidden">
      <Head>
        <title>Confirmation - Statsout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <TailSpin color="#52acf9" /> */}

      <div className="max-w-7xl flex flex-col justify-center items-center mx-auto">
        {isLoading ? <Loader /> : null}
        <SingleForm heading="Almost There" onSubmit={onsubmit}>
          <Text variant="pageSubHeading" className="text-center mb-4">
            Check your email for confirmation code.
          </Text>
          <Text variant="text" className="text-center mb-4">
            We sent an email containing confirmation code to your email address
            provided during creating account
          </Text>
          <Input
            label="Email"
            type="email"
            placeholder="jane.doe@example.com"
            // onChange={handleChange}
            name="email"
            value={formData.email}
            errors={fieldError.email}
            error={fieldHasError(fieldError.email)}
            disabled
          />

          <Input
            label="Confirmation Code"
            type="text"
            name="confirmCode"
            value={formData.confirmCode}
            placeholder="Enter the Confirmation code"
            onChange={handleChange}
            errors={fieldError.confirmCode}
            error={fieldHasError(fieldError.confirmCode)}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            loading={isLoading}
          >
            Confirm
          </Button>

          <Text
            variant="text"
            className="text-xs text-gray-400 font-semibold my-2 text-center"
          >
            Lost or expired the confirmation code
          </Text>
          <Button
            variant="secondary"
            className="w-full underline text-primary hover:bg-gray-50"
            onClick={resendOTP}
          >
            , Resend confirmation code
          </Button>
          <a href="/signupFlow/DesktopAndroid/">ptivvvv</a>
        </SingleForm>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isIndividual: state.Auth.user.isIndividual,
});
export default withPrivateRoute(
  connect(mapStateToProps, { emailVerifyAction })(ConfirmPage)
);
