<template>
  <book-title title="资金流水" />
  <div class="money-container">
    <div class="money-info">
      <a-button class="content-add" @click="moneyWithDrawHandle" type="primary">
        余额提现
      </a-button>
      <span>账户余额：{{ price / 100 || 0 }} 元</span>
      <span>冻结余额：{{ freeze / 100 || 0 }} 元</span>
    </div>

    <a-table
      bordered
      :columns="columns"
      :data-source="sourceData"
      rowKey="_id"
    >
      <template #updatedAt="{ record }">
        <span>{{ formatDate(record.updatedAt) }}</span>
      </template>

      <template #orderType="{ record }">
        <span v-if="record.orderType === 1">会员订阅</span>
        <span v-if="record.orderType === 2">提现</span>
      </template>

      <template #price="{ record }">
        <span>{{ record.price / 100 || 0 }}</span>
      </template>

      <template #info="{ record }">
         <span v-if="record.orderType === 1">月度会员</span>
         <span v-if="record.orderType === 2 && record.type === 0">提现中</span>
         <span v-if="record.orderType === 2 && record.type === 1">提现完成</span>
      </template>

      <template #detail="{ record }">
        <span class="content-detail" @click="detailHandle(record)">查看详情</span>
      </template>
    </a-table>
  </div>
  <withdrawModal :balance="balance" ref="withdrawRef" />
  <detailModal ref="detailRef" />
</template>
<script lang="ts" setup>
import BookTitle from 'components/title/index.vue'
import { getCollectById } from '@/api/pay'
import { getWithdrawalCheckType } from '@/api/withdrawal'
import { formatDate } from '@/utils/index'
import { useStore } from 'vuex'
import { ref } from 'vue'
import withdrawModal from './modal/withdraw.vue'
import detailModal from './modal/detail.vue'
import { message } from 'ant-design-vue'

interface OrderInfo {
  updatedAt: Date,
  orderType: number,
  price: number,
  info: string
}
const withdrawRef = ref<any>(null)
const detailRef = ref<any>(null)
const store = useStore()
const columns = [
  {
    title: '时间',
    slots: { customRender: 'updatedAt' }
  },
  {
    title: '资金类型',
    width: 200,
    slots: { customRender: 'orderType' }
  },
  {
    title: '金额',
    ellipsis: true,
    slots: { customRender: 'price' }
  },
  {
    title: '备注',
    ellipsis: true,
    slots: { customRender: 'info' }
  },
  {
    title: '查看详情',
    ellipsis: true,
    slots: { customRender: 'detail' }
  }
];

const sourceData = ref([] as OrderInfo[]);
const price = ref<number>(0);  
let freeze = ref<number>(0);
let balance = ref<number>(0);

const fetchData = async () => {
  const id = store.state.user._id
  const { data } = await getCollectById(id)
  if (data) {
    const  { order, totalPrice, freeze: orderFreeze, withdrawal: orderWithdrawal } = data || {}
    sourceData.value = order
    price.value = parseInt(totalPrice)
    freeze.value = parseInt(orderFreeze)
    // 总金额 - 冻结金额 - 已提现金额
    balance.value = price.value - freeze.value - orderWithdrawal
  }
}

const moneyWithDrawHandle = async () => {
  const id = store.state.user._id
  const { code, data } = await getWithdrawalCheckType(id)
  if (code == 0 && data) {
    message.info('已有提现订单在审批中，请先等待审批～')
    return false
  }
  withdrawRef.value.checkRef.showModal()
}

const detailHandle = (text: any) => {
  detailRef.value.showData(text)
  detailRef.value.checkRef.showModal()
}
fetchData()

</script>
<style lang="scss" scoped>
.money-container{
  padding: 24px;
  .money-info{
    padding: 0 0 24px 0;
    & > span{
      padding: 0 25px;
    }
  }
  .content-detail{
    cursor: pointer;
    user-select: none;
  }
}

</style>
