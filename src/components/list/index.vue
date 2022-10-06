<template>
  <book-title title="文章列表" />
  <a-tabs
    :animated="false"
    v-model:activeKey="activeName"
    >
    <a-tab-pane key="all" tab="全部">
      <art-list :isRead="isRead" :artType="null"></art-list>
    </a-tab-pane>
    <a-tab-pane key="vip" tab="会员专属">
      <art-list :isRead="isRead" :artType="1"></art-list>
    </a-tab-pane>
    <a-tab-pane v-if="!isRead" key="drafts" tab="草稿箱">
      <art-list :isRead="isRead" :artType="-1"></art-list>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ArtList from './list.vue'
import BookTitle from '../title/index.vue'

const activeName = ref<string>('all')
interface Props {
  isRead?: boolean,
  artType?: number|null
}

const { isRead } = withDefaults(
  defineProps<Props>(), {
    isRead: true,
    artType: null
  })

</script>