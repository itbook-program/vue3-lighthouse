<template>
  <book-title title="账号安全" />
  <ul class="account-list">
    <li class="account-item">
     <span>QQ登录：</span><span>未绑定</span>
      <a-button disabled>暂未开放</a-button>
    </li>
    <li class="account-item">
      <span>微信登录：</span><span>未绑定</span>
      <a-button disabled>暂未开放</a-button>
    </li>
    <li class="account-item">
      <span>手机号：</span><span>{{ userInfo.phone }}</span>
      <a-button disabled>暂不支持修改</a-button>
    </li>
    <li class="account-item">
      <span>密码：</span><span>已设置</span>
      <!-- <a-button type="primary" @click="modifyHandle">修改</a-button> -->
      <a-button disabled>暂不支持修改</a-button>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import BookTitle from 'components/title/index.vue'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
const store = useStore()
let userInfo = ref({
  phone: '',
  bindqq: '',
  bindWeChat: '',
  passwd: ''
})
userInfo = computed(() => store.state.user)

const modifyHandle = () => {
  console.log('点击修改密码')
}

</script>
<style lang="scss" scoped>
.account-list{
  padding: 0 24px;
  .account-item{
    padding: 24px 0;
    display: flex;
    align-items: center;
    & > span{
      display: block;
      width: 180px;
      padding: 0 20px;
    }
    & > span:first-child{
      flex-shrink: 0;
      width: 70px;
      padding: 0;
    }
  }
}
</style>
