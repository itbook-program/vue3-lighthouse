<template>
  <SubModal ref="subView">
    <template v-slot:content>
      <div class="subModal-container">
        <div class="subModal-header">
          <div class="subModal-header__avatar">
            <img v-if="writer && writer.avatar" :src="formImageUrl(writer.avatar)" />
          </div>
          <div class="subModal-header__user">
            <div class="name">{{ writer.nickname }}</div>
            <div class="job">{{ writer.professional }}</div>
          </div>
        </div>
        <div class="subModal-money">
          ¥ <span>{{ writer.unitPrice / 100 || 0 }}</span> / 1月
        </div>
        <div class="subModal-title">
          订阅时长
        </div>
        <div
          v-if="writer.times && writer.times.length > 0"
          class="subModal-list">
          <span
            v-for="item in writer.times"
            :key="item"
            @click="itemHandle(item)"
            :class="currentClass === item ? 'active': ''"
          >
            {{ item }}个月
          </span>
        </div>
        <div class="subModal-list" v-else>
          作者暂未设置订阅时长，暂时无法订阅。
        </div>
        <div class="subModal-title">
          邮箱(必填)
        </div>
        <div class="subModal-input"><a-input v-model:value="email"></a-input></div>
        <div class="subModal-footer">
          <a-button class="footer-btn" type="primary" key="back" @click="subHandle">订阅支付</a-button>
        </div>
      </div>
      <weChatPayView ref="weChatPay" @confirmHandle="payConfirmHandle"></weChatPayView>
    </template>
  </SubModal>
</template>
<script lang="ts" setup>
import SubModal from './info.vue';
import { ref } from 'vue';
import { getSubinfo } from '@/api/subInfo';
import weChatPayView from './weChatModal.vue';
import { WriterInfo } from '@/types/index';
import { message } from 'ant-design-vue';
import { formImageUrl } from '@/utils/index';

const subView = ref()
const writer = ref<WriterInfo>({})
const currentClass = ref<number>(0)
const email = ref<string>('')
const weChatPay = ref()
const subHandle = () => {
  if (currentClass.value <= 0) return message.info('作者暂未设置订阅时长，暂时无法订阅。')
  if(!email.value) return message.info('请填写邮箱地址！')
  // 打开微信支付
  const unitPrice = writer.value.unitPrice as number
  const money = unitPrice * currentClass.value
  weChatPay.value.weChatView.showModal()
  weChatPay.value.countMount({
    money,
    writerUser: writer.value,
    duraTime: currentClass.value,
    unitPrice,
    email: email.value
  })
}

const clearData = () => {
  email.value = ''
}

const emits = defineEmits<{
  ( e: 'paySuccessHandle'): void
}>()

const payConfirmHandle = () => {
  subView.value.handleCancel();
  // 清理数据
  clearData()
  // 更新当前状态
  emits('paySuccessHandle')
}
const showData = async (info: WriterInfo) => {
  const { code, data } = await getSubinfo(info._id)
  if(data) {
    currentClass.value = data.times[0]
  }
  writer.value = { ...info, ...data }
}



const itemHandle = (item: number) => {
  currentClass.value = item
}
defineExpose({
  subView,
  showData
})
</script>
<style lang="scss">
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
}
</style>