<template>
  <div class="page">
    <div class="page-header">
      <div class="hader-title">现在开启灯塔，链接你的忠实粉丝</div>
      <div class="header-btn">立即注册</div>
    </div>
    <div class="page-writer">
      <div class="page-wrap">
        <div class="page-title">作家为中心，沉浸式链接粉丝</div>
        <div class="page-item">
          <div class="page-text">以作家为中心，帮助作家建立个人IP，打造个人知识城墙</div>
          <div  class="page-info">专注创作，灯塔帮你一站式的链接与管理粉丝，帮助作家形成马太效应</div>
        </div>

        <div class="page-item">
          <div class="page-text">平台化管理方式，一站式操作、简化流程，打通创作、管理、变现渠道</div>
          <div class="page-info">管理更加简单，创作更加便捷，知识变现更加方便</div>
        </div>

        <div class="page-item">
          <div class="page-text">杜绝干扰，沉浸式触达</div>
          <div class="page-info">平台专属个人主页，内容沉浸式，杜绝其他内容干扰，构建专属私域</div>
        </div>
      </div>
      <div class="img-container">
        <img src="@/assets/fans.png" />
      </div>
    </div>

    <div class="page-writer">
      <div class="img-container img-left">
        <img src="@/assets/lighthouse.png" />
      </div>
      <div class="page-wrap wrap-right">
        <div class="page-title">多渠道触达、一站式分发</div>
        <div class="page-item">
          <div class="page-text">负坐标-灯塔一站式分发</div>
          <div  class="page-info">一站式创作，自动多渠道分发机制</div>
        </div>

        <div class="page-item">
          <div class="page-text">专属邮件触达</div>
          <div class="page-info">数据邮件式分发，直接触达粉丝用户</div>
        </div>

        <div class="page-item">
          <div class="page-text">公众号、微信小程序、负坐标平台多渠道呈现</div>
          <div class="page-info">一源数据，多源展示。目前多站点触达渠道逐步扩展中</div>
        </div>
      </div>
    </div>

    <div class="page-writer">
      <div class="page-wrap">
        <div class="page-title">数据无价，多重保障，多重校验</div>
        <div class="page-item">
          <div class="page-text">数据无价，多重数据保障方式为你的创作护航</div>
          <div  class="page-info">多重数据保障机制与用户校验机制，区分粉丝与游客，帮助作家更好的维护数据与粉丝权益</div>
        </div>

        <div class="page-item">
          <div class="page-text">数据自主，支持数据导出，整体迁移</div>
          <div class="page-info">支持数据的导出与备份，方便作家对数据资产的管理</div>
        </div>

        <div class="page-item">
          <div class="page-text">粉丝数据独立专属，支持会员信息同步与迁移</div>
          <div class="page-info">个人粉丝数据专属且独立，支持同步与迁移，方便更好的对接更多的渠道来维护私域</div>
        </div>
      </div>
      <div class="img-container">
        <img src="@/assets/verify.png" />
      </div>
    </div>
    <div class="page-footer">
      <div class="footer-title">现在开启灯塔，链接你的忠实粉丝</div>
      <div class="footer-btn"><span>立即注册</span></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page{
  background: $bgColor;
  padding: 8px 0;
  .page-header {
    background: rgba(64, 169, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 41px;
    .header-title {
      @include font-size
    }
    .header-btn {
      width: 120px;
      height: 36px;
      background: $white;
      border-radius: 4px;
      background-color: $white;
      color: $blue;
      font-size: 14px;
      line-height:  36px;
      text-align: center;
      user-select: none;
      cursor: pointer;
      &:active{
        opacity: 0.8;
      }
    }
  }
  .page-writer {
    display: flex;
    align-items: center;
    padding: 60px 41px;
    justify-content: space-between;
    background: $white;
    margin: 24px 0;
    flex-wrap: wrap;
    .wrap-right{
      padding-right: 10%;
    }
    .img-left{
      padding-right: 0;
    }
    .page-wrap {
      .page-title {
        font-size: 24px;
        font-weight: 500;
        color: $blue;
      }
      .page-item {
        padding: 8% 0;
        .page-text {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 0.85);
        }
        .page-info {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 0.85);
          line-height: 20px;
        }
      }
    }
    .img-container{
      flex-shrink: 0;
      width: 40%;
      padding-right: 10%;
      &> img{
        width: 100%;
        height: 100%;
      }
    }
  }

  .page-footer{
    height: 197px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: $blue;
    @include border-1px;
    padding: 20px 0;
    .footer-title{
      width: 100%;
      font-size: 28px;
      font-weight: 400;
      color: $white;
      line-height: 40px;
    }
    .footer-btn{
      width: 100%;
      & > span{
        margin: 0 auto;
        display: block;
        width: 300px;
        height: 56px;
        background: $white;
        border-radius: 4px;
        text-align: center;
        line-height: 56px;
        user-select: none;
        color: $blue;
        font-size: 20px;
        cursor: pointer;
        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>