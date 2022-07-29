import React, { useState } from "react";
import { Modal, Input } from "@components/ui";
import UserService from "@services/user.service";
import TokenService from "@services/token.service";
import { showMessage, successToast } from "@utils/toast";
import { validateEmail, fieldHasError } from "@utils/form-fields";
import { useDispatch } from "react-redux";
import { EMAIL_UPDATE } from "@redux/actions/Types";
import Router from "next/router";
import cookieCutter from "cookie-cutter";

function UpdateEmail({ onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [fieldError, setFieldError] = useState({
    email: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setFieldError({ email: "" });

    let isValidEmail = validateEmail(formData.password);

    setFieldError({
      email: !isValidEmail && "Enter valid email",
      password: !formData.password && "Enter password",
    });

    if (isValidEmail) {
      UserService.updateEmail(formData.email, formData.password)
        .then(({ email, message }) => {
          dispatch({
            type: EMAIL_UPDATE,
            payload: { email },
          });
          successToast(message);
          cookieCutter.set("token", null);
          TokenService.removeUser();
          Router.push('/signin');
          onClose();
        })
        .catch((e) => {
          setFormError(showMessage(e.response.data));
        });
    }
  };

  return (
    <Modal onClose={onClose} onOk={onsubmit} title="Update Email">
      <div className="p-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          id="email-address"
          autoComplete="email"
          onChange={handleChange}
          value={formData.email}
          errors={fieldError.email}
          error={fieldHasError(fieldError.email)}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          autoComplete="password"
          onChange={handleChange}
          value={formData.password}
          errors={fieldError.password}
          error={fieldHasError(fieldError.password)}
          required
        />

        {formError && (
          <div className="bg-red p-3 my-3 w-full flex items-center rounded-md">
            <p className="text-white">{formError}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default UpdateEmail;
