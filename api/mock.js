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
  ],
});
