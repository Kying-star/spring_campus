/*
 * @Author: your name
 * @Date: 2020-12-27 14:56:22
 * @LastEditTime: 2020-12-27 16:38:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /the-19th-committee/api/mock.js
 */
/**
 * @sort 1
 * @name 接口示例
 * 接口描述
 */
const { api } = require("apite");

api.get("/user", {
  name: "王炬欣",
  school: "重庆邮电大学",
  phone: "17353142976",
});
/**
 * @param {string} name 名称
 * @param {string} school 学校
 * @param {string} phone 手机号
 */
api.post("/user", "ok");

api.get("/topic", {
  type: "plan",
  data: [
    {
      topic_type: "click",
      order: 1,
      question: "坚持keyword工作总基调，坚持keyword，坚定不移推进keyword。",
      answer: ["稳中求进", "新发展理念", "改革开放"],
    },
    {
      topic_type: "click",
      order: 2,
      question:
        "沉着有力应对各种风险挑战，统筹keyword和keyword工作，把keyword和keyword放在第一位。",
      answer: ["新冠肺炎疫情防控", "经济社会发展", "人民生命安全", "身体健康"],
    },
    {
      topic_type: "click",
      order: 3,
      question:
        "keyword好于预期，keyword得到有力保障，keyword保持稳定，中国特色大国外交积极推进，党和国家各项事业取得新的重大成就。",
      answer: ["经济增长", "人民生活", "社会大局"],
    },
    {
      topic_type: "click",
      order: 4,
      question:
        "坚决维护国家keyword利益，疫情防控工作取得keyword，keyword扎实推进。",
      answer: ["主权、安全、发展", "重大战略成果", "三大攻坚战"],
    },
    {
      topic_type: "choice",
      order: 5,
      question:
        "全会审议通过了《中共中央关于制定国民 经济和社会发展keyword的建议》（以下简称《建 议》）.",
      answer: [
        "A.第十三个五年规划和二零三五年远景目标",
        "B.第十三个五年规划和二零三五年远景目标",
        "C.第十三个五年规划和二零三五年远景目标",
        "D.第十三个五年规划和二零三五年远景目标"
      ],
      key: 0
    },
    {
      topic_type: "choice",
      order: 6,
      question:
        "全会审议通过了《中共中央关于制定国民 经济和社会发展keyword的建议》（以下简称《建 议》）.",
      answer: [
        "A.第十三个五年规划和二零三五年远景目标",
        "B.第十三个五年规划和二零三五年远景目标",
        "C.第十三个五年规划和二零三五年远景目标",
        "D.第十三个五年规划和二零三五年远景目标"
      ],
      key: 0
    },
    {
      topic_type: "choice",
      order: 7,
      question:
        "全会审议通过了《中共中央关于制定国民 经济和社会发展keyword的建议》（以下简称《建 议》）.",
      answer: [
        "A.第十三个五年规划和二零三五年远景目标",
        "B.第十三个五年规划和二零三五年远景目标",
        "C.第十三个五年规划和二零三五年远景目标",
        "D.第十三个五年规划和二零三五年远景目标"
      ],
      key: 0
    },
    {
      topic_type: "choice",
      order: 8,
      question:
        "全会审议通过了《中共中央关于制定国民 经济和社会发展keyword的建议》（以下简称《建 议》）.",
      answer: [
        "A.第十三个五年规划和二零三五年远景目标",
        "B.第十三个五年规划和二零三五年远景目标",
        "C.第十三个五年规划和二零三五年远景目标",
        "D.第十三个五年规划和二零三五年远景目标"
      ],
      key: 0
    },
    {
      topic_type: "choice",
      order: 9,
      question:
        "全会审议通过了《中共中央关于制定国民 经济和社会发展keyword的建议》（以下简称《建 议》）.",
      answer: [
        "A.第十三个五年规划和二零三五年远景目标",
        "B.第十三个五年规划和二零三五年远景目标",
        "C.第十三个五年规划和二零三五年远景目标",
        "D.第十三个五年规划和二零三五年远景目标"
      ],
      key: 0
    },
    {
      topic_type: "choice",
      order: 10,
      question:
        "全会审议通过了《中共中央关于制定国民 经济和社会发展keyword的建议》（以下简称《建 议》）.",
      answer: [
        "A.第十三个五年规划和二零三五年远景目标",
        "B.第十三个五年规划和二零三五年远景目标",
        "C.第十三个五年规划和二零三五年远景目标",
        "D.第十三个五年规划和二零三五年远景目标"
      ],
      key: 0
    },
  ],
});

api.get("analysis", {
  type: "basic",
  datas: [
    {
      order: "1",
      data:
        "中国共产党第十九届中央委员会第五次全体会议，于2020年10月26日至29日在北京举行。全会由中央政治局主持。除中央委员、候补中央委员外。",
      url: "https://picsum.photos/id/83/200/300",
    },
    {
      order: "2",
      data: "ssss",
      url: "https://picsum.photos/id/830/200/300",
    },
    {
      order: "3",
      data: "ssss",
      url: "https://picsum.photos/id/831/200/300",
    },
    {
      order: "4",
      data: "ssss",
      url: "https://picsum.photos/id/834/200/300",
    },
  ],
});

api.get("/score", {
  name: "十九届五中全会基本情况",
  score: "31.64秒",
  ranking: "排行榜（第八名）",
  percent: "99.9%",
});

/**
 * @param {string} type 类型
 * @param {number} score 分数
 */
api.post("/score", "ok");
