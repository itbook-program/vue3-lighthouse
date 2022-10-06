<template>
  <header>
    <div class="header-wrap">
      <div class="header-logo">
        <img src="@/assets/logo.png">
        <span>灯塔</span>
      </div>
      <div class="header-info">
        <div class="header-info__item" @click="homeHandle">首页</div>
        <div class="header-info__item">
          <template v-if="!userInfo">
            <span class="register" @click="handleRegister">注册</span>
            <span class="login" @click="handleLogin">登陆</span>
          </template>
          <div v-else class="item-avatar-warp">
            <img v-if="userInfo.avatar" class="item-avatar__img" :src="formImageUrl(userInfo.avatar)">
            <img v-else class="item-avatar__img" src="@/assets/logo.png" />
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{ userInfo.nickname || '默认用户' }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="personnelHandle">
                    个人信息
                  </a-menu-item>
                  <a-menu-item @click="logoutHandle">
                    登出
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
  <book-login ref="bLogin" />
  <book-register ref="bRegister" />
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue';
import BookLogin from 'components/login/login.vue';
import BookRegister from 'components/login/register.vue';
import { removeToken, removeUser } from '@/utils/auth'
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { UserInfo } from '@/types/index';
import { formImageUrl } from '@/utils/index';
const bLogin = ref()
const bRegister = ref()
const store = useStore()
const router = useRouter()

const userInfo = computed(()=> store.state.user)

const homeHandle = () => {
  router.push('/homePage')  
}

const handleRegister = () => {
  bRegister.value.showModal()
}
const handleLogin = () => {
  bLogin.value.showModal()
}

const personnelHandle = () => {
  router.push('/personal/profile')
}

const logoutHandle = () => {
  store.commit('setUserActive', '')
  removeToken()
  removeUser()
  message.success('退出成功！');
  router.push('/homePage')
}
</script>

<style lang="scss" scoped>
.header-wrap{
  @include flex-center;
  @include border-bottom-1px;
  width: 100%;
  padding: 20px $bodyPadding;
  background-color: $white;
  height: $titleHeight;
  .header-logo{
    display: flex;
    align-items: center;
    & > img{
      width: 46px;
      height: 46px;
    }
    & > span{
      font-weight: 600;
      color: $blue;
      font-size: 20px;
      margin-left: 20px;
    }
  }
}
.register {
  margin: 0 24px;
  color: #666666;
  cursor: pointer;
}
.login {
  color: #666666;
  cursor: pointer;
}
.header-info{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  .header-info__item{
    flex-shrink: 0;
    user-select: none;
    cursor: pointer;
    padding: 0 10px;
    &:active{
      color: $blue;
    }
    .item-avatar-warp{
      display: flex;
      align-items: center;
    }
    .item-avatar__img{
      width: 32px;
      height: 32px;
      margin-right: 10px;
      @include border-1px;
      border-radius: 90px;
    }
  }
}
</style>