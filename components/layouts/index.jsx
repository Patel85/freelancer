import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Header, Footer } from "@components/common";
import ShippingView from "@components/checkout/ShippingView";
import { useAcceptCookies } from "@hooks/useAcceptCookies";
import { Sidebar, Button, LoadingDots } from "@components/ui";
import PaymentMethodView from "@components/checkout/PaymentMethodView";
import CheckoutSidebarView from "@components/checkout/CheckoutSidebarView";
import useUI from "@redux/actions/ui";
import { ToastContainer } from "react-toastify";

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: () => <Loading />,
};

const SignUpView = dynamic(
  () => import("@components/auth/SignUpView"),
  dynamicProps
);

const UpdateEmailView = dynamic(
  () => import("@components/auth/UpdateEmail"),
  dynamicProps
);

const UpdateNameView = dynamic(
  () => import("@components/auth/UpdateName"),
  dynamicProps
);

const ChangePassword = dynamic(
  () => import("@components/auth/ChangePassword"),
  dynamicProps
);

const DeleteAccount = dynamic(
  () => import("@components/auth/DeleteView"),
  dynamicProps
);

const FeatureBar = dynamic(
  () => import("@components/common/FeatureBar"),
  dynamicProps
);

const ModalView = ({ modalView, closeModal }) => {
  return (
    <>
      {/* <Modal onClose={closeModal}> */}
      {/* {modalView === "LOGIN_VIEW" && <LoginView />} */}
      {modalView === "SIGNUP_VIEW" && <SignUpView />}
      {modalView === "CHANGE_PASSWORD_VIEW" && (
        <ChangePassword onClose={closeModal} />
      )}
      {modalView === "DELETE_VIEW" && <DeleteAccount onClose={closeModal} />}
      {modalView === "UPDATE_EMAIL_VIEW" && (
        <UpdateEmailView onClose={closeModal} />
      )}
      {modalView === "UPDATE_NAME_VIEW" && (
        <UpdateNameView onClose={closeModal} />
      )}
      {/* </Modal> */}
    </>
  );
};

const ModalUI = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null;
};

const SidebarView = ({ sidebarView, closeSidebar }) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === "CHECKOUT_VIEW" && <CheckoutSidebarView />}
      {sidebarView === "PAYMENT_VIEW" && <PaymentMethodView />}
      {sidebarView === "SHIPPING_VIEW" && <ShippingView />}
    </Sidebar>
  );
};

const SidebarUI = () => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();
  return displaySidebar ? (
    <SidebarView sidebarView={sidebarView} closeSidebar={closeSidebar} />
  ) : null;
};

const Layout = ({ children, pageProps: { categories = [], ...pageProps } }) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  return (
    <div
      className="h-full mx-auto transition-colors duration-150"
      style={{ maxWidth: "2460px" }}
    >
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <main className="fit">{children}</main>
      <Footer pages={pageProps.pages} />
      <ModalUI />
      <SidebarUI />
      <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <Button className="mx-5" onClick={() => onAcceptCookies()}>
            Accept cookies
          </Button>
        }
      />
    </div>
  );
};

export default Layout;
