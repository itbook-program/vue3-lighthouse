<template>
  <WeModal
    class="weModal-warp"
    title="微信支付"
    :bodyStyle="bodyStyle"
    closable
    ref="weChatView"
  >
    <template v-slot:content>
      <div class="wechatModal-container">
        <div class="money">本次订单共需支付 {{ totalPrice / 100 }} 元。</div>
        <qrcode-vue class="qrcode" :value="payUrl" :size="400" level="H" />
        <div class="tips">温馨提示：订单原型相关商品暂不支持退款，请在购买前仔细预览原型。</div>
      </div>
    </template>
  </WeModal>
</template>
<script lang="ts" setup>
import WeModal from './info.vue';
import { ref, computed, onUnmounted } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { postOrder, postCheckOrderType } from '@/api/pay';
import { guid } from '@/utils/index';
import { useStore } from 'vuex';

const store = useStore()
const bodyStyle = { textAlign: 'center' }
const totalPrice = ref<number>(0)
const weChatView = ref()
const payUrl = ref<string>('')
const prodId = ref<string>('')
let setIntervalFn:any = null

interface UserInfo {
  money: number,
  writerUser: {
    _id: string
  },
  duraTime: Date,
  unitPrice: number,
  email: string
}

const userInfo = computed(() => store.state.user)

const emits = defineEmits<{
  ( e: 'confirmHandle'): void
}>()

const fetchCheckData = async (orderId:string) => {
  const { code, data } = await postCheckOrderType({ orderId })
  if (data === 0) {
    // 待继续查询
    setTimeout(() => {
      fetchCheckData(orderId)
    }, 2000);
  } else if (data === -1) {
    // 未查询到该订单数据
    console.log('未查询到订单数据')
  } else if ( data === 1) {
    // 代表已经好了
    weChatView.value.handleCancel()
    // 回调上一层级
    emits('confirmHandle')
  } else {
    console.log('出现未知问题')
  }
}

onUnmounted(() => {
  clearInterval(setIntervalFn)
})

const fetchData = async ({ money, writerUser, duraTime, unitPrice, email }: UserInfo) => {
  const uuid = guid()
  const { data: { prInfo, order } } = await postOrder({
    writer: writerUser._id,
    uuid,
    email,
    unitPrice: unitPrice,
    duraTime: duraTime,
    user: userInfo.value._id,
    orderTitle: '订购',
    projectId: 'lhs',
    price: money,
    info: '灯塔订购',
    orderType: 1,
    proId: userInfo.value._id
  })
  payUrl.value = prInfo
  fetchCheckData(uuid)
}

const countMount = ({ money, writerUser, duraTime, unitPrice, email }: UserInfo) => {
  totalPrice.value = money
  fetchData({ money, writerUser, duraTime, unitPrice, email })
}
defineExpose({
  weChatView,
  countMount
})
</script>
<style lang="scss" scoped>
.weModal-warp{
  :deep(.ant-modal-content){
    text-align: center;
    margin: auto;
  }
}
.subModal-container{
  .subModal-header{
    display: flex;
    align-items: center;
    justify-content: center;
    .subModal-header__avatar{
      width: 78px;
      height: 78px;
      overflow: hidden;
      border-radius: 90px;
      flex-shrink: 0;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .subModal-header__user{
      padding:0 20px;
      .name{
        font-size: 24px;
        margin-bottom: 6px;
      }
      .job{
        font-size: 14px;
        color: rgba(102, 102, 102, 0.85);
      }
    }
  }
  .subModal-money{
    color: $blue;
    font-size: 18px;
    text-align: center;
    margin: 24px 0;
    & > span{
      font-size: 32px;
    }
  }
  .subModal-title{
    font-size: 16px;
    padding: 24px 0;
    color: rgba(51, 51, 51, 0.85);
  }
  .subModal-list{
    display: flex;
    align-items: center;
    .active{
      background: $blue;
      color: $white;
    }
    & > span{
      display: block;
      width: 83px;
      height: 32px;
      background: $white;
      border-radius: 4px;
      @include border-1px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      user-select: none;
      margin-left: 15px;
    }
    & >span:first-child{
      margin-left: 0;
    }
  }
  .subModal-footer{
    padding-top: 24px;
    text-align: center;
    .footer-btn{
      width: 40%;
    }
  }
  .wechatModal-container{
    text-align: center;
    .qrcode{
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>