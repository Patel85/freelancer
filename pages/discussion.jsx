import React, { useState, useEffect } from "react";
import Head from "next/head";

import cookieCutter from "cookie-cutter";
import { PATH } from "@constants/Path";
import Axios from "axios";
import { Text, Input, LoadingCircle } from "@components/ui";
import Cards from "@components/common/DiscussionCard";
import SingleComponent from "@components/layouts/SingleComponent";
import withPrivateRoute from "@hooks/withPrivateRoute";

function Discussion() {
  let userList = [
    {
      image: {
        src: "/img/freelancer-circle.svg",
        alt: "expert's Pic",
      },
      username: "Username",
      profession: "Profession",
      conversation: 2587,
      rating: 4,
      appointment: "fri, 13th Aug",
      schedule: "Sun, 10:00pm - 04:00pm",
    },
    {
      image: {
        src: "/img/freelancer-circle.svg",
        alt: "expert's Pic",
      },
      username: "Username",
      profession: "Profession",
      conversation: 2587,
      rating: 4,
      appointment: "fri, 13th Aug",
      schedule: "Sun, 10:00pm - 04:00pm",
    },
    {
      image: {
        src: "/img/freelancer-circle.svg",
        alt: "expert's Pic",
      },
      username: "Username",
      profession: "Profession",
      conversation: 2587,
      rating: 4,
      appointment: "fri, 13th Aug",
      schedule: "Sun, 10:00pm - 04:00pm",
    },
    {
      image: {
        src: "/img/freelancer-circle.svg",
        alt: "expert's Pic",
      },
      username: "Username",
      profession: "Profession",
      conversation: 2587,
      rating: 4,
      appointment: "fri, 13th Aug",
      schedule: "Sun, 10:00pm - 04:00pm",
    },
  ];
  let [listofUser, setListofUser] = useState(userList);
  let [loader, setLoader] = useState(false);
  let [proffesionlist, setProffesionlist] = useState(userList);

  useEffect(async () => {
    // const csrfToken = cookieCutter.get("csrftoken");
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": csrfToken,
    //   },
    // };
    // const response = await Axios.get(
    //   `${PATH}/business/get-business-account/`,
    //   config
    // );
    // const proffesionlist1 = await Axios.get(
    //   `${PATH}/business/get-proffesion-list/`,
    //   config
    // );
    // setListofUser(response.data);
    // setLoader(false);
    // setProffesionlist(proffesionlist1.data);
  }, []);

  return (
    <section>
      <Head>
        <title>Discussion - Statsout</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SingleComponent margin="small" wrapperClassName="px-16">
        <div className="bg-gray-300 w-full flex justify-center items-center py-8">
          <Text variant="text" className="text text-5xl text-white font-normal">
            What do <span className="font-medium">you</span> want to discuss
            about
          </Text>
        </div>
        <div className="flex justify-end my-8 self-end">
          <Input
            label=""
            type="email"
            wrapperClassName="w-96"
            name="email"
            value={""}
            onChange={(e) => console.log(e.target.value, "Expert Name")}
            placeholder="Search by expert name"
            required={false}
          />
        </div>

        <div>
          {loader ? (
            <div className="spingclass">
              <LoadingCircle
                size={5}
                className="text-primary mx-auto mt-4 mb-2"
              />
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-3 mb-8">
              {listofUser.map((data, index) => Cards(data))}
            </div>
          )}
        </div>
        <div className="grid gap-4 grid-cols-3">
          {proffesionlist.map((data) => Cards(data))}
        </div>
      </SingleComponent>
    </section>
  );
}

export default withPrivateRoute(Discussion);
