import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgetPassword } from "@redux/actions";
import SingleForm from "@components/layouts/SingleForm";
import { Input, Button } from "@components/ui";
import { connect } from "react-redux";

export const ForgetPassword = (props) => {
  const [fieldError, setFieldError] = useState({ email: "" });
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const onsubmit = (e) => {
    e.preventDefault();
    if (formData.email) {
      setIsLoading(true);
      console.log("formData", formData);
      props
        .forgetPassword(formData.email)
        .then((res) => {
          toast(res.data.message, { type: "info" });
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e, "<--- ERROR");
          setIsLoading(false);
          setFieldError((prev) => {
            return { email: "Email isn't available" };
          });
        });
    }
  };

  //@TODO get this from utils folder
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto">
      <SingleForm heading="Reset Password" onSubmit={onsubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="jane.doe@example.com"
          onChange={handleChange}
          required
          errors={fieldError.email}
          error={fieldHasError("email")}
        />

        {!isLoading ? (
          <Button type="submit" variant="primary" className="w-full mt-4">
            Reset Password
          </Button>
        ) : (
          <Button type="submit" variant="primary" className="w-full mt-4">
            Please Wait..
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          </Button>
        )}
      </SingleForm>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

const dispatchActionToProps = {
  forgetPassword,
};

export default connect(mapStateToProps, dispatchActionToProps)(ForgetPassword);
