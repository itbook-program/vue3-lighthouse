<template>
  <PushModal
    ref="pushView"
    title="推送"
    @confirmHandle="confirmHandle"
  >
    <template v-slot:content>
      <a-form layout="vertical" v-bind="{
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
      }">
        <a-form-item label="推送维度">
          <a-select
            v-model:value="pushForm"
            style="width: 100%"
          >
            <a-select-option :value="0">所有人可见</a-select-option>
            <a-select-option :value="1">会员可见</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </template>
  </PushModal>
</template>
<script lang="ts" setup>
import PushModal from './check.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { postPushTask } from '@/api/push';
import { ArticleList } from '@/types/index';
const pushView = ref()
let pushForm = ref<Number>(1)
const artInfo = ref<ArticleList>({})
const store = useStore()

const emits = defineEmits<{
  (e: 'refeshHandle'): void
}>()

const pushInfoHandle = (item: ArticleList) => {
  artInfo.value = item
}

const confirmHandle = async () => {
  const { code, data } = await postPushTask({
    article: artInfo.value._id
  })
  if (code === 0 && data) {
    pushView.value.handleOk()
    // 重新获取数据
    emits('refeshHandle')
  }
}
defineExpose({
  pushInfoHandle,
  pushView
})
</script>
