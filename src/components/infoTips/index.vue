<template>
  <book-avatar />
  <book-info
    title="会员专属权益：">
     {{ vipContent || '暂无说明'}}
  </book-info>
  <book-info
    title="关于灯塔平台："
    :isLink="true">
    灯塔为创作者提供点对点的内容 传播平台。通过灯塔平台、邮件 服务、小程序等多种渠道帮助作 家触达粉丝。让作家回归知识创 作，专注内容的本质。
  </book-info>
</template>
<script lang="ts" setup>
import BookAvatar from 'components/avatar/index.vue'
import BookInfo from './info.vue'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
const vipContent = ref<string>('')
const store = useStore()
const info = computed(() => store.state.user.info)
vipContent.value = info.value
</script>