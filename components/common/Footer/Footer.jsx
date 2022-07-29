import { Popover } from "@headlessui/react";
import { Text, NavButton } from "@components/ui";
import { FaFacebookSquare, FaTwitter, FaLinkedin } from "react-icons/fa";

let solutionsLinks = [
  {
    id: "Social Media",
    link: "/",
    name: "Social Media",
  },
  {
    id: "Digital Marketing",
    link: "/",
    name: "Digital Marketing",
  },
  {
    id: "Customer Service",
    link: "/",
    name: "Customer Service",
  },
  {
    id: "For Developers",
    link: "/",
    name: "For Developers",
  },
];

let resourceLinks = [
  {
    id: "faq",
    link: "/faq",
    name: "FAQ",
  },
  {
    id: "Blog",
    link: "/",
    name: "Blog",
  },
  {
    id: "Resource Library",
    link: "/",
    name: "Resource Library",
  },
  {
    id: "Developers",
    link: "/",
    name: "Developers",
  },
  {
    id: "Support",
    link: "/",
    name: "Support",
  },
];

let legalLinks = [
  {
    id: "Privacy Policy",
    link: "/privacy",
    name: "Privacy Policy",
  },
  {
    id: "Terms of Service",
    link: "/terms",
    name: "Terms of Service",
  },
];

let companyLinks = [
  {
    id: "About Satsout",
    link: "/",
    name: "About Satsout",
  },
  {
    id: "Careers",
    link: "/",
    name: "Careers",
  },
  {
    id: "Partners",
    link: "/",
    name: "Partners",
  },
  {
    id: "Press",
    link: "/",
    name: "Press",
  },
  {
    id: "Contact",
    link: "/",
    name: "Contact",
  },
  {
    id: "Reviews",
    link: "/",
    name: "Reviews",
  },
];

let socialRoutes = [
  {
    id: "twitter",
    link: "/",
    icon: FaTwitter,
  },
  {
    id: "facebook",
    link: "/",
    icon: FaFacebookSquare,
  },
  {
    id: "linkedin",
    link: "/",
    icon: FaLinkedin,
  },
];

let Footer = () => {
  let genNavButtons = (routes) => {
    return routes.map((route) => (
      <li key={route.id}>
        <NavButton
          size="none"
          variant="flat"
          key={route.id}
          link={route.link}
          className="my-2 hover:underline"
        >
          {route.name}
        </NavButton>
      </li>
    ));
  };

  let genSocialButtons = (routes) => {
    return routes.map((route) => (
      <li
        key={route.id}
        onClick={route.id === "signout" ? props.userLogout : () => {}}
      >
        <NavButton
          variant={route?.primary ? "primary" : "flat"}
          key={route.id}
          link={route.link}
          size="none"
        >
          <route.icon className="text-gray-400" size={25} />
        </NavButton>
      </li>
    ));
  };

  return (
    <Popover className="relative">
      <div className="max-w-7xl mx-auto px-4 pb-10 sm:px-6">
        <div className="grid gap-16 grid-cols-6">
          <div className="flex flex-col justify-start items-start col-span-2 text-left">
            <NavButton size="none" link="/">
              <img
                src="/favicon.svg"
                width={30}
                height={30}
                className="cursor-pointer"
              />
            </NavButton>
            <Text className="my-4">
              Donec ullamcorper nulla non metus auctor fringilla. Vestibulumm id
              ligula porta felis euismod semper.
            </Text>
            <Text variant="text">© 2021 Statsout</Text>
            <ul className="flex space-x-10 my-4">
              {genSocialButtons(socialRoutes)}
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <Text variant="text" className="font-semibold">
              Solutions
            </Text>
            <ul>{genNavButtons(solutionsLinks)}</ul>
          </div>
          <div className="flex flex-col items-start">
            <Text variant="text" className="font-semibold">
              Resource
            </Text>
            <ul>{genNavButtons(resourceLinks)}</ul>
          </div>
          <div className="flex flex-col items-start">
            <Text variant="text" className="font-semibold">
              Legal
            </Text>
            <ul>{genNavButtons(legalLinks)}</ul>
          </div>
          <div className="flex flex-col items-start">
            <Text variant="text" className="font-semibold">
              Company
            </Text>
            <ul>{genNavButtons(companyLinks)}</ul>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default Footer;
