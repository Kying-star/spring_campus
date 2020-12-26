/**
 * @sort 1
 * @name 接口示例
 * 接口描述
 */
const { api } = require("apite");

api.get("/user", {
  name: "王炬欣",
  school: "重庆邮电大学",
  phone: "17353142976"
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
      answer: ["稳中求进", "新发展理念", "改革开放"]
    },
    {
      order: 2,
      topic_type: "number",
      question:
        "党的十九届五中全会于2020年10月keyword日keyword至keyword日在北京胜利召开。",
      answer: ["马克思列宁主义", "毛泽东思想", "邓小平理论"]
    },
    {
      order: 3,
      topic_type: "choice",
      question:
        "把keyword放在第一位，把握扩大内需这个战略基点，深化供给侧结构性改革，加大宏观政策应对力度，扎实做好“六稳”工作、全面落实“六保”任务，",
      answer: [
        "A.经济发展",
        "B.人民生命安全和身体健康",
        "C.生态建设",
        "D.国家统一"
      ]
    }
  ]
});
