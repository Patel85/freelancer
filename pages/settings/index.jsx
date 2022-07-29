import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  // userLoading,
  deactivateAccount,
  activateAccount,
  nameUpdateAction,
  emailUpdateAction,
  getCurrentName,
  passwordUpdateAction,
  deleteAccount,
} from "@redux/actions";

import AccPageWrapper from "@components/layouts/account";
import { Text, NavButton, Button } from "@components/ui";
import useUI from "@redux/actions/ui";
import withPrivateRoute from "@hooks/withPrivateRoute";

const Account = (props) => {
  let { setModalView, openModal } = useUI();

  const [user, setUser] = useState({
    Name: "",
    username: "",
    first_name: "",
    last_name: "",
    email: " ",
    is_email_verified: false,
    is_login_first_time: false,
    is_update: true,
    is_activated: true,
  });


  useEffect(async () => {
    if (Object.keys(props.auth.user).length !== 0) {
      // setShowAlert(props.auth.user.is_activated);
      if (props.auth.isAuthenticated && props.auth.user) {
        setUser(props.auth.user);
      }
    } else {
      // await props.userLoading();
    }
  }, [props.auth.user, props.auth.user.Name, props.auth.isAuthenticated]);

  useEffect(() => {
    // !props.auth.isAuthenticated && Router.push("/");
  }, [props.auth.isAuthenticated]);

  // useEffect(() => {
  //   getCurrentName(props.auth.user.Name);
  // }, [props.auth.user.Name]);


  const displayModal = (modalType) => {
    switch (modalType) {
      case "updateName": {
        setModalView("UPDATE_NAME_VIEW");
        openModal();
        break;
      }
      case "updateEmail": {
        setModalView("UPDATE_EMAIL_VIEW");
        openModal();
        break;
      }
      case "updatePassword": {
        setModalView("CHANGE_PASSWORD_VIEW");
        openModal();
        break;
      }
      case "deleteAccount": {
        setModalView("DELETE_VIEW");
        openModal();
        break;
      }
    }
  };

  let genField = (fields = [{ name, value, action }]) => {
    return (
      <div className="mb-8">
        {fields.map(({ name, value, action }) => (
          <div key={name} className="mt-2" key={name}>
            <Text variant="text" className="text-gray-400 capitalize">
              {name}
            </Text>
            <div className="flex items-center -mt-2">
              <Text variant="text" className="mr-4 font-normal">
                {value}
              </Text>
              <NavButton
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  displayModal(action);
                }}
              >
                Update
              </NavButton>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AccPageWrapper title="Account" heading="Settings">
      {genField([
        {
          name: "Name",
          value: user.Name ? user.Name : user.Organisation,
          action: "updateName",
        },
        {
          name: "Email",
          value: user.email,
          action: "updateEmail",
        },
        { name: "Password", value: "**********", action: "updatePassword" },
      ])}

      <Button
        variant="textColor"
        className="text-red underline"
        size="none"
        onClick={(e) => {
          e.preventDefault();
          displayModal("deleteAccount");
        }}
      >
        Delete your account
      </Button>
      <Text variant="text" className="text-gray-600 text-sm text-bold">
        This account will no longer be available, and all your saved data will
        be permanently deleted.
      </Text>
      {/* @TODO REMOVE or Pass this function props.deleteAccount() props.deactivateAccount() props.activateAccount() */}
    </AccPageWrapper>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

const dispatchActionToProps = {
  // userLoading,
  deactivateAccount,
  activateAccount,
  nameUpdateAction,
  emailUpdateAction,
  passwordUpdateAction,
  deleteAccount,
};
export default withPrivateRoute(connect(mapStateToProps, dispatchActionToProps)(Account));
