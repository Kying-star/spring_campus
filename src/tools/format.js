/*
 * @Author: your name
 * @Date: 2021-05-30 21:49:09
 * @LastEditTime: 2021-05-30 21:54:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /spring_campus/src/tools/format.js
 */
export const format = msTime => {
  let time = msTime / 1000;
  let hour = Math.floor(time / 60 / 60);
  hour = hour.toString().padStart(2, "0");
  let minute = Math.floor(time / 60) % 60;
  minute = minute.toString().padStart(2, "0");
  let second = Math.floor(time) % 60;
  second = second.toString().padStart(2, "0");
  return `${hour}:${minute}:${second}`;
};
