const Mock = require("mockjs");

// 查询订阅信息
const getOrderStatisticsByIdModal = Mock.mock({
  "code": 0,
  "data": {
    "order": [
      {
        "price": 3,
        "cid": "62e67bdc94b82292ffcf0062",
        "orderType": 1,
        "orderStatus": 0,
        "type": 0,
        "status": true,
        "_id": "62e67c4494b82292ffcf0101",
        "user": "62e642c55abccc6b30bbb524",
        "createdAt": "2022-07-31T12:57:40.447Z",
        "updatedAt": "2022-07-31T12:57:40.447Z"
      }
    ],
    "count": 1,
    "totalPrice": 3,
    "withdrawal": 0,
    "freeze": 1
  },
  "msg": "请求成功"
})

// 查询订阅管理信息
const getSubscribeModal = Mock.mock(
  {
    "code": 0,
    "data": {
      "count": 1,
      "list": [
        {
          "subCreateTime": "2022-07-31T12:57:40.623Z",
          "unitPrice": 1,
          "duraTime": 3,
          "expCreateTime": "2022-10-31T12:57:40.623Z",
          "info": "",
          "type": 1,
          "status": true,
          "_id": "62e67c4494b82292ffcf010b",
          "email": "104****167@qq.com",
          "user": {
            "userName": "默认用户",
            "costMoney": 0,
            "orderNum": 0,
            "phone": "177****7062",
            "openid": "",
            "contact": "177***7062",
            "email": "",
            "avatar": "",
            "inCode": "",
            "payType": "",
            "payNum": "",
            "isSeller": false,
            "type": 0,
            "_id": "62e644c05abccc6b30bbb525",
            "bindWeChat": null,
            "createdAt": "2022-07-31T09:00:48.303Z",
            "updatedAt": "2022-07-31T09:01:33.141Z"
          },
          "writer": "62e642c55abccc6b30bbb524",
          "expTime": "2022-10-31T12:57:40.623Z",
          "subTime": "2022-07-31T12:57:40.623Z",
          "createdAt": "2022-07-31T12:57:40.625Z",
          "updatedAt": "2022-07-31T13:55:49.905Z"
        }
      ],
      "pageSize": 10,
      "currentPage": 1
    },
    "msg": "请求成功"
  }
)

// 查询订阅设置信息
const getSubinfoByIdModal = Mock.mock(
  {
    "code": 0,
    "data": {
      "unitPrice": 1,
      "info": "支持我，感谢！",
      "times": [
        3,
        6
      ],
      "type": 1,
      "status": true,
      "_id": "62e642c55abccc6b30bbb524",
      "createdAt": "2022-07-31T09:05:11.685Z",
      "updatedAt": "2022-07-31T09:05:15.332Z",
      "user": {
        "userName": "默认用户",
        "costMoney": 0,
        "orderNum": 0,
        "phone": "17780632692",
        "openid": "",
        "contact": "17780632692",
        "email": "",
        "avatar": "",
        "inCode": "",
        "payType": "",
        "payNum": "",
        "isSeller": false,
        "type": 0,
        "_id": "62e642c55abccc6b30bbb524",
        "bindWeChat": null,
        "createdAt": "2022-07-31T08:52:21.472Z",
        "updatedAt": "2022-07-31T13:14:52.042Z"
      }
    },
    "msg": "请求成功"
  }
)

const getArticleModal = Mock.mock(
  {
    "code": 0,
    "data": {
      "count": 1,
      "list": [
        {
          "cover": '@image("200x200", "#50B347", "#FFF", "cover")',
          "looks": 0,
          "likes": 0,
          "weight": 100,
          "title": "Axure入门案例系列 -- 中继器左右交叉时间线",
          "type": 1,
          "status": true,
          "_id": "62e6457a9960cf2c33fe74ec",
          "user": "62e642c55abccc6b30bbb524",
          "createdAt": "2022-07-31T09:03:54.452Z",
          "updatedAt": "2022-07-31T09:04:20.925Z"
        }
      ],
      "pageSize": 10,
      "currentPage": 1
    },
    "msg": "请求成功"
  }
)

// 查询当前用户文章列表
const getArtListModal = Mock.mock(
  {
    "code": 0,
    "data": {
      "count": 1,
      "list": [
        {
          "cover": '@image("200x200", "#50B347", "#FFF", "cover")',
          "looks": 0,
          "likes": 0,
          "weight": 100,
          "title": "Axure入门案例系列 -- 中继器左右交叉时间线",
          "type": 1,
          "status": true,
          "_id": "62e6457a9960cf2c33fe74ec",
          "user": "62e642c55abccc6b30bbb524",
          "createdAt": "2022-07-31T09:03:54.452Z",
          "updatedAt": "2022-07-31T09:04:20.925Z"
        }
      ],
      "pageSize": 10,
      "currentPage": 1
    },
    "msg": "请求成功"
  }
)

