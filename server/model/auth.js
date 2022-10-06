const Mock = require("mockjs");
// 短信验证码
const smsModal = Mock.mock({
  code: 0,
  data: {
    errmsg: 'OK',
    result: 0
  },
  msg: '请求成功'
})

// register 
const registerModal = Mock.mock({
    "code": 0,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOjAsInVpZCI6IjEzNTQwMDc2MDU0IiwidXNlciI6IjYwNTZhMDJjNmNiNTRiNTM2NGQyNTM5OSJ9LCJleHAiOjE2NTk4MzYwNzQsImlhdCI6MTY1OTIzMTI3NH0.4wqtvqc7VErsUlHRBI6LTGAS63T2w_dlYNVxKgva4lc",
      "user": {
        "userName": "默认用户",
        "costMoney": 0,
        "orderNum": 0,
        "phone": "177****6054",
        "openid": "",
        "contact": "177****6054",
        "email": "",
        "avatar": '@image("200x200", "#50B347", "#FFF", "avatar")',
        "inCode": "",
        "payType": "",
        "payNum": "",
        "isSeller": false,
        "type": 0,
        "_id": "600d5a4055d183604144d145",
        "bindWeChat": null,
        "createdAt": "2021-03-21T01:23:56.018Z",
        "updatedAt": "2022-07-30T08:41:41.196Z",
        "passwd": null
      }
    },
    "msg": "请求成功"
  })

// 登录
const loginModal = Mock.mock({
  "code": 0,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOjAsInVpZCI6IjEzNTQwMDc2MDU0IiwidXNlciI6IjYwNTZhMDJjNmNiNTRiNTM2NGQyNTM5OSJ9LCJleHAiOjE2NTk4MzYwNzQsImlhdCI6MTY1OTIzMTI3NH0.4wqtvqc7VErsUlHRBI6LTGAS63T2w_dlYNVxKgva4lc",
    "user": {
      "userName": "默认用户",
      "costMoney": 0,
      "orderNum": 0,
      "phone": "177****6054",
      "openid": "",
      "contact": "177****6054",
      "email": "",
      "passwd": null,
      "avatar": '@image("200x200", "#50B347", "#FFF", "avatar")',
      "inCode": "",
      "payType": "",
      "payNum": "",
      "isSeller": false,
      "type": 0,
      "_id": "6056a02c6cb54b5364d25399",
      "bindWeChat": null,
      "createdAt": "2021-03-21T01:23:56.018Z",
      "updatedAt": "2022-07-30T08:41:41.196Z"
    }
  },
  "msg": "请求成功"
})

module.exports = {
  smsModal,
  loginModal,
  registerModal
}