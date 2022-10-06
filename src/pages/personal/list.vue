<template>
  <div class="info-container">
    <ul class="info-wrap" v-for="menuItem in list">
      <template
        v-for="item in menuItem">
        <template v-if="item.key && item.key == 'artPub'">
          <li :key="item.key">
            <router-link
              to="/personal/artPub"
              target="_blank"
            >
              发布文章
            </router-link>
          </li>
        </template>
        <template v-else>
          <li
            :key="item.key"
            :class="[ item.key === currentActive ? 'active': '' ]"
            @click="activeHandle(item)"
          >
            {{ item.name }}
          </li>
        </template>
      </template>

    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

type ItemInstance = {
  key: String,
  name: String
}
let currentActive = ref<string>('');
const store = useStore()
const router = useRouter()
const route = useRoute()


interface Props {
  list?: any,
  defaultActive?: string
}

withDefaults(defineProps<Props>(), {
  _list: [],
  get list() {
    return this._list;
  },
  set list(value) {
    this._list = value;
  },
  defaultActive: ''
})

const updateCurrentMenuActive = (path: string) => {
  const currentPath = path.split('/')[2]
  store.commit('setMenuActive', currentPath)
}

// 手动刷新页面，校正点击active
onMounted(() => {
  // 获取当前路由
  updateCurrentMenuActive(route.path)
})
// 路由变化，校正点击active
onBeforeRouteUpdate((to) => {
  if(to && to.path && to.path.indexOf('personal') > -1) {
    updateCurrentMenuActive(to.path)
  }
})


currentActive = computed(() => store.state.menuActive)

const activeHandle = (item: ItemInstance) => {
  // 处理侧边栏
  store.commit('setMenuActive', item.key)
  router.push(`/personal/${item.key}`)
}
</script>
<style lang="scss" scoped>
.info-container {
  font-size: 16px;
}
.info-wrap {
  margin: 16px 0 16px 0;
  padding: 15px 0;
  background-color: $white;
  text-align: center;
  color: rgba(51, 51, 51, 0.85);
  & > li {
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    user-select: none;
    position: relative;
    text-shadow: 0 0 .25px currentColor;
    transition: color .3s cubic-bezier(.645,.045,.355,1);
    &:hover {
      color: $blue;
    }
  }
  .active{
    &::before{
      position: absolute;
      top: 5px;
      left: -1px;
      height: 40px;
      width: 2px;
      background-color: $blue;
      content: '';
      transition: all .3s;
      z-index: 1;
    }
  }
}
</style>