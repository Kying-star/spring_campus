/*
 * @Author: your name
 * @Date: 2020-12-28 19:52:32
 * @LastEditTime: 2021-06-15 12:03:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/services/config.js
 */
export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://be-prod.redrock.team/spring-campus"
    : "/api";

// export const openid = localStorage.getItem("openid");
export const openid =
  process.env.NODE_ENV === "production"
    ? localStorage.getItem("openid")
    : "as123";
export const token = localStorage.getItem("openid_token2");
