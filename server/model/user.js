const Mock = require("mockjs");

// 更新个人信息
const putUserInfoByIdModal = Mock.mock(
  {
    "code": 0,
    "data": true,
    "msg": "请求成功"
  }
)

// 查询个人信息
const getUserInfoByIdModal = Mock.mock({
  "code": 0,
  "data": {
    "_id": "6056a02c6cb54b5364d25399",
    "nickname": "我是用户1",
    "professional": "我的职业是学生哦，哈哈哈哈",
    "uid": "907792",
    "info": "我有个简单的简介，希望大家玩的开心，过的高兴！",
    "createdAt": "2021-03-21T01:23:56.018Z",
    "updatedAt": "2022-07-30T08:41:41.196Z",
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
    "bindWeChat": null
  },
  "msg": "请求成功"
})

module.exports = {
  putUserInfoByIdModal,
  getUserInfoByIdModal
}