import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button, GoogleIcon } from "@components/ui";
import axios from "axios";

function GoogleButton({ setValid = () => {}, setData = () => {} }) {
  const onGoogleSuccess = (response) => {
    const access_token = response.accessToken;
    const email = response.profileObj.email;
    console.log(response);
    axios
      .post(`http://localhost:8000/api/v2/auth/google/`, {
        access_token: access_token,
        email: email,
      })
      .then((res) => {
        console.log("SUCEESSS", res);
        // if (res.data["user_created"]) {
        setData({ email: email, password: "" });
        setValid(true);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onGoogleFailure = () => {
    console.log("Fail to Use Google Auth");
  };

  return (
    <>
      {/* <GoogleLogin
        clientId={
          
        }
        buttonText="Sign in with Google"
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
        className="google-login-button"
        onClick={(e) => console.log("GOOGLE AUTH BUTTON CLICKED")}
      /> */}
      <Button variant="accent" size="sm">
          <p className="flex items-center text-gray-600 text-lg font-normal text-center tracking-tight">
            <GoogleIcon />
            &nbsp;&nbsp;Google
          </p>
      </Button> 
      {/* </GoogleLogin> */}
    </>
  );
}

export default GoogleButton;
