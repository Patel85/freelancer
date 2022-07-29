import React, { useState } from "react";
import { Modal, Input } from "@components/ui";
import UserService from "@services/user.service";
import TokenService from "@services/token.service";
import { showMessage } from "@utils/toast";
import { validatePassword, fieldHasError } from "@utils/form-fields";
import { toast } from "react-toastify";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { PASSWORD_UPDATE } from "@redux/actions/Types";
import cookieCutter from "cookie-cutter";

// onClick={() => setModalView('SIGNUP_VIEW')}

function ChangePassword({ onClose }) {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");
  const [fieldError, setFieldError] = useState({
    password: [],
    "old-password": [],
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();

    let pwdErrors = validatePassword(formData.password);
    setFormError("");
    setFieldError({ password: pwdErrors });

    if (!fieldHasError(pwdErrors) && formData["old-password"]) {
      UserService.updatePassword(formData["old-password"], formData.password)
        .then((message) => {
          toast(message, { type: "info" });
          dispatch({
            type: PASSWORD_UPDATE,
          });
          cookieCutter.set("token", null);
          TokenService.removeUser();
          Router.push('/signin');
          onClose();
        })
        .catch((e) => {
          console.log(e)
          setFormError(showMessage(e.response.data));
        });
    }
  };

  return (
    <Modal onClose={onClose} onOk={onsubmit} title="Update Password">
      <div className="p-6">
        <Input
          label="New password"
          type="password"
          name="password"
          id="password"
          autoComplete="password"
          onChange={handleChange}
          value={formData.password}
          errors={fieldError.password}
          error={fieldHasError(fieldError.password)}
        />
        <Input
          label="Old password"
          type="password"
          name="old-password"
          id="old-password"
          autoComplete="password"
          value={formData["old-password"]}
          onChange={handleChange}
          errors={fieldError["old-password"]}
          error={fieldHasError(fieldError["old-password"])}
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

export default ChangePassword;
