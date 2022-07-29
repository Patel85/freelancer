import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  createUser,
  getProfessions,
  getCountries,
  getMembersLengthInOrganisation,
} from "@redux/actions";
import { connect } from "react-redux";
import SignUpLayoutComponent from "@components/signupFlow/SignUpLayout";
import { Text, Input, Button } from "@components/ui";
import SingleForm from "@components/layouts/SingleForm";
import { GoogleButton } from "@components/button";

const Createaccount = (props) => {
  const [fieldError, setFieldError] = useState({ email: "", password: [] });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isIndividual: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    props.getProfessions();
    props.getCountries();
    props.getMembersLengthInOrganisation();

    // props.isUserCreated && Router.push(`/signin?first_name=${formData.first_name}`)
    // props.isUserCreated &&
    if (!props.isLoading) {
      setIsCreating(false);
      setBtnDisabled(true);
    } else {
      setIsCreating(true);
    }
  }, [props.isLoading]);

  useEffect(() => [fieldError]);

  const onsubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    setFieldError({ email: "", password: [] });

    //@TODO move validation to Input Field itshelf
    if (!email) {
      setFieldError((prev) => {
        return { ...prev, email: "Email is Required" };
      });
    }

    if (!password) {
      setFieldError((prev) => {
        return { ...prev, password: "Password is Required" };
      });
    }

    var atleastEightCharacter = /.{8,}/;
    if (!atleastEightCharacter.test(password)) {
      setFieldError((prev) => {
        prev.password.push("Password must have length of Eight Charactors.");
        return {
          ...prev,
        };
      });
    }

    var atleastOneUpperAlphabet = /(?=.*?[A-Z])/;
    if (!atleastOneUpperAlphabet.test(password)) {
      setFieldError((prev) => {
        prev.password.push("Password must have atleast one upper case.");
        return {
          ...prev,
        };
      });
    }

    var atleastOneDigit = /(?=.*?[0-9])/;
    if (!atleastOneDigit.test(password)) {
      setFieldError((prev) => {
        prev.password.push("Password must cantains at least one digit.");
        return {
          ...prev,
        };
      });
    }

    var atleastOneSpecialCharacter = /(?=.*?[#?!@$%^&*-])/;
    if (!atleastOneSpecialCharacter.test(password)) {
      setFieldError((prev) => {
        prev.password.push("Password must have atleast one Special Charactor.");
        return {
          ...prev,
        };
      });
    }

    if (
      email &&
      password &&
      atleastEightCharacter.test(password) &&
      atleastOneDigit.test(password) &&
      atleastOneSpecialCharacter.test(password)
    )
      setIsValid(true);

    return false;

    // setIsCreating(true)
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const authLogin = (e) => {
    e.preventDefault();
    alert("Login with Google");
  };

  return !isValid ? (
    <section className="overflow-hidden">
      <Head>
        <title>Create Account - Statsout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-7xl flex flex-col justify-center items-center mx-auto">
        <SingleForm heading="Sign Up" onSubmit={onsubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="jane.doe@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            errors={fieldError.email}
            error={fieldHasError("email")}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            helpText="Use 8 characters or more with special character and digit"
            errors={fieldError.password}
            error={fieldHasError("password")}
          />

          <Text className="text-center mt-4 mb-2 text-gray-600">
            By sign up you are agreed to &nbsp;
            <span className="underline text-primary cursor-pointer whitespace-nowrap">
              Terms of Service
            </span>
            &nbsp;and&nbsp;
            <span className="underline text-primary cursor-pointer whitespace-nowrap">
              Privacy policy
            </span>
            <span className="text-red ml-1">*</span>
          </Text>

          {!isCreating ? (
            <Button
              type="submit"
              variant="primary"
              className="w-full my-4"
              disabled={!btnDisabled}
            >
              Agree and Join
            </Button>
          ) : (
            <Button type="submit" variant="primary" className="w-full my-4">
              Joining..
              <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
              </div>
            </Button>
          )}
          <Text
            variant="text"
            className="text-xs text-gray-400 font-semibold my-2 text-center"
          >
            OR SIGN UP WITH
          </Text>
          <div className="grid gap-4 grid-cols-1 mt-2 ">
            <GoogleButton />
          </div>
          <Text variant="text" className="text-center mt-6">
            Already have an account&nbsp;
            <span className="underline text-primary">Sign in</span>
          </Text>
        </SingleForm>
      </div>
    </section>
  ) : (
    <SignUpLayoutComponent className="my-16" formData={formData} />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  isLoading: state.Auth.isLoading,
  isUserCreated: state.Auth.isUserCreated,
});
export default connect(mapStateToProps, {
  createUser,
  getProfessions,
  getCountries,
  getMembersLengthInOrganisation,
})(Createaccount);
