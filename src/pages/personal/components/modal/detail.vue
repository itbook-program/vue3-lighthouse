<template>
<div>
  <checkView
    ref="checkRef"
    :title="defalutData && defalutData.orderType == 2
     ? '提现余额': '会员订阅'"
    @confirmHandle="confirmHandle"
  >
    <template v-slot:content>
      <div v-if="defalutData && defalutData.orderType == 2">
        <div class="withdraw-money">状态：{{ defalutData.orderStatus == 0 ? '提现中' : '提现完成' }}</div>
        <div class="withdraw-money">提现金额：{{ fetchData.withdrawal / 100 || 0 }}元</div>
        <div class="withdraw-money">提现渠道：支付宝</div>
        <div class="withdraw-money">提现账户：{{ fetchData.aliPayAccount || '未知' }}</div>
        <div class="withdraw-money">提现时间：{{ formatDate(fetchData.createdAt) }}</div>
        <div v-if="defalutData && defalutData.playDate" class="withdraw-money">
          打款时间：{{ formatDate(fetchData.playDate) }}
        </div>
      </div>

      <div v-else>
        <div class="withdraw-money">订阅帐号：{{ fetchData && fetchData.email || '空' }}</div>
        <div class="withdraw-money">订阅周期：{{ fetchData && fetchData.duraTime || 0 }}个月</div>
        <div class="withdraw-money">订阅方式：微信支付</div>
        <div class="withdraw-money">订阅时间：{{ fetchData && formatDate(fetchData.updatedAt) || '' }}</div>
      </div>
    </template>
  </checkView>
</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import checkView from '@/components/modal/check.vue'
import { getSubscribeByOrderId } from '@/api/subscribe'
import { getWithdrawalById } from '@/api/withdrawal'
import { formatDate } from '@/utils/index'

const checkRef = ref<any>('')
let defalutData = ref<any>({})
let fetchData = ref<any>({})
const confirmHandle = () => {
  console.log('点击确认')
}
const showData = async (text: any) => {
  defalutData.value = text
  if(text && text.orderType == 1) {
    const { data } = await getSubscribeByOrderId(text.cid)
    fetchData.value = data
  } else {
    const { data } = await getWithdrawalById(text.cid)
    fetchData.value = data
  }
}
defineExpose({
  checkRef,
  showData
})
</script>
<style lang="scss" scoped>
.withdraw-money{
  padding: 0 0 20px 0;
}
</style>