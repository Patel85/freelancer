import React, { useEffect, useState } from "react";
import Head from "next/head";
import { authentication, getSubscription } from "@redux/actions";
import { connect } from "react-redux";
import Router, { useRouter } from "next/router";
import { Input, Button, NavButton, Text } from "@components/ui";
import SingleForm from "@components/layouts/SingleForm";
import { GoogleButton } from "@components/button";
import { fieldHasError } from "@utils/form-fields";
// import Loader from "@components/ui/Loader/Loader";

const Signin = (props) => {
  const [isLogining, setIsLogining] = useState(false);
  const [fieldError, setFieldError] = useState({ email: "", password: "" });
  const [authProvider, setAuthProvider] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const router = useRouter();

  useEffect(() => {
    setFormData({ ...formData, email: router.query.email });
  }, [router.query.email]);

  // const handleSubmit = () =>{

  // }

  const onsubmit = async (e) => {
    e.preventDefault();
    setIsLogining(true);

    const { email, password } = formData;

    setFieldError({ email: "", password: "" });

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

    if (
      !fieldHasError(fieldError.password) &&
      !fieldHasError(fieldError.email)
    ) {
      let isSuccessfulLogin = await props.authentication(
        formData.email,
        formData.password
      );

      await props.getSubscription();

      setIsLogining(false);
      if (isSuccessfulLogin) {
        console.log("first");
        Router.replace("/dashboard");
        localStorage.setItem("firstLogin", null);
      }
    }

    setIsLogining(false);
  };

  const authLogin = (e, provider) => {
    e.preventDefault();
    setAuthProvider(provider);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <section className="overflow-hidden">
      <Head>
        <title>Sign In - Statsout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl flex flex-col justify-center items-center mx-auto">
        {/* {isLogining ? <Loader /> : null} */}

        <SingleForm heading="Sign In" onSubmit={onsubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="jane.doe@example.com"
            onChange={handleChange}
            name="email"
            value={formData.email}
            errors={fieldError.email}
            error={fieldHasError(fieldError.email)}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            placeholder="password"
            onChange={handleChange}
            errors={fieldError.password}
            error={fieldHasError(fieldError.password)}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            loading={isLogining}
          >
            Sign In
          </Button>

          <Text
            variant="text"
            className="text-xs text-gray-400 font-semibold my-4 text-center"
          >
            OR SIGN IN WITH
          </Text>
          <div className="grid gap-4 grid-cols-1 mb-2">
            <GoogleButton />
          </div>
          <NavButton
            variant="accent"
            className="w-full mt-4 underline"
            link="/forgetpassword"
          >
            Forgot your password?
          </NavButton>
          <NavButton
            variant="accent"
            className="w-full mb-2 underline"
            link="/signup"
          >
            Don't have an account?
          </NavButton>
        </SingleForm>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});
export default connect(mapStateToProps, { authentication, getSubscription })(
  Signin
);
