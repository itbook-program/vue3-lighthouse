<template>
<div>
  <checkView
    ref="checkRef"
    title="提现余额"
    @confirmHandle="confirmHandle"
  >
    <template v-slot:content>
      <div>
        <div class="withdraw-money">可提现金额：{{ balance / 100 || 0 }}元</div>
        <a-form layout="vertical" :model="formState">
          <a-form-item label="本次提现金额">
            <a-input v-model:value="formState.withdrawal" placeholder="请输入提现金额" />
          </a-form-item>
          <a-form-item label="支付宝账户姓名">
            <a-input v-model:value="formState.aliPayName" placeholder="请输入姓名" />
          </a-form-item>
          <a-form-item label="支付宝账户">
            <a-input v-model:value="formState.aliPayAccount" placeholder="请输入账户信息" />
          </a-form-item>
        </a-form>
      </div>
    </template>
  </checkView>
</div>
</template>
<script lang="ts" setup>
import { ref, UnwrapRef, reactive, toRefs } from 'vue'
import checkView from '@/components/modal/check.vue'
import { postwithdrawal } from '@/api/withdrawal'
import { message } from 'ant-design-vue';
// const amount  = 60

interface Props {
  balance?: number
}

interface FormState {
  withdrawal: any;
  aliPayName: string;
  aliPayAccount: string;
}

const props = withDefaults(
  defineProps<Props>(), {
    balance: 0
  }
)

const { balance } = toRefs(props)

const formState: UnwrapRef<FormState> = reactive({
  withdrawal: '',
  aliPayName: '',
  aliPayAccount: ''
});

const checkRef = ref<any>(null)
const confirmHandle = async () => {
  console.log(formState)
  const { withdrawal, aliPayName, aliPayAccount  } = formState
  console.log(withdrawal, aliPayName, aliPayAccount)
  if ( !withdrawal || !aliPayName || !aliPayAccount) return message.info('请完整填写相关信息！')
  const { code, data } = await postwithdrawal({
    balance: balance.value,
    withdrawal: withdrawal * 100,
    aliPayName,
    aliPayAccount
  })
  if (code === 0 && data) {
    message.success('申请提现成功！')
    checkRef.value.handleOk()
  } else {
    message.error('申请提现失败！')
  }
}
defineExpose({
  checkRef
})
</script>
<style lang="scss" scoped>
.withdraw-money{
  padding: 0 0 20px 0;
}
</style>