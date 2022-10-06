<template>
   <a-modal v-model:visible="visible" :title="title">
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="checkConfirmHandle"
        >确认</a-button>
      </template>
      <slot name="content"></slot>
    </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
interface Props {
  title?: string
}
const { title } = withDefaults(
  defineProps<Props>(),
  { title: '' }
)
const emits = defineEmits<{
  ( e: 'confirmHandle'): void
}>()

const loading = ref<boolean>(false);
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};
const checkConfirmHandle = () => {
  emits('confirmHandle')
}
const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    visible.value = false;
  }, 500);
};
const handleCancel = () => {
  visible.value = false;
};
defineExpose({
  showModal,
  handleOk,
  handleCancel
})
</script>
