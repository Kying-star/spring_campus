/**
 * 所有的接口请求
 */
import { get, post } from "./http";

// 个人信息页面

/**
 * 获取个人信息
 */
export const getUserInfo = () => get("/user");

/**
 *
 * 修改用户信息
 * @param {string} username 用户名
 * @param {string} school 学校
 * @param {string} phone 电话
 */
export const updateUserInfo = ({ name, school, phone }) =>
  post("/user", { name, school, phone });

//排行榜页面

/**
 * 获取排行版数据
 */
export const getRankList = () => get("/list");

//板块选择页面

/**
 *  获取板块信息
 */
export const getPlateList = () => get("/plate");

//答题页面

/**
 *
 * @param {string} type 题目类型 basic,achievement,target,plan
 */
export const getQuestion = type => get("/topic", { type });

/**
 *
 * @param {string} type 题目所属于板块
 */
export const getAnalysis = type => get("/analysis", { type });

/**
 *
 * @param {string} type 题目所属于板块
 */
export const getScore = type => get("/score", { type });

/**
 *
 * @param {string} type 题目所属于板块
 * @param {string} score 分数 xx.xx秒
 */
export const updateScore = (type, score) => post("/score", { type, score });
