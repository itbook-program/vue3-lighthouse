<template>
  <a-empty v-if="!sourceData || sourceData.length < 1" :image="simpleImage">
    <template #description>
      <span>
        暂无数据
      </span>
    </template>
  </a-empty>
  <ul v-else class="infinite-list" style="overflow: auto">
    <li v-for="item in sourceData" :key="item._id" @click="clickHandle(item)" class="infinite-list-item">
      <div class="item-cover">
        <a-image
          width="100%"
          height="100%"
          :src="formImageUrl(item.cover)"
          fallback="data:image/png;base64,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"
        />
      </div>
      <div class="item-content">
        <div class="item-content__title">{{ item.title || '暂无标题' }}</div>
        <div class="item-content__info">
          <div class="info-tag">
            <span
              class="status"
              :class="item.type === 1 ? 'isVip': ''"
            >
              {{item.type === 1 ? '付费会员': '普通文章'}}
            </span>
            <span class="time">
              {{ formatDate(item.updatedAt) || '暂无时间' }}
            </span>
          </div>
        </div>
      </div>
      <div class="item-opera" v-if="!isRead">
        <a-popover trigger="click" placement="bottom">
          <template v-slot:content>
            <router-link target="_blank" :to="{ path:'/personal/artPub',query: { id: item._id } }">
              <div class="popover-item">编辑</div>
            </router-link>
            <div v-if="artType === -1" @click="popoverHandle('push', item)" class="popover-item">推送</div>
            <div @click="popoverHandle('delete', item)" class="popover-item">删除</div>
          </template>
          <MenuOutlined />
        </a-popover>
      </div>
    </li>
  </ul>
  <div class="content-pagination">
    <a-pagination v-if="pages !== 0" @change="changeHandle" :total="pages" show-less-items />
  </div>

  <pushModalView @refeshHandle="refeshViewHandle" ref="pushModal" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import pushModalView from '../modal/pushModal.vue';
import {
  getArtList,
  getArticleList,
  getArtDetail,
  deleteArticleById
} from '@/api/article';
import { ArticleCtx, ArticleList } from '@/types/index';
import { MenuOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router'
import { message, Empty } from 'ant-design-vue';
import { formatDate, formImageUrl } from '@/utils/index';
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
const route = useRoute()
const router = useRouter()

const sourceData = ref([]) as any
const pages = ref<number>(0)
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
let pushModal = ref()

interface Props {
  isRead?: boolean,
  artType?: number|null
}

let { isRead, artType } = withDefaults(
  defineProps<Props>(), {
    isRead: true,
    artType: null
  }
)
const fetchData = async () => {
  let payload: ArticleCtx = {
    currentPage: currentPage.value,
    pageSize: pageSize.value
  }
  if (artType) payload.type = artType
  const {code, data } = isRead ? await getArtList(route.params.id, payload) || {} : await getArticleList(payload) || {}
  if(code === 0 && data && data.list) {
    sourceData.value = data.list
    pages.value = data.count
  } else {
    message.error('加载数据出错！')
  }
}

const popoverHandle = async (type: String, item: any) => {
  switch (type) {
    case 'push':
      pushModal.value.pushView.showModal()
      pushModal.value.pushInfoHandle(item)
      break;
    case 'delete':
      // 请求删除参数
      const { code, data } = await deleteArticleById(item._id)
      if(code === 0) {
        fetchData()
      }
      break;
    default:
      break;
  }
}
fetchData()
const changeHandle = (cindex: number) => {
  currentPage.value = cindex
  fetchData()
}

const refeshViewHandle = () => {
  fetchData()
}

const clickHandle = async (item: ArticleList) => {
  if(!isRead) return false
  // 查询是否有查看权限
  const { data } = await getArtDetail(item._id, true)
  if(data && typeof data == 'boolean') {
    // 跳转详情页
    if(isRead) {
      router.push({ name: 'userArtDetail', params: { id: route.params.id, artId: item._id }})
    } else {
      router.push({ name: 'userArticleDetail', params: { artId: item._id }})
    }
  } else {
    message.success('暂无查看权限，请先订阅作者!');
  }
}
</script>

<style lang="scss" scoped>
.infinite-list {
  padding: 0 20px;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  height: 116px;
  padding: 10px 0;
  color: var(--el-color-primary);
  justify-content: space-between;
  @include border-bottom-1px;
  cursor: pointer;
  user-select: none;
  .item-cover {
    width: 150px;
    flex-shrink: 0;
    @include border-1px;
    display: inline-flex;
    align-items: center;
  }
  .item-content {
    align-self: flex-start;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    padding: 0 24px;
    color: rgba(51, 51, 51, 0.85);
    font-size: 16px;
    .item-content__title{
      width: 100%;
      text-align: left;
    }
    .item-content__info{
      align-self: flex-end;
      text-align: left;
      display: inline-flex;
      width: 100%;
      align-items: center;
      .info-tag{
        width: 100%;
        display: inline-flex;
        align-items: center;
        .status{
          margin-right: 30px;
          color: rgba(153, 153, 144, 1);
          font-size: 14px;
        }
        .isVip{
          color: rgba(102, 87, 40, 1);
          font-size: 14px;
        }
        .time{
          margin-top: 3px;
          font-size: 14px;
          color: rgba(153, 153, 153, 0.85);
        }
      }
    }
  }
  .item-opera {
    flex-shrink: 0;
    user-select:none;
    cursor: pointer;
  }
}
.popover-item{
  user-select:none;
  cursor: pointer;
  padding: 5px 0;
  &:hover{
    color: rgba(153, 153, 153, 0.85);
  }
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.content-pagination{
  padding: 10px 0;
  text-align: center;
}
</style>