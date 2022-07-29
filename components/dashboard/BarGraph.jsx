import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { BarGraph } from "@components/graph";
import { Text, Card, LoadingGraph } from "@components/ui";
import { FaRegArrowAltCircleDown, FaExpand, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { errorToast } from "@utils/toast";
import DashboardService from "@services/dashboard.service";

function DashboardBarGraph({
  isLoading,
  displayNone,
  className,
  style,
  currentGraph,
  data = [],
  barKeys = ["value"],
  mainAxisName = "Time (in hours)",
  title = "Bar Graph (Application Vs Time (in hours))",
  showDownload = false,
  download = "desktop",
  duration = "",
  serial_no = "",
}) {
  const userId = useSelector((state) => state.Auth.user.id);
  const timeRanges = useSelector(
    (state) => state.Global.dashboardTimeRange.timeRanges
  );

  let currentGraphTimeRange = timeRanges.find(
    (timeRange) => timeRange.name.toLowerCase() === currentGraph
  );

  if (!currentGraphTimeRange) {
    currentGraphTimeRange = {
      desktop: "today",
      mobile: "today",
      name: "today",
    };
  }

  const tooltipUI = (tooltipData, colors) => {
    let hours = (+tooltipData.value / 60).toFixed(2).split(".")[0];
    let minutes = +tooltipData.value % 60;
    return (
      <div style={{ color: "black" }}>
        {hours !== "0" && (
          <>
            <strong style={{ color: colors(tooltipData.key) }}>
              {hours}&nbsp;
            </strong>
            hours&nbsp;
          </>
        )}

        <>
          <strong style={{ color: colors(tooltipData.key) }}>
            {minutes.toFixed(2).split(".")[0]}&nbsp;
          </strong>
          minutes
        </>
      </div>
    );
  };

  const [isFullScreen, setFullScreen] = useState(false);

  const graphCardRef = useRef(null);

  const handleFullScreen = () => {
    if (graphCardRef.current) {
      /* Get the documentElement (<html>) to display the page in fullscreen */
      var elem = graphCardRef.current;

      /* View in fullscreen */
      function openFullscreen() {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE11 */
          elem.msRequestFullscreen();
        }
      }

      /* Close fullscreen */
      function closeFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          /* IE11 */
          document.msExitFullscreen();
        }
      }

      // document.fullscreenElement will point to the element that
      // is in fullscreen mode if there is one. If not, the value
      // of the property is null.
      if (document.fullscreenElement) {
        closeFullscreen();
      } else {
        openFullscreen();
      }
    }
  };

  const handleDownload = async () => {
    let target = "";
    if (download === "desktop") {
      target = `/monitor/export/${userId}?q=${duration}&serial_no=${serial_no}`;
    } else if (download === "result") {
      target = `ml/export/?duration=${duration}&serial_no=${serial_no}`;
    } else {
      target = `/mobile/export/?duration=${duration}&serial_no=${serial_no}`;
    }

    let platformType = "";
    if (download === "desktop") {
      platformType = "Dekstop";
    } else if (download === "result") {
      platformType = `Result-${duration}`;
    } else {
      platformType = "Mobile";
    }

    let filename =
      platformType + "-" + duration + "-" + new Date().toISOString();

    let isSuccessful = await DashboardService.downloadCSV(target, filename);
    if (!isSuccessful) {
      errorToast("Can't download the data");
    }
  };

  useEffect(() => {
    let handleFullScreenChange = () => {
      setFullScreen((prev) => !prev);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  if (isLoading)
    return (
      <Card
        variant="dashboard"
        style={{ minHeight: "12rem", padding: "2rem", ...style }}
        className={className}
      >
        <LoadingGraph />
      </Card>
    );

  if (!isLoading && displayNone)
    return (
      <Card
        variant="dashboard"
        style={{ minHeight: "12rem", ...style }}
        className={className}
      >
        <div className="py-1 bg-gray-50 flex justify-between px-4 w-full items-center">
          <Text
            variant="text"
            className="whitespace-nowrap text-sm px-4 font-semibold"
          >
            {title}
          </Text>
        </div>
        <div className="relative flex justify-center items-center w-full h-full -mt-4">
          <Text variant="text" className="absolute">
            Data is not available
          </Text>
          {currentGraph === "today" && (
            <Text
              variant="text"
              className="absolute text-xs px-8 text-gray-400 bottom-6 right-8"
            >
              * Please login to application
            </Text>
          )}
          <div className="w-full px-8">
            <LoadingGraph animate={false} />
          </div>
        </div>
      </Card>
    );

  if (!isLoading)
    return (
      <Card
        variant="dashboard"
        style={{ minHeight: "12rem", ...style }}
        className={cn(className, "bg-white", { "h-screen": isFullScreen })}
        cardRef={graphCardRef}
      >
        <div className="py-1 bg-gray-50 flex justify-between px-4 w-full items-center">
          <Text
            variant="text"
            className="whitespace-nowrap text-sm px-4 font-semibold"
          >
            {title}
          </Text>

          <div className="flex items-center">
            {showDownload && (
              <div className="tooltip mr-6">
                <span className="tooltiptext">Download</span>
                <FaRegArrowAltCircleDown
                  className="text-gray-500 cursor-pointer tooltip"
                  onClick={handleDownload}
                />
              </div>
            )}
            {isFullScreen ? (
              <div className="tooltip">
                <span
                  className="tooltiptext"
                  style={{ left: isFullScreen ? "-400%" : "-200%" }}
                >
                  Close Fullscreen
                </span>
                <FaTimes
                  className="text-gray-500 cursor-pointer"
                  onClick={handleFullScreen}
                />
              </div>
            ) : (
              <div className="tooltip">
                <span className="tooltiptext"> Fullscreen</span>
                <FaExpand
                  className="text-gray-500 cursor-pointer"
                  onClick={handleFullScreen}
                />
              </div>
            )}
          </div>
        </div>
        <div className={cn({ "overflow-scroll h-full": isFullScreen })}>
          <BarGraph
            isHorizontal={
              currentGraph === "today" ||
              currentGraph === "last day" ||
              currentGraph === "yesterday" ||
              currentGraph === "day"
            }
            data={isFullScreen ? data : data.slice(0, 12)}
            barKeys={barKeys}
            updateTooltipData={tooltipUI}
            mainAxisName={mainAxisName}
            crossAxisName={currentGraph}
            scrollable={isFullScreen}
            scrollAxis="y"
            y={isFullScreen ? data.length : 12}
          />
        </div>
      </Card>
    );
}

export default DashboardBarGraph;
