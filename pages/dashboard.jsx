import React, { useEffect, useState, useRef } from "react";
import { Tab } from "@headlessui/react";
import cn from "classnames";
import Head from "next/head";
import { connect } from "react-redux";
import withPrivateRoute from "@hooks/withPrivateRoute";
import {
  activateAccount,
  getDashboardTimeRange,
  getDesktopGraphData,
  getCurrentName,
  getMobileGraphData,
  getAnalyzeGraphData,
} from "@redux/actions";

import {
  DashboardBarGraph,
  DashboardLineGraph,
  DashboardHeatmap,
  DashboardSideCard,
  CallToAction,
} from "@components/dashboard";

import { Text, NavButton } from "@components/ui";
import SingleComponent from "@components/layouts/SingleComponent";
import { useRouter } from "next/router";
import { errorToast, successToast } from "@utils/toast";
import AccountPrice from "@components/dashboard/price";
import api from "../services/api";
import { FaRedo } from "react-icons/fa";
import { Dropdown } from "@components/ui";

const Dashboard = ({
  global,
  auth,
  getDashboardTimeRange,
  getDesktopGraphData,
  getMobileGraphData,
  getAnalyzeGraphData,
  getCurrentName,
}) => {
  const [timeRange, setTimeRange] = useState([
    { name: "Today", id: "default-today", desktop: "today", mobile: "today" },
  ]);

  const [shouldRender, setShouldRender] = useState(false);
  const [desktopGraphLoading, setDesktopGraphLoading] = useState(true);
  const [mobileGraphLoading, setMobileGraphLoading] = useState(false);

  let [desktopGraphData, setDesktopGraphData] = useState([]);
  let [mobileGraphData, setMobileGraphData] = useState([]);

  let [currentGraph, setCurrentGraph] = useState({
    name: "today",
    desktop: "today",
    mobile: "today",
  });
  const [analyzeTime, setAnalyzeTime] = useState("today");
  const [analyzeResults, setAnalyzeResults] = useState([]);
  const [analyzeResultLoading, setAnalyzeResultLoading] = useState(true);
  const [currentSubuser, setCurrentSubuser] = useState("");
  const [subusers, setSubusers] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    var just_logged = sessionStorage.getItem("just_logged") || true;
    if (auth.subscription.expires_in && auth.subscription.expires_in <= 5) {
      if (just_logged === true) {
        successToast(
          `Your plan ending in ${auth.subscription.expires_in} days, Please renew or upgrade`
        );
        sessionStorage.setItem("just_logged", JSON.stringify(false));
      }
    }
  }, [auth.subscription]);

  useEffect(() => {
    if (query.payment_status === "success") {
      successToast("Payment Sucess, Thankyou for using our service");
    }
    if (query.payment_status === "fail") {
      errorToast("Payment Failed, Please retry after few minutes");
    }
  }, [query]);

  const getSubUsers = () => {
    api
      .get(`/monitor/view/sub-user/`)
      .then((res) => {
        if (res.data.length > 0) {
          setSubusers(res.data);
          if (sessionStorage.getItem("sub_user_serial_no")) {
            setCurrentSubuser(sessionStorage.getItem("sub_user_serial_no"));
            refreshData(sessionStorage.getItem("sub_user_serial_no"));
          } else {
            setCurrentSubuser(res.data[0].serial_no);
            refreshData(res.data[0].serial_no);
          }
        } else {
          refreshData("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAnalyzeResultGraphData = (duration) => {
    setAnalyzeResultLoading(true);
    api
      .get(`ml/analyze/?duration=${duration}&serial_no=${currentSubuser}`)
      .then((res) => {
        let results = res.data
          .filter((result) => {
            return result["Total Time"] > 0;
          })
          .map((filtered_result) => {
            return {
              label: filtered_result["Category"],
              value: filtered_result["Total Time"] * 60,
            };
          });
        setAnalyzeResults(results);
      })
      .catch((err) => {
        setAnalyzeResults([]);
        console.log(err);
      });
    setAnalyzeResultLoading(false);
  };

  const setResultGraph = (duration) => {
    getAnalyzeResultGraphData(duration);
    setAnalyzeTime(duration);
  };

  useEffect(() => {
    getAnalyzeResultGraphData(analyzeTime);
  }, [currentSubuser]);

  useEffect(() => {
    if (auth.isAuthenticated && auth.isUserCreated) {
      let theVal = localStorage.getItem("firstLogin");
      if (theVal === "DONE" && auth.user.is_first_time_log_in) {
        setShouldRender(true);
      }

      if (!auth.user.is_first_time_log_in) {
        setShouldRender(true);
      }
    }
  }, [auth]);

  let browsers = useRef(null);
  let cities = useRef(null);
  let mobilePlatform = useRef(null);
  // .split(" ").join("")
  const setDesktopData = () => {
    if (
      global.desktopGraphData[
        currentGraph.name.toLowerCase().split(" ").join("")
      ]
    ) {
      if (
        global.desktopGraphData[
          currentGraph.name.toLowerCase().split(" ").join("")
        ]["raw"].length > 0
      ) {
        console.log(
          "DEKSTOP_SET>>",
          currentGraph.name.toLowerCase().split(" ").join("")
        );
        setDesktopGraphData(
          global.desktopGraphData[
            currentGraph.name.toLowerCase().split(" ").join("")
          ].transform.transformData
        );
      } else {
        setDesktopGraphData([]);
      }
      browsers.current =
        global.desktopGraphData[
          currentGraph.name.toLowerCase().split(" ").join("")
        ].transform.browsers;
      cities.current =
        global.desktopGraphData[
          currentGraph.name.toLowerCase().split(" ").join("")
        ].transform.cities;
      setDesktopGraphLoading(false);
    }
  };

  const setMobileData = () => {
    if (
      global.mobileGraphData[
        currentGraph.name.toLowerCase().split(" ").join("")
      ]
    ) {
      console.log(
        "MOBILE_SET>>",
        currentGraph.name.toLowerCase().split(" ").join("")
      );
      setMobileGraphData(
        global.mobileGraphData[
          currentGraph.name.toLowerCase().split(" ").join("")
        ].transform.transformData
      );
      mobilePlatform.current =
        global.mobileGraphData[
          currentGraph.name.toLowerCase().split(" ").join("")
        ].transform.mobilePlatforms;
      setMobileGraphLoading(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (currentGraph.name.toLowerCase() === "today") {
        getSubUsers();
      }
    }
  }, [currentGraph, auth.isAuthenticated]);

  useEffect(() => {
    console.log("I AM RUNNED_DEKSTOP");
    setDesktopData();
  }, [
    global.desktopGraphData[
      currentGraph.name.toLowerCase().split(" ").join("")
    ],
  ]);

  useEffect(() => {
    console.log("I AM RUNNED_MOBILE");
    setMobileData();
  }, [
    global.mobileGraphData[currentGraph.name.toLowerCase().split(" ").join("")],
  ]);

  useEffect(() => {
    setTimeRange(global.dashboardTimeRange.timeRanges);
  }, [global.dashboardTimeRange]);

  useEffect(() => {
    if (global.dashboardTimeRange.timeRanges.length === 0)
      getDashboardTimeRange();
  }, []);

  const fetchGraphData = (order) => {
    let findedTimeRange = global.dashboardTimeRange.timeRanges.find(
      (r) => r.order === order
    );

    if (
      findedTimeRange.name.toLowerCase().split(" ").join("") !==
      currentGraph.name.toLowerCase().split(" ").join("")
    ) {
      console.log(
        "FETCH_GRAPH_DATA",
        findedTimeRange.name.toLowerCase().split(" ").join(""),
        currentGraph.name.toLowerCase().split(" ").join("")
      );
      setCurrentGraph({
        name: findedTimeRange.name,
        desktop: findedTimeRange.name,
        mobile: findedTimeRange.name,
      });
    }
  };

  const refreshData = (sub_user_serial_no) => {
    setDesktopGraphLoading(true);
    setMobileGraphLoading(true);
    getDesktopGraphData("week", "week", sub_user_serial_no);
    getMobileGraphData("week", "week", sub_user_serial_no);

    getDesktopGraphData("today", "today", sub_user_serial_no);
    getMobileGraphData("today", "today", sub_user_serial_no);

    getDesktopGraphData("yesterday", "yesterday", sub_user_serial_no);
    getMobileGraphData("yesterday", "yesterday", sub_user_serial_no);

    getDesktopGraphData("lastweek", "lastweek", sub_user_serial_no);
    getMobileGraphData("lastweek", "lastweek", sub_user_serial_no);

    getDesktopGraphData("month", "month", sub_user_serial_no);
    getMobileGraphData("month", "month", sub_user_serial_no);

    getDesktopGraphData("lastmonth", "lastmonth", sub_user_serial_no);
    getMobileGraphData("lastmonth", "lastmonth", sub_user_serial_no);

    getDesktopGraphData("year", "year", sub_user_serial_no);
    getMobileGraphData("year", "year", sub_user_serial_no);

    getDesktopGraphData("lastyear", "lastyear", sub_user_serial_no);
    getMobileGraphData("lastyear", "lastyear", sub_user_serial_no);

    setMobileData();
    setDesktopData();
  };

  return (
    <>
      {shouldRender ? (
        <section className="w-full">
          <Head>
            <title>Dashboard - Statsout</title>
            <link rel="icon" href="/favicon.svg" />
          </Head>

          <SingleComponent margin="none">
            <Tab.Group>
              <Tab.List className="flex w-full mt-4">
                <div className="px-16 w-full mb-1">
                  <div
                    className="w-full mt-2 flex"
                    style={{ boxShadow: "inset 0 -1px var(--accent-2)" }}
                  >
                    <Tab
                      className={({ selected }) =>
                        cn(
                          "py-2 px-3 mr-1 text-sm leading-5 font-medium",
                          "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                          selected
                            ? "bg-gray-50 text-primary border-b-2 border-primary"
                            : "text-blue-100 hover:bg-gray-50 hover:text-primary"
                        )
                      }
                    >
                      Main
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        cn(
                          "py-2 px-3 mr-1 text-sm leading-5 font-medium",
                          "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                          selected
                            ? "bg-gray-50 text-primary border-b-2 border-primary"
                            : "text-blue-100 hover:bg-gray-50 hover:text-primary"
                        )
                      }
                    >
                      Result
                    </Tab>
                    {/* <Tab
                      className={({ selected }) =>
                        cn(
                          "py-2 px-3 mr-1 text-sm leading-5 font-medium",
                          "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                          selected
                            ? "bg-gray-50 text-primary border-b-2 border-primary"
                            : "text-blue-100 hover:bg-gray-50 hover:text-primary"
                        )
                      }
                    >
                      Discuss
                    </Tab> */}
                    {subusers.length > 0 && (
                      <div
                        className={cn(
                          "absolute right-32 py-2 px-3 mr-1 text-sm leading-4 font-medium bg-gray-50 text-primary"
                        )}
                      >
                        <Dropdown
                          fetchData={refreshData}
                          subusers={subusers}
                          setCurrentSubuser={setCurrentSubuser}
                          currentSubuser={currentSubuser}
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => refreshData(currentSubuser)}
                      style={{ borderLeft: "1px solid #026ff0" }}
                      className={cn(
                        "absolute right-24 py-3 px-3 mr-1 text-sm leading-4 font-medium bg-gray-50 hover:text-primary"
                      )}
                    >
                      <FaRedo />
                    </button>
                  </div>
                </div>
              </Tab.List>

              <Tab.Panels className="w-full mt-1">
                <Tab.Panel
                  className={cn(
                    "bg-white rounded-xl p-3",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                  )}
                >
                  <div className="w-96 self-start px-16 mb-2 flex flex-row gap-2 items-center">
                    <Text
                      variant="text"
                      className="whitespace-nowrap text-xs px-4 font-semibold"
                    >
                      Time Range :
                    </Text>
                    {timeRange.map((time) => (
                      <div
                        className={
                          currentGraph.name
                            .toLowerCase()
                            .split(" ")
                            .join("") ===
                            time.name.toLowerCase().split(" ").join("") &&
                          "underline"
                        }
                      >
                        <NavButton
                          size="sm"
                          key={time.id}
                          onClick={() => fetchGraphData(time.order)}
                        >
                          <Text
                            variant="text"
                            className={`text-xs hover:text-primary hover:underline ${
                              currentGraph.name
                                .toLowerCase()
                                .split(" ")
                                .join("") ===
                                time.name.toLowerCase().split(" ").join("") &&
                              "text-primary"
                            }`}
                          >
                            {time.name}
                          </Text>
                        </NavButton>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 grid-cols-4 w-full mb-8 px-16">
                    <div className="grid grid-cols-4 gap-6 col-span-4">
                      <DashboardBarGraph
                        className="relative col-span-2"
                        isLoading={desktopGraphLoading}
                        currentGraph={currentGraph.name
                          .toLowerCase()
                          .split(" ")
                          .join("")}
                        displayNone={
                          !desktopGraphData || desktopGraphData.length < 1
                        }
                        data={desktopGraphData}
                        duration={currentGraph.name
                          .toLowerCase()
                          .split(" ")
                          .join("")}
                        title="Desktop"
                        showDownload
                        download="desktop"
                        serial_no={currentSubuser}
                      />
                      <DashboardBarGraph
                        className="relative col-span-2"
                        isLoading={mobileGraphLoading}
                        currentGraph={currentGraph.name
                          .toLowerCase()
                          .split(" ")
                          .join("")}
                        displayNone={
                          !mobileGraphData || mobileGraphData.length < 1
                        }
                        data={mobileGraphData}
                        duration={currentGraph.name
                          .toLowerCase()
                          .split(" ")
                          .join("")}
                        title="Mobile"
                        showDownload
                        download="mobile"
                        serial_no={currentSubuser}
                      />
                      <DashboardSideCard
                        title="Browser"
                        isLoading={desktopGraphLoading}
                        data={browsers.current || []}
                      />
                      <DashboardSideCard
                        title="Mobile"
                        isLoading={mobileGraphLoading}
                        data={mobilePlatform.current || []}
                      />

                      <DashboardSideCard
                        title="Cities"
                        isLoading={desktopGraphLoading}
                        data={cities.current || []}
                      />

                      <CallToAction className="row-span-2" />

                      <DashboardHeatmap
                        currentGraph={currentGraph}
                        className="relative col-span-3"
                      />
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel
                  className={cn(
                    "bg-white rounded-xl p-3",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                  )}
                >
                  <Text>
                    {auth.subscription.is_active === false ? (
                      <>
                        <AccountPrice />
                      </>
                    ) : (
                      <>
                        <div className="w-96 self-start px-16 mb-2 flex flex-row gap-2 items-center">
                          <Text
                            variant="text"
                            className="whitespace-nowrap text-xs px-4 font-semibold"
                          >
                            Time Range :
                          </Text>
                          {timeRange.map((time) => (
                            <div
                              className={
                                time.name.toLowerCase().split(" ").join("") ===
                                  analyzeTime && "underline"
                              }
                            >
                              <NavButton
                                size="sm"
                                key={time.id}
                                onClick={() =>
                                  setResultGraph(
                                    time.name.toLowerCase().split(" ").join("")
                                  )
                                }
                              >
                                <Text
                                  variant="text"
                                  className={`text-xs hover:text-primary hover:underline ${
                                    time.name
                                      .toLowerCase()
                                      .split(" ")
                                      .join("") === analyzeTime &&
                                    "text-primary"
                                  }`}
                                >
                                  {time.name}
                                </Text>
                              </NavButton>
                            </div>
                          ))}
                        </div>

                        <div className="grid gap-6 grid-cols-4 w-full mb-8 px-16">
                          <div className="grid grid-cols-4 gap-6 col-span-4">
                            <DashboardBarGraph
                              className="relative col-span-2"
                              isLoading={analyzeResultLoading}
                              currentGraph="today"
                              displayNone={
                                !analyzeResults || analyzeResults.length < 1
                              }
                              data={analyzeResults}
                              duration={analyzeTime}
                              title="RESULT"
                              showDownload
                              download="result"
                              serial_no={currentSubuser}
                            />
                            <DashboardLineGraph
                              className="relative col-span-2"
                              isLoading={false}
                              currentGraph="today"
                              displayNone={false}
                              data={analyzeResults}
                              duration={analyzeTime}
                              title="PERFORMANCE"
                              serial_no={currentSubuser}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </Text>
                </Tab.Panel>
                {/* 
                <Tab.Panel
                  className={cn(
                    "bg-white rounded-xl p-3",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                  )}
                >
                  <Text>DISCUSS</Text>
                </Tab.Panel> */}
              </Tab.Panels>
            </Tab.Group>
          </SingleComponent>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
  global: state.Global,
});

const dispatchActionToProps = {
  activateAccount,
  getDashboardTimeRange,
  getDesktopGraphData,
  getMobileGraphData,
  getAnalyzeGraphData,
  getCurrentName,
};

export default withPrivateRoute(
  connect(mapStateToProps, dispatchActionToProps)(Dashboard)
);
