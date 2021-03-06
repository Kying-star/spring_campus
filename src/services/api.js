/*
 * @Author: your name
 * @Date: 2020-12-29 17:12:32
 * @LastEditTime: 2021-06-17 17:48:41
 * @LastEditors: Please set LastEditors
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
export const getUserInfo = () => get("/signIn/check", { openid });

/**
 *
 * 修改用户信息
 * @param {string} username 用户名
 * @param {string} school 学校
 * @param {string} phone 电话
 */
export const updateUserInfo = ({ name, school, phone, nick_name, heard_url }) =>
  post("/signIn", {
    name,
    school,
    phone,
    open_id: openid,
    nick_name,
    heard_url
  });

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
 * @description 获取当前分数
 */
export const getScore = () => get("/score", { openid });

/**
 * @description 获取当前分数
 * @param {number} type 板块类型
 */
export const getProgress = type => get("/progress", { openid, type });

/**
 *
 * @param {string} type 题目所属于板块
 * @param {string} score 正确题目个数
 * @param {string} spend_time 答题时间
 */
export const updateScore = (type, score, spend_time) =>
  post("/score", { openid, type, score, spend_time });

/**
 * @description 更新进度
 * @param {string} type 题目所属于板块
 * @param {string} score 正确题目个数
 * @param {string} spend_time 答题时间
 */
export const updateProgress = (type, score, spend_time, id) =>
  post("/progress", { openid, type, score, spend_time, id });

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
 * @description: 校史卡片页面
 */

export const getHistoryCardPicList = type =>
  get(`/images?openid=${openid}&type=${type}`);

/**
 * @description: 获取图片
 */

export const getCardPic = picture_id =>
  post(`/collection`, { openid, picture_id });

/**
 * @description: 获得当前排名
 */

export const getUserRank = type => get(`rank`, { openid, type });