// 关注该用户下单
const postOrderModal = Mock.mock(
  {
    "code": 0,
    "data": {
      "order": {
        "user": "62e642c55abccc6b30bbb524",
        "orderTitle": "订购",
        "projectId": "lhs",
        "orderId": "abb6d185-7f52-8bc6-b35b-f80657450613",
        "price": 3,
        "info": "灯塔订购",
        "note": "",
        "childOrder": [],
        "type": 0,
        "orderType": 1,
        "proId": "62e642c55abccc6b30bbb524",
        "status": true,
        "_id": "62e6828ea209d2939b7a3e4b",
        "createdAt": "2022-07-31T13:24:30.764Z",
        "updatedAt": "2022-07-31T13:24:30.764Z"
      },
      "oId": "62e6828ea209d2939b7a3e4b",
      "prInfo": "weixin://wxpay/bizpayurl?pr=iuWFGYpzz"
    },
    "msg": "请求成功"
  }
)

// 检查是否已订阅
const getSubscribeCheckTypeByIdModal = Mock.mock(
  {
    "code": 0,
    "data": false,
    "msg": "请求成功"
  }
)

// 检查是否已支付
const postCheckSubscribeModal = Mock.mock(
  {
    "code": 0,
    "data": 1,
    "msg": "请求成功"
  }
)

// 查询用户是否有权限
const getCheckArtDetailModal = Mock.mock(
  {
    "code": 0,
    "data": true,
    "msg": "请求成功"
  }
)

