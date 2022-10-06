<template>
  <book-header></book-header>
  <div class="book-content">
    <router-view></router-view>
  </div>
  <book-footer></book-footer>
</template>
<script lang="ts">
import BookHeader from '../header/index.vue'
import BookFooter from '../footer/index.vue'

export default {
  components: {
    BookHeader,
    BookFooter
  }
}
</script>
<style lang="scss" scoped>
.book-content{
  background: $bgColor;
  padding: 10px $bodyPadding;
  box-sizing: border-box;
  min-height: calc(100vh - $titleHeight - $footerHeight);
  min-width: 100%;
}
</style>