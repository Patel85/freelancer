import React, { useState, useEffect } from "react";
import Head from "next/head";
import { AccountSidebar, AccountWrapper } from "@components/account";
import SingleComponent from "@components/layouts/SingleComponent";
import { connect } from "react-redux";

function AccountPageWrapper({
  title = "Statsout",
  children,
  heading = "Account Page",
  ...rest
}) {
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
    if (Object.keys(rest.auth.user).length !== 0) {
      // setShowAlert(rest.auth.user.is_activated);
      if (rest.auth.isAuthenticated && rest.auth.user) {
        setUser(rest.auth.user);
      }
    } else {
      // await rest.userLoading();
    }
  }, [rest.auth.user, rest.auth.isAuthenticated]);

  return (
    <section className="w-full">
      <Head>
        <title>Account - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SingleComponent margin="small" wrapperClassName="px-16">
        <div className="w-full flex fit">
          <AccountSidebar user={user} />
          <AccountWrapper heading={heading}>{children}</AccountWrapper>
        </div>
      </SingleComponent>
    </section>
  );
}

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

const dispatchActionToProps = {
  // userLoading,
};

export default connect(
  mapStateToProps,
  dispatchActionToProps
)(AccountPageWrapper);
