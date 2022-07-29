import React from "react";

let AccountActivation = ({ closeToast, toastProps }) => (
  <div>
    <h5 className="text-dark">Your Account is Deactivated.</h5> <hr />
    <span className="text-dark ">
      Please confirm if you want to Activate account.
    </span>
    <br />
    <br />
    <br />
    <button className="btn btn-dark mr-3 " onClick={props.activateAccount}>
      Confirm
    </button>
    <button className="btn btn-outline-danger" onClick={closeToast}>
      Close
    </button>
  </div>
);

export default AccountActivation;
