import React, { useState } from "react";
import { Modal, Input, Text } from "@components/ui";
import UserService from "@services/user.service";
import { showMessage, successToast } from "@utils/toast";
import { useDispatch } from "react-redux";
import { USER_LOGGEDOUT, DELETE_ACCOUNT } from "@redux/actions/Types";
import Router from "next/router";

function ChangePassword({ onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    setFormData("");
    if (!formData.password) setFormError("Password is Required");

    if (formData.password)
      UserService.deleteAccount(formData.password)
        .then((res) => {
          dispatch({
            type: USER_LOGGEDOUT,
          });
          dispatch({
            type: DELETE_ACCOUNT,
            payload: {},
          });
          successToast("Your Account is successfully deleted delete view");
          Router.push('/signup');
          onClose();
        })
        .catch((e) => {
          setFormError(showMessage(e.response.data));
        });
  };

  return (
    <Modal onClose={onClose} onOk={onsubmit} btnReverse title="Delete Account">
      <div className="p-6">
        <Text variant="text" className="mb-3">
          This will delete your account. You will no longer be able to use
          Statsout desktop app or the mobile app. This action cannot be undone.
        </Text>
        <Input
          label="Enter your password"
          type="password"
          name="password"
          id="password"
          autoComplete="password"
          onChange={handleChange}
          value={formData.password}
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
