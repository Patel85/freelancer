import api from "./api";
import {
  transformDesktopData,
  transformMobileData,
} from "./dashboard/transformData";

const getProffesions = async () => {
  try {
    let { data: CorporateProfession } = await api.get(
      "/auth/view_profession/2"
    );
    CorporateProfession.forEach((prof) => (prof.type = "corporate"));

    let { data: IndividualProfession } = await api.get(
      "/auth/view_profession/1"
    );
    IndividualProfession.forEach((prof) => (prof.type = "individual"));

    return {
      corporate: CorporateProfession,
      individual: IndividualProfession,
    };
  } catch (error) {
    console.log(error, "dashboard service getProffesions");
  }
};

const getCountries = () => {
  return api.get("/auth/countries").then((res) => res.data || []);
};

const getOrganisationSizes = () => {
  return api.get("/auth/members").then((res) => res.data || []);
};

const getTimeRanges = () => {
  return api.get("/monitor/viewtimerange").then((res) => {
    return {
      timeRanges: res.data.sort((a, b) => +a.order - +b.order),
    };
  });
};

const getDesktopGraphData = (time, serial_no) => {
  return api
    .get(`/monitor/monitor-list?duration=${time}&serial_no=${serial_no}`)
    .then((res) => {
      if (res.data["message"] !== "please provide sub_user_serial_no.") {
        return {
          raw: res.data || [],
          transform: transformDesktopData(res.data, time) || [],
        };
      } else {
        return {
          raw: [],
          transform: transformDesktopData([], time) || [],
        };
      }
    });
};

const getMobileGraphData = (time, serial_no) => {
  return api
    .get(`/mobile/user/datausage?duration=${time}&serial_no=${serial_no}`)
    .then((res) => {
      return {
        raw: res.data || [],
        transform: transformMobileData(res.data, time) || [],
      };
    });
};

const getAnalyzeResultData = (time) => {
  return api.get(`ml/analyze/?duration=${time}`).then((res) => {
    if (res.status === 500) {
      return [];
    }
    return res.data;
  });
};

const downloadCSV = async (path, filename = "file") => {
  const downloadCsv = async (res) => {
    if (res.status === 200) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename + ".csv");
      document.body.appendChild(link);
      link.click();
      return true;
    } else {
      console.log(`Error code ${res.status}`);
      return false;
    }
  };

  try {
    let response = await api.get(path);
    let isSuccessfulDownload = await downloadCsv(response);
    return isSuccessfulDownload;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const DashboardService = {
  getProffesions,
  getCountries,
  getOrganisationSizes,
  getTimeRanges,
  getDesktopGraphData,
  getMobileGraphData,
  getAnalyzeResultData,
  downloadCSV,
};

export default DashboardService;
