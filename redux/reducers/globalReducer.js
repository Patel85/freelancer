import {
  RESET_STATE,
  FETCH_PROFESSION,
  FETCH_MEMBERS,
  FETCH_COUNTRY,
  FETCH_DASHBOARD_TIME_RANGE,
  FETCH_GRAPH_DATA,
  FETCH_MOBILE_GRAPH_DATA,
} from "@redux/actions/Types";

const intialState = {
  profession: {
    corporate: [],
    individual: [],
  },
  members: [],
  countries: [],
  dashboardTimeRange: { timeRanges: [], listTimeRanges: [] },
  desktopGraphData: {},
  mobileGraphData: {},
  analyzeResult: {},
};

let GlobalReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case FETCH_PROFESSION:
      return {
        ...state,
        profession: {
          corporate: payload.corporate,
          individual: payload.individual,
        },
      };

    case FETCH_COUNTRY:
      return {
        ...state,
        countries: payload.countries,
      };

    case FETCH_MEMBERS:
      return {
        ...state,
        members: payload.members,
      };

    case FETCH_DASHBOARD_TIME_RANGE:
      return {
        ...state,
        dashboardTimeRange: payload.data,
      };

    case FETCH_GRAPH_DATA:
      return {
        ...state,
        desktopGraphData: { ...state.desktopGraphData, ...payload.data },
      };

    case FETCH_MOBILE_GRAPH_DATA:
      return {
        ...state,
        mobileGraphData: { ...state.mobileGraphData, ...payload.data },
      };

    case FETCH_MOBILE_GRAPH_DATA:
      return {
        ...state,
        analyzeResult: payload.data,
      };

    case RESET_STATE:
      return intialState;

    default:
      return {
        ...state,
      };
  }
};

export default GlobalReducer;
