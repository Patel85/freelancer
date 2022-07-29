import React, { useState, useEffect, useCallback } from "react";
import Heatmap from "@components/graph/Heatmap";
import { Card } from "@components/ui";
import { getDesktopGraphData, getMobileGraphData } from "@redux/actions";
import { useSelector, useDispatch } from "react-redux";

function DashboardHeatmap({ className, currentGraph }) {
  const dispatch = useDispatch();
  const [graphData, setGraphData] = useState([]);
  const [graphPrevData, setGraphPrevData] = useState([]);
  const [desktopData, setDesktopData] = useState([]);
  const [mobileData, setMobileData] = useState([]);
  const [desktopPrevData, setDesktopPrevData] = useState([]);
  const [mobilePrevData, setMobilePrevData] = useState([]);
  const [userJoinDate, setJoinDate] = useState([]);

  const isPrevYear = useCallback(
    () => currentGraph.name.includes("last") || false,
    [currentGraph.name]
  );

  let globalData = useSelector((state) => state.Global);

  let desktopGraphData = useSelector(
    (state) => state.Global.desktopGraphData["year"]?.raw
  );

  let desktopPrevGraphData = useSelector(
    (state) => state.Global.desktopGraphData["lastyear"]?.raw
  );

  let mobileGraphData = useSelector(
    (state) => state.Global.mobileGraphData["year"]?.raw
  );

  let mobilePrevGraphData = useSelector(
    (state) => state.Global.mobileGraphData["lastyear"]?.raw
  );

  useEffect(() => {
    if (!isPrevYear() && !globalData.desktopGraphData["year"]) {
      getDesktopGraphData("year", "year")(dispatch);
    }

    if (isPrevYear() && !globalData.desktopGraphData["lastyear"]) {
      getDesktopGraphData("lastyear", "lastyear")(dispatch);
    }

    if (!isPrevYear() && !globalData.mobileGraphData["year"]) {
      getMobileGraphData("year", "year")(dispatch);
    }

    if (isPrevYear() && !globalData.mobileGraphData["lastyear"]) {
      getMobileGraphData("lastyear", "lastyear")(dispatch);
    }
  }, [currentGraph.name]);

  let transformDesktopData = (rawData) => {
    if (!rawData) return [];
    let desktopDateCountPair = {};
    rawData.forEach((data) => {
      let date = data.timestamp.split("T")[0];
      if (desktopDateCountPair[date]) {
        desktopDateCountPair[date] += +data.access_count;
      } else {
        desktopDateCountPair[date] = +data.access_count;
      }
    });

    const desktopData = Object.keys(desktopDateCountPair).map((key) => {
      return { date: key, count: desktopDateCountPair[key] };
    });
    return desktopData;
  };

  let transformMobileData = (rawData) => {
    if (!rawData) return [];
    let mobileDateCountPair = {};
    rawData.forEach((data) => {
      let launchDate = data.lastLaunchDate.split(" ")[0];
      let date = launchDate.split("-").reverse().join("-");
      if (mobileDateCountPair[date]) {
        mobileDateCountPair[date] += +data.totalVisit;
      } else {
        mobileDateCountPair[date] = +data.totalVisit > 0 ? data.totalVisit : 1;
      }
    });

    const mobileData = Object.keys(mobileDateCountPair).map((key) => {
      return { date: key, count: mobileDateCountPair[key] };
    });
    return mobileData;
  };

  useEffect(() => {
    let desktopData = transformDesktopData(desktopGraphData);
    setDesktopData(desktopData || []);
  }, [desktopGraphData]);

  useEffect(() => {
    const mobileData = transformMobileData(mobileGraphData);
    setMobileData(mobileData || []);
  }, [mobileGraphData]);

  useEffect(() => {
    let desktopData = transformDesktopData(desktopPrevGraphData);
    setDesktopPrevData(desktopData || []);
  }, [desktopPrevGraphData]);

  useEffect(() => {
    const mobileData = transformMobileData(mobilePrevGraphData);
    setMobilePrevData(mobileData || []);
  }, [mobilePrevGraphData]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const dateOfJoin = (
      user?.date_joined || `${new Date().getFullYear()}-01-01T0:0:0Z`
    )
      .split("T")[0]
      .split("-");

    let joinDate = dateOfJoin[2];
    let joinMonth = dateOfJoin[1];
    let year = isPrevYear()
      ? new Date().getFullYear() - 1
      : new Date().getFullYear();
    let startDate = new Date(`${year}-${joinMonth}-${joinDate}`);
    let nextYearTime = new Date(startDate);
    let endDate = new Date(
      nextYearTime.setFullYear(startDate.getFullYear() + 1)
    );

    setJoinDate([startDate, endDate]);

    if (isPrevYear()) {
      let data = mergerGraphData(desktopPrevData, mobilePrevData);
      setGraphPrevData(data);
    } else {
      let data = mergerGraphData(desktopData, mobileData);
      setGraphData(data);
    }
  }, [desktopData, mobileData, desktopPrevData, mobilePrevGraphData]);

  const mergerGraphData = (array1, array2) => {
    let arr1 = [...array1];
    let arr2 = [...array2];

    let mergeData = arr1.map((dd) => {
      let sameDateIndex = arr2.findIndex((md) => md.date === dd.date);
      if (sameDateIndex != -1) {
        let removed = arr2.splice(sameDateIndex, 1);
        let count = dd.count + removed[0].count;
        return { date: dd.date, count };
      } else {
        return dd;
      }
    });
    let graphData = [];
    if (mergeData.length > arr2.length) {
      graphData = mergeData.concat(arr2);
    } else {
      graphData = arr2.concat(mergeData);
    }
    return graphData;
  };

  const year = new Date().getFullYear() - (isPrevYear() ? 1 : 0);

  return (
    <Card
      variant="dashboard"
      className={className}
      style={{ minHeight: "12rem" }}
    >
      <h5 className="text-lg my-4 px-4">Sites Vistied in {year}</h5>
      <div className="col-md  px-4 text-center">
        <Heatmap
          currentGraph={currentGraph}
          data={isPrevYear() ? graphPrevData : graphData}
          startDate={userJoinDate[0]}
          endDate={userJoinDate[1]}
        />
      </div>
    </Card>
  );
}

export default DashboardHeatmap;
