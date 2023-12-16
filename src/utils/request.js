import axios from "axios";
import config from "./config";
import router from "../router";
import cookies from "../utils/cookies";
import utils from "@/utils/util.js";
import md5 from "js-md5";
import { Toast } from "vant";

var service = axios.create({
  baseURL: config.BASEURL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config) => {
    config.data = Object.assign(config.data, getBodyData());
    var token = cookies.get("tokenSP") || "";
    if (token) {
      config.data["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    switch (res.code) {
      case 401:
        cookies.remove("tokenSP");
        router.replace("/login");
        return res;
      case 1:
        return res;
      case 2:
        return res;
      default:
        return res;
    }
  },
  (error) => {
    if (error.toString().indexOf("401") !== -1) {
      cookies.remove("tokenSP");
      router.replace("/login");
      Toast({
        message: window.vm.$t("common.loginLose"),
        duration: 2000,
      });
    } else {
      // Toast({
      //   message: window.vm.$t('common.netowrkToast'),
      //   duration: 2000
      // })
      // setTimeout(function() {
      //   Toast.clear({
      //     clearAll: true
      //   })
      // }, 2000)
    }
    return Promise.reject(error);
  }
);

export default service;

const appid = "21210416";
const secret = "ykzc";

function getBodyData() {
  const times = new Date().getTime().toString();
  const ranstr = utils.generateRandomAlphaNum(16).toString();
  const str = appid + times + ranstr;
  const sign = md5(md5(str) + secret);
  const data = {
    sign,
    appid: appid,
    secret: secret,
    times: times,
    ranstr: ranstr,
  };
  return data;
}
