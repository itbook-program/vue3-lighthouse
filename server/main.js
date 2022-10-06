let express = require('express');   //引入express
let Mock = require('mockjs');       //引入mock
const cors = require('cors');
let app = express();        //实例化express

const {
    smsModal,
    loginModal,
    postOrderModal,
    getArtListModal,
    getArticleModal,
    getArtDetailModal,
    getSubscribeModal,
    getSubinfoByIdModal,
    putUserInfoByIdModal,
    getUserInfoByIdModal,
    getCheckArtDetailModal,
    postCheckSubscribeModal,
    getOrderStatisticsByIdModal,
    getSubscribeCheckTypeByIdModal
 } = require('./model/index')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors());

// 注册
app.use('/auth/api/v1/register', (req, res) => res.json(registerModal))

// 登录
app.post('/auth/api/v1/login', (req, res) => res.json(loginModal))

// 短信验证码
app.post('/auth/api/v1/smsCode', (req, res) => res.json(smsModal))

// 查询个人信息
app.get('/lhs/api/v1/artUser/:id', (req, res) => res.json(getUserInfoByIdModal))

// 更新个人信息
app.put('/lhs/api/v1/artUser/:id', (req, res) => res.json(putUserInfoByIdModal))

// 查询资金流水
app.get('/lhs/api/v1/order/statistics/:id', (req, res) => res.json(getOrderStatisticsByIdModal))

// 查询订阅管理
app.get('/lhs/api/v1/subscribe', (req, res) => res.json(getSubscribeModal))

// 查询设置的订阅信息
app.get('/lhs/api/v1/subinfo/:id', (req, res) => res.json(getSubinfoByIdModal))

// 查询我的文章
app.get('/lhs/api/v1/article', (req, res) => res.json(getArticleModal))

// 根据uid查询用户信息
app.get('/lhs/api/v1/uid/:uid', (req, res) => res.json(getUserInfoByIdModal))

// 根据用户id查询订阅信息
app.get('/lhs/api/v1/subscribe/checkType/:id', (req, res) => res.json(getSubscribeCheckTypeByIdModal))

// 查询文章列表
app.get('/lhs/api/v1/art/list/:uid', (req, res) => res.json(getArtListModal))

// 支付订单
app.post('/lhs/api/v1/order', (req, res) => res.json(postOrderModal))

// 检查订单是否支付
app.post('/lhs/api/v1/order/checkSubscribe', (req, res) => {
    setTimeout(() => {
        res.json(postCheckSubscribeModal)
    }, 2000)
})

// 查询文章详情
app.get('/lhs/api/v1/artDetail/:id', (req, res) => {
    console.log(req.query)
    const { check } = req.query
    if(check) {
        res.json(getCheckArtDetailModal)
    } else {
        res.json(getArtDetailModal)
    }
})


app.listen('8090', () => {
    console.log('mock服务已开启，监听服务：http://localhost:8090')
})