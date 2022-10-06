<template>
  <a-modal
    v-model:visible="showLogin"
    title="登录"
    centered
    :mask-closable="false"
    :footer="null"
    @cancel="handleLoginModalCancel"
    class="modal-container"
  >
    <div class="main">
      <p-login isShow @closeHandle="handleLoginModalCancel"></p-login>
    </div>
  </a-modal>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import PLogin from './publogin.vue'


const showLogin = ref<boolean>(false)

const isShow = ref<boolean>(true)

const handleLoginModalCancel = () => {
  showLogin.value = false
}

const showModal = (val: Boolean) => {
  showLogin.value = true
}
defineExpose({
  showModal
})
</script>
<style lang="scss" scoped>

.main {
    min-width: 260px;
    width: 368px;
    padding: 10px;
    margin: 0 auto;
}
</style>
