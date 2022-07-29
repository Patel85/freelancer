import React from "react";
import { Modal, Input } from "@components/ui";

function SignUpView() {
  return (
    <Modal onClose={closeModal}>
      <div className="px-12 py-6">
        <Input
          label="Old password"
          type="password"
          name="password"
          id="password"
          autoComplete="password"
          value={updatePassword.old}
          onChange={(e) =>
            setUpdatePassword((prev) => {
              return { ...prev, old: e.target.value };
            })
          }
        />
        <Input
          label="New password"
          type="password"
          name="con-password"
          id="con-password"
          autoComplete="password"
          value={updatePassword.new}
          onChange={(e) =>
            setUpdatePassword((prev) => {
              return { ...prev, new: e.target.value };
            })
          }
        />
      </div>
    </Modal>
  );
}

export default SignUpView;
