
<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.0-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/vuex">
    <img src="https://img.shields.io/badge/vuex-4.0-brightgreen" alt="vuex">
  </a>
   <a href="https://github.com/npm/npm">
    <img src="https://img.shields.io/badge/npm-6.14.4-blue" alt="npm">
   </a>
</p>

# vue3-lighthouse

## 简介
lighthouse项目是《Vue.js 3.0 源码解析》图书配套前端实战案例源码。基于Vue3 + vite2 以及相关技术栈开发。内部集成文章的发布和管理、会员和非会员的阅读权限区分、作者订阅和文章推送等功能。主要包括登录注册模块、写作编辑模块、个人资料模块和订阅管理模块。

《Vue.js 3.0源码解析》是以实现简单Vue3框架为案例，由浅入深介绍Vue3中的各个模块及其实现细节，版主开发者从源码角度学习并理解Vue3中各组件和API的实现逻辑。本书可以帮助开发者在使用框架的同时了解内部原理，让开发者知其然也知其所以然。

项目目的：
- 学习Vue3框架源码
- 学习vue3+ts
- 保持 composition api 风格
- 帮助理解Vue3源码编译后内容

## 地址信息

- [在线demo演示地址](http://www.lighthouse.itbook.club)
- [后端API接口地址](https://doc.v3.itbook.club/swagger-ui.html)


## 启动

项目主要是前端和mock server（node）

```bash
# 克隆项目
git clone https://github.com/itbook-program/vue3-lighthouse.git

# 安装依赖
npm install

# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动前端服务
npm run dev

# 启动mock服务
npm run mock

### 启动本地预览
npm run build
npm run preview
```

## 联系作者

> 大家有任何问题或者建议都可以在 [issues](https://github.com/itbook-program/vue3-lighthouse/issues) 中反馈给我。

 QQ邮箱:
- 1041415167@qq.com
