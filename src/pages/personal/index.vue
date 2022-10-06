<template>
  <div class="content">
    <div class="content-info">
      <book-menu />
    </div>
    <div class="content-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BookMenu from './menu.vue'
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  box-sizing: border-box;
  min-height: calc(100vh - $titleHeight - $footerHeight);
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
  margin-right: 16px;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>