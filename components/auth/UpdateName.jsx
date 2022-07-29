import React, { useState } from "react";
import { Modal, Input } from "@components/ui";
import UserService from "@services/user.service";
import { showMessage, successToast } from "@utils/toast";
import { useDispatch } from "react-redux";
import { NAME_UPDATE } from "@redux/actions/Types";

function UpdateEmail({ onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");
  const [fieldError, setFieldError] = useState({
    name: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setFieldError({ name: "" });

    if (!formData.name) setFieldError({ name: "First enter your name" });

    if (!!formData.name) {
      UserService.updateName(formData.name)
        .then(({ name, message = "Succesfully Updated Name" }) => {
          dispatch({
            type: NAME_UPDATE,
            payload: { name },
          });
          successToast(message);
          onClose();
        })
        .catch((e) => {
          setFormError(showMessage(e.response.data));
        });
    }
  };

  return (
    <Modal onClose={onClose} onOk={onsubmit} title="Update Name">
      <div className="p-6">
        <Input
          label="Name"
          type="text"
          name="name"
          id="name"
          autoComplete="given-name"
          onChange={handleChange}
          value={formData.name}
          errors={fieldError.name}
          error={!!fieldError.name}
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
