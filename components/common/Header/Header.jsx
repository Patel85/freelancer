import Link from "next/link";
import { Popover } from "@headlessui/react";
import { NavButton } from "@components/ui";
import { connect } from "react-redux";
import { userLogout } from "@redux/actions";

let guestRoutes = [
  {
    id: "signin",
    link: "/signin",
    name: "Sign in",
  },
  {
    id: "signup",
    link: "/signup",
    name: "Sign Up",
    primary: true,
  },
];

let authRoutes = [
  // {
  //   id: "newui",
  //   link: "/newui",
  //   name: "newui",
  // },
  {
    id: "dashboard",
    link: "/dashboard",
    name: "Dashboard",
  },
  // {
  //   id: "discussion",
  //   link: "/discussion",
  //   name: "Discussion",
  // },
  {
    id: "settings",
    link: "/settings",
    name: "Settings",
  },
  {
    id: "signout",
    link: "/",
    name: "Signout",
  },
];

let Header = (props) => {
  const { isAuthenticated, isUserCreated, user } = props.auth;

  let genNavButtons = (routes) => {
    return routes.map((route) => (
      <li
        key={route.id}
        onClick={route.id === "signout" ? props.userLogout : () => {}}
      >
        <NavButton
          variant={route?.primary ? "primary" : "flat"}
          key={route.id}
          link={route.link}
        >
          {route.name}
        </NavButton>
      </li>
    ));
  };

  return (
    <Popover className="sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start">
            <Link href="/">
              <img src="/img/logo.png" className="cursor-pointer" />
            </Link>
          </div>

          <ul className="flex items-center justify-end flex-1 m-0">
            {isAuthenticated &&
              isUserCreated &&
              user &&
              user.is_email_verified &&
              !user.is_login_first_time &&
              genNavButtons(authRoutes)}
            {(!isAuthenticated || !user || !user.is_email_verified) &&
              genNavButtons(guestRoutes)}
          </ul>
        </div>
      </div>
    </Popover>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default connect(mapStateToProps, { userLogout })(Header);
