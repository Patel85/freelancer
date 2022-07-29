import React, { useEffect} from "react";
import DesktopAndroidComponent from "@components/signinFlow/DesktopAndroid";
import withPrivateRoute from "@hooks/withPrivateRoute";
import { useRouter } from "next/router";
import { errorToast, successToast } from "@utils/toast";

function DesktopAndroid() {
  const { query } = useRouter();

  useEffect(() => {
    if (query.payment_status === "success") {
      console.log(query);
      successToast("Payment Sucess, Thankyou for using our service");
    }
    if (query.payment_status === "fail") {
      console.log(query, "FAIL");
      errorToast("Payment Failed, Please retry after few minutes");
    }
    console.log(query);
  }, [query]);

  return <DesktopAndroidComponent />;
}

export default withPrivateRoute(DesktopAndroid);
