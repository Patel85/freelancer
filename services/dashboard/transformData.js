import { getWeekOfMonth, getDay, getMonth } from "date-fns";

const MIN_NUMBER_OF_BARS = 12;
const LABEL_LENGTH = 13;
const graphLabels = {
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weeks: ["Week1", "Week2", "Week3", "Week4", "Week5"],
  months: [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

function domain_from_url(url) {
  var result;
  var match;
  if (
    (match = url.match(
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
    ))
  ) {
    result = match[1];
    if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
      result = match[1];
    }
  }
  return result;
}

function graphWithPreviousZeroValue(gData, zeroValueData) {
  if (gData.length !== 0 && gData.length < MIN_NUMBER_OF_BARS) {
    let zeroDataRequire = MIN_NUMBER_OF_BARS - gData.length;
    if (zeroValueData.length > 0) {
      if (zeroDataRequire < zeroValueData.length) {
        gData.unshift(...zeroValueData.slice(0, zeroDataRequire));
      } else {
        let extraZeroValues = zeroDataRequire - zeroValueData.length;
        gData.unshift(...zeroValueData);
        for (let i = 1; i < extraZeroValues + 1; i++) {
          gData.unshift({ label: i + "", value: 0 });
        }
      }
    } else {
      for (let i = 1; i < zeroDataRequire + 1; i++) {
        gData.unshift({ label: i + "", value: 0 });
      }
    }
  }
}

function graphWithZeroValue(gData) {
  if (gData.length !== 0 && gData.length < MIN_NUMBER_OF_BARS) {
    let zeroDataRequire = MIN_NUMBER_OF_BARS - gData.length;
    for (let i = 1; i < zeroDataRequire + 1; i++) {
      gData.push({ label: i + "", value: 0 });
    }
  }
}

export const transformMobileData = (graphData, timeRange) => {
  let transformDataStructure = {
    transformData: [],
    mobilePlatforms: [],
  };

  if (!graphData) return transformDataStructure;

  let mobilePlatforms = new Set();

  let gData = [];
  let zeroValueData = [];

  let selectedLabel = "";
  switch (timeRange) {
    case "week":
    case "lastweek": {
      selectedLabel = "days";
      break;
    }
    case "month":
    case "lastmonth": {
      selectedLabel = "weeks";
      break;
    }
    case "year":
    case "lastyear": {
      selectedLabel = "months";
      break;
    }
  }

  if (selectedLabel)
    gData = graphLabels[selectedLabel].map((label) => {
      return { label, value: 0 };
    });

  graphData.forEach((data) => {
    let dateAndTime = data.lastLaunchDate.split(" ");
    let dateArray = dateAndTime[0].split("-"); //DD-MM-YYYY
    let TimeArray = dateAndTime[1].split(":"); //HH:MM:SS
    let standardDate = new Date(
      dateArray[2],
      dateArray[1] - 1,
      dateArray[0],
      TimeArray[0],
      TimeArray[1],
      TimeArray[2]
    );

    mobilePlatforms.add(data?.platform);
    let totalMinutes = convertToMinutes(data.usage);

    //@TODO convert to switch statement to fall under default condition
    if (timeRange === "today" || timeRange === "yesterday") {
      if (data?.appName.length > LABEL_LENGTH) {
        data.appName = data.appName.slice(0, LABEL_LENGTH) + "..";
      }
      if (totalMinutes !== 0) {
        return gData.push({ label: data.appName, value: totalMinutes });
      } else {
        return zeroValueData.push({ label: data.appName, value: totalMinutes });
      }
    }

    if (timeRange === "week" || timeRange === "lastweek") {
      gData[getDay(standardDate)].value += totalMinutes;
    }

    if (timeRange === "month" || timeRange === "lastmonth") {
      gData[getWeekOfMonth(standardDate) - 1].value += totalMinutes;
    }

    if (timeRange === "year" || timeRange === "lastyear") {
      gData[getMonth(standardDate)].value += totalMinutes;
    }
  });

  if (timeRange === "today" || timeRange === "yesterday") {
    graphWithZeroValue(gData, zeroValueData);
  }

  return {
    transformData: gData,
    mobilePlatforms,
  };
};

export const transformDesktopData_v1 = (graphData, timeRange) => {
  let transformDataStructure = {
    labels: [],
    data: [],
    city: [],
    browsers: [],
    meta_data: [],
  };

  if (!graphData) return transformDataStructure;

  let gData = [];
  let zeroValueData = [];
  if (timeRange === "today" || timeRange === "yesterday") {
    let data = graphData?.meta_data?.slice(0, graphData.data.length + 1);
    if (!!data && data.length > 0)
      data.forEach((d) => {
        let totalMinutes = convertToMinutes(d.y);
        if (totalMinutes !== 0) {
          gData.push({
            label: domain_from_url(d.name),
            value: totalMinutes,
          });
        } else {
          zeroValueData.push({
            label: domain_from_url(d.name),
            value: 0,
          });
        }
      });
  } else {
    gData = graphData?.graphLabels?.map((label, index) => {
      return {
        label: domain_from_url(label),
        value: +graphData.data[index] * 60,
      };
    });
  }

  if (timeRange === "today" || timeRange === "yesterday") {
    graphWithZeroValue(gData, zeroValueData);
  }

  return { transformData: gData };
};

export const transformDesktopData = (graphData, timeRange) => {
  let transformDataStructure = {
    transformData: [],
    browsers: [],
    cities: [],
  };

  if (!graphData) return transformDataStructure;

  let browsers = new Set();
  let cities = new Set();

  let gData = [];
  let zeroValueData = [];

  let selectedLabel = "";
  switch (timeRange) {
    case "week":
    case "lastweek": {
      selectedLabel = "days";
      break;
    }
    case "month":
    case "lastmonth": {
      selectedLabel = "weeks";
      break;
    }
    case "year":
    case "lastyear": {
      selectedLabel = "months";
      break;
    }
  }

  if (selectedLabel)
    gData = graphLabels[selectedLabel].map((label) => {
      return { label, value: 0 };
    });

  graphData.forEach((data) => {
    let standardDate = new Date(data.timestamp);

    if (data?.browser_name !== "" && data?.browser_name !== null) {
      browsers.add(data?.browser_name);
    }
    if (data?.city !== "" && data?.city !== null) {
      cities.add(data?.city);
    }

    let totalMinutes = convertToMinutes(data.access_time);

    //@TODO convert to switch statement to fall under default condition
    if (timeRange === "today" || timeRange === "yesterday") {
      let label = "";
      if (data.url !== "" && data.url !== null) {
        label = domain_from_url(data.url);
      } else {
        console.log("LABLE_ACTIVE>>", data.activeSoftware);
        label = data.activeSoftware;
      }
      if (label.length > LABEL_LENGTH) {
        label = label.slice(0, LABEL_LENGTH) + "..";
      }
      // if (totalMinutes !== 0) {
      return gData.push({
        label,
        value: totalMinutes,
      });
      // } else {
      // return zeroValueData.push({
      //   label,
      //   value: totalMinutes,
      // });
      // }
    }

    if (timeRange === "week" || timeRange === "lastweek") {
      gData[getDay(standardDate)].value += totalMinutes;
    }

    if (timeRange === "month" || timeRange === "lastmonth") {
      gData[getWeekOfMonth(standardDate) - 1].value += totalMinutes;
    }

    if (timeRange === "year" || timeRange === "lastyear") {
      gData[getMonth(standardDate)].value += totalMinutes;
    }
  });

  if (timeRange === "today" || timeRange === "yesterday") {
    graphWithZeroValue(gData, zeroValueData);
  }

  return {
    transformData: gData.sort((a, b) => b.value - a.value),
    browsers,
    cities,
  };
};

//accept HH.MM.SS or HH.MM or HH:MM:SS or HH:MM
const convertToMinutes = (value) => {
  let time = "";
  if (typeof value === "number") {
    time = value + time;
  } else {
    time = value;
  }

  let minutesArray;

  if (time.includes(".")) {
    minutesArray = time.split(".");
  }

  if (time.includes(":")) {
    minutesArray = time.split(":");
  }

  if (Array.isArray(minutesArray)) {
    let totalMinutes =
      (+minutesArray[0] || 0) * 60 +
      (+minutesArray[1] || 0) +
      (+minutesArray[2] || 0) / 60;
    return totalMinutes;
  } else {
    return 0;
  }
};

export const transformPerformanceData = () => {
  console.log("HELLO WORLD");
};
