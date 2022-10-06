<template>
  <div class="content">
    <div class="content-wrap">
      <router-view></router-view>
    </div>
    <div class="content-info">
      <book-info></book-info>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BookInfo from 'components/infoTips/index.vue'
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  box-sizing: border-box;
}
.content-wrap {
  width: 100%;
  min-height: 100%;
  background-color: $white;
  box-sizing: border-box;
  text-align: left;
}

.content-info {
  width: 280px;
  margin-left: 16px;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>