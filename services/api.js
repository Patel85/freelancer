import axios from "axios";
import { DOMAIN } from "@constants/Path";

const instance = axios.create({
  baseURL: `${DOMAIN}/api/v2`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
