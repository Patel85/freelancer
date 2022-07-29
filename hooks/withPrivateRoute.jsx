import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { checkLocalUser } from "@redux/actions";
import { useSelector, useDispatch } from "react-redux";

const withPrivateRoute = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    let isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
    let user = useSelector((state) => state.Auth.user);
    let subscription = useSelector((state) => state.Auth.subscription);
    let theState = useSelector((state) => state);

    //DK
    //console.log(theState)

    useEffect(() => {
      // this.state.renderClientSideComponent = true;
      if (!isAuthenticated) {
        let { user: localuser, subscription: localSubscription } =
          checkLocalUser()(dispatch);
        user = localuser;
        subscription = localSubscription;
        if (user?.accessToken) isAuthenticated = true;
      }

      if (!isAuthenticated) {
        router.replace("/signin");
      }

      if (isAuthenticated) {
        if (!user.is_email_verified) {
          if (router.pathname !== "/confirm")
            router.replace({
              pathname: "/signupFlow/DesktopAndroid/",
              query: { email: user.email },
            });
        } else if (user.is_email_verified && !subscription.is_active) {
          if (router.pathname !== "/pricing") router.replace("/pricing");
        } else if (
          user.is_email_verified &&
          user.is_first_time_log_in &&
          subscription.is_active &&
          theState.Auth.isUserCreated
        ) {
          let theVal = localStorage.getItem("firstLogin");
          if (theVal !== "DONE") {
            if (router.pathname !== "/signupFlow/DesktopAndroid")
              router.replace("/signupFlow/DesktopAndroid");
          }
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return hocComponent;
};

export default withPrivateRoute;
