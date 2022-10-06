<template>
  <div class="centent-title">{{title}}</div>
</template>
<script lang="ts" setup>
interface Props {
  title?: string
}

const { title } = withDefaults(
  defineProps<Props>(), 
  {
    title: ''
  }
)

</script>

<style lang="scss" scoped>
.centent-title {
  padding: 16px 20px;
  @include border-bottom-1px;
  text-align: left;
}
</style>