<template>
    <a-tabs
      :active-key="customActiveKey"
      :tab-bar-style="{ textAlign: 'center', borderBottom: 'unset' }"
      @change="tabClickHandle"
    >
      <!-- 帐密登陆 -->
      <a-tab-pane key="passwd" tab="账号密码登录">
        <a-form
          v-show="isShow"
          class="user-layout-login"
          :model="loginForm"
          ref="loginRef"
          :rules="loginRules"
        >
        <a-form-item name="phone">
          <a-input
            size="large"
            type="text"
            placeholder="请输入电话号码"
            v-model:value="loginForm.phone"
          >
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>

        <a-form-item name="passwd">
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="请输入用户密码"
            v-model:value="loginForm.passwd"
          >
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
      </a-form>
      </a-tab-pane>

      <!-- 手机号登陆 -->
      <a-tab-pane key="sms" tab="手机号登录">
        <a-form
          v-show="isShow"
          class="user-layout-login"
          :model="loginForm"
          ref="loginRef"
          :rules="loginRules"
          @finish="confirmHandle"
        >
          <a-form-item name="phone">
            <a-input
              size="large"
              type="text"
              placeholder="请输入电话号码"
              v-model:value="loginForm.phone"
            >
              <template #prefix><MobileOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item name="smsCode">
                <a-input
                  size="large"
                  type="text"
                  placeholder="请输入验证码"
                  v-model:value="loginForm.smsCode"
                >
                  <template #prefix><MailOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                @click="sendSmsCodeHandle"
                :disabled="smsSendType"
              >
                {{(!smsSendType && '获取验证码') || time + ' s'}}
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    <a-form>
      <a-form-item>
        <a href="javascript:(0);" @click="showRegisterModalHandle">
          账号注册
        </a>
        <a
          class="forge-password"
          style="float: right"
          href="javascript:(0);"
          @click="showForgerModalHandle"
        >
          忘记密码
        </a>
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          @click.stop.prevent="confirmHandle"
          block
        >
          确定
        </a-button>
      </a-form-item>
    </a-form>
  <book-register ref="bRegister" />
  <book-forget ref="bForget" />
</template>
<script lang="ts" setup>
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons-vue';
import { postLogin, postSmsCode } from '@/api/login';
import { getArtUser } from '@/api/artUser';
import { setToken, setUser } from '@/utils/auth';
import { useStore } from 'vuex';
import { ref, reactive, UnwrapRef, onBeforeUnmount } from 'vue';
import { LoginForm } from '@/types/index';
import { message } from 'ant-design-vue';
import BookRegister from 'components/login/register.vue';
import BookForget from 'components/login/forget.vue';
import { checkFormData } from '@/utils/index'

const bRegister = ref()
const bForget = ref()
const store = useStore();
// 切换登陆方式
const customActiveKey = ref<String>('passwd');
const loginRef = ref<any>();

// 验证码发送状态
const smsSendType = ref<Boolean>(false)
const smsNum:number = 60
const time = ref<number>(smsNum)
let intervalCtx:any = null

// 表单输入
const loginForm:UnwrapRef<LoginForm> = reactive({
  phone: '',
  passwd: '',
  smsCode: null
})

const { isShow } = defineProps({
  isShow: {
    type: Boolean,
    require: true
  }
})
const emits = defineEmits(['closeHandle'])

const loginRules = {
  phone: [{
    required: true,
    message: '请输入正确的手机号',
    pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
    trigger: 'change'
  }],
  smsCode: [{
    required: true,
    message: '请输入正确的验证码',
    pattern: /^\d{6}$/,  trigger: 'change'
  }],
  passwd: [{
    required: true,
    message: '请输入正确的密码',
    pattern: /^(?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/,
    trigger: 'change'
  }],
}

const confirmHandle = async () => {
  let payload:any  = {}
  // 确认验证是否有问题
  const checkVal = await checkFormData(loginRef)
  if(!checkVal) {
    message.error('请正确输入信息！')
    return false
  }
  if (customActiveKey.value ==='passwd') {
    // 账号密码
    const { phone, passwd } = loginForm
    payload = { phone, passwd, type: 0 }
  } else {
    // 验证码
    const { phone, smsCode } = loginForm
    payload = { phone, smsCode, type: 1 }
  }
  const { code, data: { token, user } } = await postLogin(payload)|| {}
  if (code === 0 && token && user) {
    setToken(token)
    setUser(user._id)
    // 查询用户信息
    const { code, data } = await getArtUser(user._id)|| {}
    if(code === 0 && data) {
      store.commit('setUserActive', data)
      emits('closeHandle')
    } else {
      message.error('登录失败，请重试！')
    }
  } else {
    message.error('登录失败，请重试！')
  }
}

// 倒计时
function countDown () {
  intervalCtx = setInterval(() => {
    if (time.value <= 1) {
      clearInterval(intervalCtx);
      smsSendType.value = false
      time.value = smsNum
    } else {
      time.value -= 1
    }
  }, 1000)
}

onBeforeUnmount(() => {
  clearInterval(intervalCtx);
  intervalCtx = null
})

// 请求验证码
const sendSmsCodeHandle = async () => {
  if(loginForm.phone) {
    countDown()
    const { code, data: { errmsg, result } } = await postSmsCode({ phone: loginForm.phone })
    if (code === 0 && result === 0) {
      smsSendType.value = true
      message.success('验证码发送成功！');
    } else {
      message.error(errmsg)
    }
  } else {
    message.error('请正确输入手机号！');
  }
}


const tabClickHandle = (val: string) => {
  customActiveKey.value =val
}

const showRegisterModalHandle = () => {
  emits('closeHandle')
  bRegister.value.showModal()
}

const showForgerModalHandle = () => {
  emits('closeHandle')
  bForget.value.showModal()
}

</script>
<style lang="scss" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
  .forge-password {
    font-size: 14px;
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>

