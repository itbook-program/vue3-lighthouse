<template>
  <BookTitle title="订阅设置"></BookTitle>
  <div class="subSetting-container">
    <div class="subSetting-title">会员权益说明</div>
    <a-textarea v-model:value="info" placeholder="简单描述您能提供的会员权益" :rows="4" />
    <div class="subSetting-title">每月单价</div>
    <div class="subSetting-money">
      <a-input-number v-model:value="unitPrice" :min="0" />
      <span>/ 月</span>
      <a-button @click="updateHandle" type="primary">
        保存
      </a-button>
    </div>

    <div class="subSetting-title">开始连续订阅时长</div>
    <div>
      <a-checkbox-group v-model:value="times">
         <a-checkbox :value="3">
          3个月
        </a-checkbox>
        <a-checkbox :value="6">
          6个月
        </a-checkbox>
        <a-checkbox :value="12">
          12个月
        </a-checkbox>
      </a-checkbox-group>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BookTitle from 'components/title/index.vue'
import { putSubinfo, getSubinfo } from '@/api/subInfo'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { useStore } from 'vuex' 
import { sortBy } from 'lodash'

const store = useStore()
const times = ref([])
const info = ref('')
const unitPrice = ref(0)

const updateHandle = () => {
  fetchUpdateSubinfo()
}
const fetchSubInfo = async () => {
  const { code, data } = await getSubinfo(store.state.user._id)
  if(data && typeof data === 'object') {
    const { info: definfo, times: deftimes, unitPrice: defunitPrice = 0 } = data
    info.value = definfo
    times.value = deftimes
    unitPrice.value = defunitPrice / 100
  }
}
fetchSubInfo()


const  fetchUpdateSubinfo = async () => {
  const { code, data } = await putSubinfo(
    store.state.user._id,
    {
      times: sortBy(times.value),
      info: info.value,
      unitPrice: unitPrice.value * 100
    })
  if (data) {
    message.success('保存成功！')
  } else {
    message.error('保存失败！')
  }
}

</script>
<style lang="scss" scoped>
.subSetting-container{
  padding: 24px;
}
.subSetting-title{
  font-size: 16px;
  color: rgba(51, 51, 51, 0.85);
  line-height: 22px;
  padding: 24px 0;
}
.subSetting-money{
  & > span{
    padding: 0 15px;
  }
}
</style>
