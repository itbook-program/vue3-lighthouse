<template>
  <div class="info-wrap">
    <h3>{{ title }}</h3>
    <article class="info-content">
        <slot></slot>
    </article>
    <div v-if="isLink" class="info-link">
      立即开通灯塔创作者 >
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  title?: string,
  isLink?: boolean
}

withDefaults(
  defineProps<Props>(), {
    title: '',
    isLink: false
  }
)

</script>
<style lang="scss" scoped>
.info-wrap{
  margin: 16px 0 0 0;
  padding: 15px 30px;
  background-color: $white;
  text-align: left;
  h3{
    padding-bottom: 15px;
    color: $fontColor;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }
  .info-content{
    font-size: 16px;
    font-weight: 500;
    color: #666666;
    line-height: 22px;
  }
  .info-link{
    color: $blue;
    padding: 24px 0;
    cursor: pointer;
  }
}
</style>