<template>
   <a-modal
   class="modal-wrap"
   :bodyStyle="bodyStyle"
   :closable="closable"
   :title="title"
   v-model:visible="visible"
   @ok="handleOk"
   :footer="null"
  >
    <slot name="content"></slot>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref<boolean>(false);
const visible = ref<boolean>(false);
const { closable, title, bodyStyle } = defineProps({
  closable: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  },
  bodyStyle: {
    type: Object,
    default: {}
  }
})
const showModal = () => {
  visible.value = true;
};
const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    visible.value = false;
  }, 2000);
};
const handleCancel = () => {
  visible.value = false;
};

defineExpose({
  showModal,
  handleCancel
})

</script>
<style lang="scss" scoped>
.modal-wrap{
  :deep(.ant-modal-content){
    .ant-modal-footer{
      text-align: center !important;
    }
  }
  .footer-btn{
    width: 60%;
    margin: 0 auto;
  }
}
</style>
