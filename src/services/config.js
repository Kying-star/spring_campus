/*
 * @Author: your name
 * @Date: 2020-12-28 19:52:32
 * @LastEditTime: 2020-12-28 20:12:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/src/services/config.js
 */
export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://cyxbsmobile.redrock.team/wxapi/nineteenth-committee"
    : "/api";

export const openid = localStorage.getItem("openid");
export const token = localStorage.getItem("openid_token2");