// 查询文章详情
const getArtDetailModal = Mock.mock(
  {
    "code": 0,
    "data": {
      "cover": '@image("200x200", "#50B347", "#FFF", "cover")',
      "looks": 0,
      "likes": 0,
      "weight": 100,
      "title": "Axure入门案例系列 -- 中继器左右交叉时间线",
      "content": "<h3 style=\"text-indent: 0px; text-align: start;\">前言</h3><p style=\"text-indent: 0px; text-align: start;\">时间线的连续性的展示，可以更加友好的展现发展的时间节点。本文利用中继器实现简单的时间线流程</p><p style=\"text-indent: 0px; text-align: start;\"><img src=\"https://fzb-prod-1300007333.cos.ap-chengdu.myqcloud.com/upload/5f6a0d20d4e9525bf354109d/8E1A1A33C16C9784B7FE0DB9EFEC2CAB.gif?imageMogr2/auto-orient/strip\" alt=\"中继器左右交叉时间线.gif\" data-href=\"\" style=\"height: 866px;\"></p><p style=\"text-indent: 0px; text-align: start;\">中继器左右交叉时间线.gif</p><h3 style=\"text-indent: 0px; text-align: start;\">准备</h3><ul style=\"text-indent: 0px; text-align: start;\"><li>Axure&nbsp;8（或Axure&nbsp;9）软件已安装。</li><li>掌握基本的软件使用。</li></ul><h3 style=\"text-indent: 0px; text-align: start;\">本教程知识点</h3><ul style=\"text-indent: 0px; text-align: start;\"><li>初级的动态面板使用。</li><li>初级的页面交互事件、元件交互事件使用。</li><li>中级中继器使用。</li></ul><h3 style=\"text-indent: 0px; text-align: start;\">详细教程--基础轮播图</h3><h4 style=\"text-indent: 0px; text-align: start;\">功能</h4><ul style=\"text-indent: 0px; text-align: start;\"><li>展示时间线，数据可通过中继器进行维护</li></ul><h4 style=\"text-indent: 0px; text-align: start;\">制作方式</h4><blockquote style=\"text-indent: 0px; text-align: start;\">以简答的纵向时间线为例进行制作。</blockquote><p style=\"text-indent: 0px; text-align: start;\">1、搭建基础的页面组成</p><ul style=\"text-indent: 0px; text-align: start;\"><li>数据部分由中继器包裹动态面板</li><li></li><li>将数据分为左侧与右侧区分</li><li></li><li>数据内容中包括</li></ul><p style=\"text-indent: 0px; text-align: start;\">（1）背景</p><p style=\"text-indent: 0px; text-align: start;\">（2）垂直线</p><p style=\"text-indent: 0px; text-align: start;\">（3）椭圆标志</p><p style=\"text-indent: 0px; text-align: start;\">（4）内容（左侧时间线、右侧时间线）：段落文本</p><blockquote style=\"text-indent: 0px; text-align: start;\">注：段落文本可以进行自动换行，在平时进行制作时，遇到多行文本可以替换单行为多行，这样就不会出现原型某些文字错位的问题。</blockquote><p style=\"text-indent: 0px; text-align: start;\"><img src=\"https://fzb-prod-1300007333.cos.ap-chengdu.myqcloud.com/upload/5f6a0d20d4e9525bf354109d/73EAFA863F68EBC8559E0ACACF9E4F34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\" alt=\"image.png\" data-href=\"\" style=\"height: 533px;\"></p><p style=\"text-indent: 0px; text-align: start;\">image.png</p><p style=\"text-indent: 0px; text-align: start;\">2、搭建基础内容</p><ul style=\"text-indent: 0px; text-align: start;\"><li>创建动态面板：左侧、右侧。分别进行对应内容处理。</li><li>背景：完全填充</li><li>垂直线：与背景等高居中</li><li>椭圆标志：居中</li><li>段落文本：</li><li>（1）左侧：设置文本上下居中，左右居右。同时设置周边10PX填充（保证留有间隔）。</li><li>（2）右侧：设置文本上下居中，左右居左。同时设置周边10PX填充。</li></ul><p style=\"text-indent: 0px; text-align: start;\"><img src=\"https://fzb-prod-1300007333.cos.ap-chengdu.myqcloud.com/upload/5f6a0d20d4e9525bf354109d/2F894D4BBA4F95C0D2BF4E3774CDCB1C.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\" alt=\"\" data-href=\"\" style=\"height: 77px;\"></p><p style=\"text-indent: 0px; text-align: start;\"><img src=\"https://fzb-prod-1300007333.cos.ap-chengdu.myqcloud.com/upload/5f6a0d20d4e9525bf354109d/36BA84F8B6E7A025233756AB056C2218.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\" alt=\"\" data-href=\"\" style=\"height: 238px;\"></p><blockquote style=\"text-indent: 0px; text-align: start;\">小技巧：在设计椭圆标志与垂直线时，由于垂直线为1PX的线条元件，所以在制作椭圆时，要采用奇数的半径，这样就可以完美的展示均分。若线为2PX，需采用偶数的半径。</blockquote><p style=\"text-indent: 0px; text-align: start;\">3、交互处理：如何实现加载进行左右数据呈现</p><ul style=\"text-indent: 0px; text-align: start;\"><li>本次采用判断中继器的奇、偶行加载对应的动态面板。</li></ul><p style=\"text-indent: 0px; text-align: start;\"><img src=\"https://fzb-prod-1300007333.cos.ap-chengdu.myqcloud.com/upload/5f6a0d20d4e9525bf354109d/61727CA4835FEE28B1C818D4773D4ABC.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\" alt=\"image.png\" data-href=\"\" style=\"height: 198px;\"></p><p style=\"text-indent: 0px; text-align: start;\">image.png</p><ul style=\"text-indent: 0px; text-align: start;\"><li>偶数行设置为左侧交互加载。</li><li></li><li>设置判断触发条件。</li><li></li><li>设置中继器动态面板。</li><li></li><li>设置中继器数据的赋值。</li></ul><p style=\"text-indent: 0px; text-align: start;\"><img src=\"https://fzb-prod-1300007333.cos.ap-chengdu.myqcloud.com/upload/5f6a0d20d4e9525bf354109d/087FA9A6A32DC55A8B4B4728271CF45B.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\" alt=\"\" data-href=\"\" style=\"height: 465px;\"></p><p style=\"text-indent: 0px; text-align: start;\"><img src=\"https://fzb-prod-1300007333.cos.ap-chengdu.myqcloud.com/upload/5f6a0d20d4e9525bf354109d/815D7AF303411F3EE4229706F363A9F7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\" alt=\"\" data-href=\"\" style=\"height: 575px;\"></p><p style=\"text-indent: 0px; text-align: start;\"><img src=\"https://fzb-prod-1300007333.cos.ap-chengdu.myqcloud.com/upload/5f6a0d20d4e9525bf354109d/B5D80AD6F6BE6E5F2EF6FB279B24E0E5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\" alt=\"\" data-href=\"\" style=\"height: 576px;\"></p><blockquote style=\"text-indent: 0px; text-align: start;\">储备知识：</blockquote><blockquote style=\"text-indent: 0px; text-align: start;\">isEven&nbsp;用途：判断数据行是否为偶数行；如果是偶数行，返回值为“True”，否则为“False”。</blockquote><blockquote style=\"text-indent: 0px; text-align: start;\">isOdd&nbsp;用途：判断数据行是否为奇数行；如果是奇数行，返回值为“True”，否则为“False”。</blockquote><p style=\"text-indent: 0px; text-align: start;\">3、其它完善</p><ul style=\"text-indent: 0px; text-align: start;\"><li>个人与社团的切换就是常规的双动态面板联动切换。</li><li>数据填充注意数据有效长度，中继器中的数据输入恰当。</li></ul><h4 style=\"text-indent: 0px; text-align: start;\">总结</h4><ul style=\"text-indent: 0px; text-align: start;\"><li>本文主要使用了中继器的奇、偶行的函数，进行了业务逻辑的套用。</li><li>同时在中继器中套用了动态面板展示了不同的状态区间。</li></ul>",
      "type": 1,
      "status": true,
      "_id": "62e6457a9960cf2c33fe74ec",
      "user": "62e642c55abccc6b30bbb524",
      "createdAt": "2022-07-31T09:03:54.452Z",
      "updatedAt": "2022-07-31T09:04:20.925Z"
    },
    "msg": "请求成功"
  }
)

module.exports = {
  postOrderModal,
  getArticleModal,
  getArtListModal,
  getSubscribeModal,
  getArtDetailModal,
  getSubinfoByIdModal,
  getCheckArtDetailModal,
  postCheckSubscribeModal,
  getOrderStatisticsByIdModal,
  getSubscribeCheckTypeByIdModal
}