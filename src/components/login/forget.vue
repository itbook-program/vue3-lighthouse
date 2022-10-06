<template>
  <a-modal
    v-model:visible="showForget"
    title="修改密码"
    centered
    :mask-closable="false"
    :footer="null"
    width="360"
    @cancel="forgetModalCancelHandle"
  >
    <div class="main user-layout-register">
      <a-form
       ref="forgetRef"
       :rules="forgetRules"
       :model="forgetform"
      >
        <a-form-item name="phone">
          <a-input
            size="large"
            placeholder="请输入手机号码"
            autocomplete="false"
            v-model:value="forgetform.phone" />
        </a-form-item>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="16">
            <a-form-item name="smsCode">
              <a-input
                size="large"
                type="text"
                autocomplete="false"
                placeholder="请输入验证码"
                v-model:value="forgetform.smsCode"
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
              v-model:value="forgetform.passwd"
            ></a-input>
          </a-form-item>
        <a-form-item name="rePasswd">
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="确认密码"
            v-model:value="forgetform.rePasswd"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            size="large"
            type="primary"
            html-type="submit"
            class="register-button"
            :loading="forgetBtn"
            :disabled="forgetBtn"
            @click.stop.prevent="forgetHandle"
            >确定
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, UnwrapRef, onBeforeUnmount } from 'vue'
import { MailOutlined } from '@ant-design/icons-vue';
import { postResetPasswd, postSmsCode } from '@/api/login';
import { RuleObject } from 'ant-design-vue/es/form/interface';
import { RegisterForm } from '@/types/index';
import { message } from 'ant-design-vue';
import { checkFormData } from '@/utils/index';

const showForget = ref<boolean>(false)
const forgetBtn = ref<boolean>(false)
const smsSendType = ref<boolean>(false)
const forgetRef = ref()
const smsNum:number = 60
const time = ref<number>(smsNum)
let intervalCtx:any = null

const validateRepasswd = async ( rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入密码');
  } else if (value !== forgetform.passwd) {
    return Promise.reject("两次输入密码不同");
  } else {
    return Promise.resolve();
  }
}

const forgetRules = {
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
  }],
}

const forgetform:UnwrapRef<RegisterForm> = reactive({
  phone: '',
  passwd: '',
  smsCode: null,
  rePasswd: ''
})

const showModal = () => {
  showForget.value = true
}
const forgetModalCancelHandle = () => {
  showForget.value = false
  forgetRef.value.resetFields();
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
  if(forgetform.phone) {
    countDown()
    const { code, data: { errmsg, result } } = await postSmsCode({ phone: forgetform.phone }) || {}
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

function resetForget() {
  // 重置表单
  forgetRef.value.resetFields();
  showForget.value = false;
}

// 发起请求
const forgetHandle = async () => {
   // 确认验证是否有问题
  const checkVal = await checkFormData(forgetRef)
  if(!checkVal) {
    message.error('请正确输入信息！')
    return false
  }
  const { code ,data: { _id, errmsg }} = await postResetPasswd(forgetform)
  if (code === 0 && _id) {
    message.success('重置成功！');
    resetForget()
  } else if (errmsg) {
    message.error(errmsg)
  } else {
     message.error('重置失败，请重试！')
  }
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
    width: 100%;
  }
}
</style>
