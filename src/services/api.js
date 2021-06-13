/*
 * @Author: your name
 * @Date: 2020-12-29 17:12:32
 * @LastEditTime: 2021-06-13 16:00:42
 * @LastEditors: myjdml
 * @Description: In User Settings Edit
 * @FilePath: /nineteenth-committee-fe/src/services/api.js
 */
/**
 * 所有的接口请求
 */
import { get, post } from "./http";
import { openid } from "./config";
export const getCookie = () => get("/test");
export const getUserInfo2 = () => get("/utest");
// 个人信息页面

/**
 * 获取个人信息
 */
export const getUserInfo = () => get("/user", { openid });

/**
 *
 * 修改用户信息
 * @param {string} username 用户名
 * @param {string} school 学校
 * @param {string} phone 电话
 */
export const updateUserInfo = ({ name, school, phone }) =>
  post("/user", { name, school, phone, openid });

//排行榜页面

/**
 * 获取排行版数据
 */
export const getRankList = () => get("/list");

//板块选择页面

/**
 *  获取板块信息
 */
export const getPlateList = () => get("/plate", { openid });

//答题页面

/**
 *
 * @param {string} type 题目类型 basic,achievement,target,plan
 */
export const getQuestion = type => get("/problem/getPro", { type });

/**
 *
 * @param {string} type 题目所属于板块
 */
export const getAnalysis = type => get("/analysis", { type });

/**
 *
 * @param {string} type 题目所属于板块
 */
export const getScore = (type, score) => get("/score", { type, openid, score });

/**
 *
 * @param {string} type 题目所属于板块
 * @param {string} score 正确题目个数
 * @param {string} spend_time 答题时间
 */
export const updateScore = (type, score, spend_time) =>
  post("/score", { openid, type, score, spend_time });

/**
 * @description: 获取排行榜
 */
export const getRank = () => get("/list");

/**
 * @description: 获取排行榜数据
 */

export const getBlock = () => get(`/plate?openid=${openid}`);

/**
 * @description: 获取学校名单
 */

export const getSchools = () => get(`/schools`);

/**
 * @description: 获取学校名单
 */

export const getQuestionInfo = () => get(`/problem/getPro?type=3`);

/**
 * @description: 校史卡片页面
 */

export const getHistoryCardPicList = type =>
  get(`/images?openid=${openid}&type=${type}`);
