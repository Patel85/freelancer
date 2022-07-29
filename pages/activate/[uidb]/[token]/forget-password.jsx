import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import SingleForm from "@components/layouts/SingleForm";
import { Input, Button } from "@components/ui";
import axios from "axios";
import { DOMAIN } from "@constants/Path";
import { validatePassword, fieldHasError } from "@utils/form-fields";
import { errorToast, successToast } from "@utils/toast";

export const ResetPassword = () => {
  const router = useRouter();

  const [fieldError, setFieldError] = useState({
    user: [],
    password1: [],
    password2: [],
  });
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onsubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setFieldError({ password1: [], password2: [] });

    let { password1, password2 } = formData;

    if (!password1) {
      setFieldError((prev) => {
        prev.password1.push("Password is require");
        return { ...prev };
      });
    }

    let pwdErrors = validatePassword(formData.password1);

    if (pwdErrors.length > 0)
      setFieldError((prev) => {
        prev.password1.push(...pwdErrors);
        return { ...prev };
      });

    if (!password2) {
      setFieldError((prev) => {
        prev.password2.push("Re-password is require");
        return { ...prev };
      });
    }

    if (password2 && password1 != password2) {
      setFieldError((prev) => {
        prev.password2.push("Password doesn't match");
        return { ...prev };
      });
    }

    if (!fieldHasError(pwdErrors) && password1 === password2) {
      const { token, uidb } = router.query;
      axios.defaults.preflightContinue = false;

      axios
        .post(
          `${DOMAIN}/activate/${uidb}/${token}/forget-password`,
          { password1, password2 },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Request-Method": "POST",
              "Access-Control-Request-Headers": "content-type",
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          successToast(e.message || "Successfully reset your password");
          Router.replace(`/signin`);
        })
        .catch((e) => {
          errorToast(e.message || "Can't process your request");
          setIsLoading(false);
        });
      setIsLoading(false);
    }
    setIsLoading(false);
    return false;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto">
      <SingleForm heading="Reset Password" onSubmit={onsubmit}>
        <Input
          label="Username"
          type="text"
          name="user"
          value={formData.user}
          placeholder="jane.doe@example.com"
          onChange={handleChange}
          errors={fieldError.user}
          error={fieldHasError(fieldError.user)}
          wrapperClassName="hidden"
        />

        <Input
          label="Password"
          type="password"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
          required
          errors={fieldError.password1}
          error={fieldHasError(fieldError.password1)}
          placeholder="Password"
        />

        <Input
          label="Password"
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          required
          errors={fieldError.password2}
          error={fieldHasError(fieldError.password2)}
          placeholder="Re-Password"
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

export default ResetPassword;
