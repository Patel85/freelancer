import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaCreditCard, FaCog, FaDownload, FaBell } from "react-icons/fa";
import { Text } from "@components/ui";
import cn from "classnames";

function AccountSidebar({ user }) {
  let [activelinkId, setActivelinkId] = useState("1");

  let sidebarLinks = [
    {
      id: "1",
      icon: FaCog,
      text: "Account",
      link: "/settings",
    },
    {
      id: "3",
      icon: FaBell,
      text: "Notifications",
      link: "/settings/notification",
    },
    {
      id: "11",
      icon: FaDownload,
      text: "Apps",
      link: "/settings/apps",
    },
    {
      id: "2",
      icon: FaCreditCard,
      text: "Subscription",
      link: "/settings/price",
    },
  ];

  const router = useRouter();
  useEffect(() => {
    let currentLink = sidebarLinks.find(
      (link) => link.link === router.pathname
    );
    if (currentLink) {
      setActivelinkId(currentLink.id);
    } else {
      setActivelinkId("1");
    }
  }, []);

  let genSidebarLink = (link) => {
    return (
      <div
        className={cn(
          "whitespace-nowrap inline-flex items-center border border-transparent my-0.5 px-8 py-1 w-full",
          {
            "text-gray-600 hover:text-primary hover:bg-gray-100":
              link.id !== activelinkId,
            "text-primary bg-gray-100": link.id === activelinkId,
          }
        )}
      >
        <Link href={link.link}>
          <a className="flex items-center text-lg">
            <link.icon
              className={cn("mx-2 h-4 w-4", {
                "text-gray-400 hover:text-primary hover:bg-gray-100":
                  link.id !== activelinkId,
                "text-primary bg-gray-100": link.id === activelinkId,
              })}
            />
            {link.text}
          </a>
        </Link>
      </div>
    );
  };

  return (
    <section
      className="relative py-8 bg-gray-50 w-80 overflow-x-hidden"
      style={{ borderRightWidth: "1px", minWidth: "20rem" }}
    >
      <div className="flex text-dark px-10">
        <img
          src="/img/freelancer-circle.svg"
          alt="circle image"
          className="self-center h-12 w-12 "
        />
        <div className="text-gray-900 px-4">
          <Text variant="text" className="text-lg font-semibold">
            {user.Name ? user.Name : user.Organisation}
          </Text>
          <Text
            variant="text"
            className="text-gray-500 text-sm font-semibold -mt-3"
          >
            {user.email}
          </Text>
        </div>
      </div>

      <hr className="mt-4 mx-auto mx-10" />

      <div className="flex flex-col w-full my-12 text-dark">
        <Text
          variant="text"
          className="text-gray-400 pl-16 pr-8 mb-4 uppercase text-sm font-medium"
        >
          My Account
        </Text>
        {sidebarLinks.map((link) => genSidebarLink(link))}
      </div>
    </section>
  );
}

export default AccountSidebar;
