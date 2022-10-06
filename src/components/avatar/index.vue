<template>
<div class="avatar-wrap">
  <div class="avatar-img">
    <img v-if="userInfo && userInfo.avatar" :src="formImageUrl(userInfo.avatar)" />
    <img v-else src="@/assets/logo.png" />
  </div>
  <div class="avatar-name">
    <a-tooltip placement="top" :title="userInfo.nickname" color="#108ee9" arrowPointAtCenter>
      <span>{{ userInfo.nickname }}</span>
    </a-tooltip>
  </div>
  <div class="avatar-position">
    <span v-if="userInfo && userInfo.professional">{{ userInfo.professional }}</span>
    <span v-else>暂无职位</span>
  </div>
  <div v-if="!checkPersonnel && !isFocus" class="avatar-opera">
    <a-button block type="primary" @click="subHandle(userInfo)">立即订阅</a-button>
  </div>
</div>
<subMdalView ref="subModal" @paySuccessHandle="paySuccessHandle" />
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import subMdalView from '@/components/modal/subModal.vue'
import { getUserByUid } from '@/api/user'
import { checkSubscribe } from '@/api/subscribe'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { UserInfo } from '@/types/index'
import { message } from 'ant-design-vue'
import { formImageUrl } from '@/utils/index'
const store = useStore()
const subModal = ref()
const isFocus = ref<boolean>(false)
const route = useRoute()
let userInfo = ref<UserInfo>({})

interface Props {
  checkPersonnel?: boolean
}

const { checkPersonnel } = withDefaults(
  defineProps<Props>(), {
    checkPersonnel: false
  }
)
const fetchDataByUid = async () => {
  const { code, data } = await getUserByUid(route.params.id as string)
  if (code === 0 && typeof data === 'object') {
    userInfo.value = data
    // 查询关注情况
    fetchFocus()
  } else {
    message.error('查询用户信息失败，请重试！')
  }
}

const paySuccessHandle = async () => {
  // 根据uid查询数据
  fetchDataByUid()
}

const fetchFocus = async () => {
  const { data } = await checkSubscribe({
    writer: userInfo.value._id
  })
  isFocus.value = data
}
// 根据状态加载不同的数据
if (checkPersonnel) {
  userInfo = computed(() => store.state.user)
} else {
  // 根据uid查询数据
  fetchDataByUid()
}

const subHandle = (userInfo: UserInfo) => {
  subModal.value.showData(userInfo)
  subModal.value.subView.showModal()
}
</script>

<style lang="scss" scoped>
.avatar-wrap{
  width: 100%;
  min-width: 250px;
  height: 333px;
  background-color: $white;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  padding: 30px;
  .avatar-img{
    width: 100px;
    height: 100px;
    @include border-1px;
    border-radius: 90px;
    box-sizing: border-box;
    margin: 10px auto;
    overflow: hidden;
    & > img{
      width: 100%;
      height: 100%;
    }
  }
  .avatar-name{
    font-size: 24px;
    font-weight: 500;
    color: rgba(51, 51, 51, 0.85);
    line-height: 33px;
    padding-top: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .avatar-position{
    font-size: 14px;
    font-weight: 500;
    color: rgba(102, 102, 102, 0.85);
    line-height: 20px;
    padding: 30px 0;
  }
}
</style>