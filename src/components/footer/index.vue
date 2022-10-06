<template>
  <footer class="footer-container">
    <div class="footer-warp">
      <div class="footer-left">
        <div>关于平台</div>
        <div>灯塔为创作者提供点对点的内容传播平台。通过灯塔平台、邮件服务、小程序等多种渠道帮助作家触达粉丝。让作家回归知识创作，专注内容的本质。</div>
        <div class="footer-link">立即开通灯塔创作者 ></div>
      </div>
      <div class="footer-info">
        <div class="info-item">
          <div class="title">友情链接：</div>
          <div>负坐标网</div>
          <div>PMXY</div>
          <div>UEDART</div>
        </div>
        <div class="info-item">
          <div class="title">服务支持：</div>
          <div>新手指南</div>
          <div>关于我们</div>
          <div>用户协议</div>
        </div>
        <div class="info-item">
          <div class="title">联系我们：</div>
          <div>QQ：1041415167</div>
          <div>商务邮箱：1041415167@qq.com</div>
          <div>投诉意见：1041415167@qq.com</div>
        </div>
      </div>
    </div>
    <div class="footer-copyright">Copyright © 2015-2022 成都蜀软科技有限公司 All Rights Reserved. 蜀ICP备15020529号</div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-container{
  background: $fontColor;
  color:  rgba(255, 255, 255, 0.85);
  padding: 24px 100px;
  text-align: left;
  height: $footerHeight;
  .footer-warp{
    display: flex;
    justify-content: space-between;
    .footer-left {
      width: 323px;
      height: 160px;
      line-height: 32px;
      .footer-link{
        color: rgba(64, 169, 255, 1);
        cursor: pointer;
        user-select: none;
      }
    }
    .footer-info{
      display: flex;
      justify-content: space-between;
      .info-item{
        line-height: 32px;
        padding-left: 60px;
        .title{
          padding-bottom: 30px;
        }
      }
    }
  }
  .footer-copyright{
    text-align: center;
    margin-top: 20px;
    line-height: 32px;
    font-size: 14px;
    color:rgba(255, 255, 255, 0.85);
  }
}
</style>