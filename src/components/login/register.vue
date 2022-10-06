<template>
  <a-modal
    v-model:visible="showRegister"
    title="注册"
    centered
    :mask-closable="false"
    :footer="null"
    width="360"
    @cancel="registerModalCancelHandle"
  >
    <div class="main user-layout-register">
      <a-form
        ref="registerRef"
        :rules="registerRules"
        :model="registerForm">
        <a-form-item name="phone">
          <a-input
            size="large"
            placeholder="请输入手机号码"
            autocomplete="false"
            v-model:value="registerForm.phone"
          >
          </a-input>
        </a-form-item>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="16">
            <a-form-item name="smsCode">
              <a-input
                size="large"
                type="text"
                autocomplete="false"
                placeholder="请输入验证码"
                v-model:value="registerForm.smsCode"
              >
                <template #prefix><MailOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <a-button
              class="getCaptcha"
              size="large"
              :disabled="smsSendType"
              @click="sendSmsCodeHandle"
              v-text="(!smsSendType && '获取验证码') || time + ' s'"
            ></a-button>
          </a-col>
        </a-row>
        <a-form-item name="passwd">
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码不少于8位,必须包含大小写和特殊字符"
              v-model:value="registerForm.passwd"
            ></a-input>
          </a-form-item>
        <a-form-item name="rePasswd">
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="确认密码"
            v-model:value="registerForm.rePasswd"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            size="large"
            type="primary"
            html-type="submit"
            class="register-button"
            :loading="registerBtn"
            :disabled="registerBtn"
            @click.stop.prevent="registerHandle"
            >注册
          </a-button>
          <a class="login" href="javascript:(0);" @click="showLoginModalHandle"
            >使用已有账户登录</a
          >
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  <book-login ref="bLogin"></book-login>
</template>

<script lang="ts" setup>
import { ref, reactive, UnwrapRef, onBeforeUnmount } from 'vue'
import { MailOutlined } from '@ant-design/icons-vue';
import { postRegister, postSmsCode } from '@/api/login';
import { RuleObject } from 'ant-design-vue/es/form/interface';
import { RegisterForm } from '@/types/index';
import { message } from 'ant-design-vue';
import BookLogin from 'components/login/login.vue';
import { checkFormData } from '@/utils/index'

const showRegister = ref<boolean>(false)
const registerBtn = ref<boolean>(false)
const smsSendType = ref<boolean>(false)
const registerRef = ref()
const smsNum:number = 60
const time = ref<number>(smsNum)
let intervalCtx:any = null

const bLogin = ref()

const validateRepasswd = async ( rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入密码');
  } else if (value !== registerForm.passwd) {
    return Promise.reject("两次输入密码不同");
  } else {
    return Promise.resolve();
  }
}

const registerRules = {
  phone: [{ 
    required: true,
    message: '请输入正确的手机号',
    pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
    trigger: 'change'
  }],
  smsCode: [{
    required: true,
    message: '请输入正确的验证码',
    pattern: /^\d{6}$/,
    trigger: 'change'
  }],
  passwd: [{
    required: true,
    message: '请输入正确的密码',
    pattern: /^(?![A-z0-9]+$)(?=.[^%&',;=?$\x22])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/,
    trigger: 'change'
  }],
  rePasswd: [{
    required: true,
    validator: validateRepasswd,
    trigger: 'change'
  }]
}

const registerForm:UnwrapRef<RegisterForm> = reactive({
  phone: '',
  passwd: '',
  smsCode: null,
  rePasswd: ''
})

const showModal = () => {
  showRegister.value = true
}
const registerModalCancelHandle = () => {
  showRegister.value = false
  registerRef.value.resetFields();
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
  if(registerForm.phone) {
    countDown()
    const { code, data: { errmsg, result } } = await postSmsCode({ phone: registerForm.phone })
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

function resetRegister() {
  // 重置表单
  registerRef.value.resetFields();
  showRegister.value = false;
}


// 发起请求
const registerHandle = async () => {
  // 确认验证是否有问题
  const checkVal = await checkFormData(registerRef)
  if(!checkVal) {
    message.error('请正确输入信息！')
    return false
  }
  const { code ,data: { token, result, errmsg }} = await postRegister(registerForm)
  if (code === 0 && token) {
    message.success('注册成功！');
    resetRegister()
  } else if (errmsg) {
    message.error(errmsg)
  } else {
     message.error('注册失败，请重试！')
  }
}

const showLoginModalHandle = () => {
  resetRegister()
  bLogin.value.showModal()
}

defineExpose({
  showModal
})
</script>
<style lang="scss" scoped>
.main {
  min-width: 260px;
  width: 368px;
  padding: 10px;
  margin: 0 auto;
}
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
  .register-button {
    width: 50%;
  }
  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
