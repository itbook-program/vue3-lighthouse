<template>
  <div class="detail-container">
    <header class="header-warp">
      <h2>{{ artDetail.title || '暂无标题' }}</h2>
      <div class="header-tags">
        <div
          class="status"
          :class="artDetail.type == 1 ? 'isVip': ''"
        >
          {{ artDetail.type == 1 ? '会员专属': '普通用户' }}
        </div>
        <div class="time">{{ formatDate(artDetail.updatedAt) }}</div>
      </div>
    </header>
    <div class="detail-content" v-html="artDetail.content"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getArtDetail, getArticleDetail } from '@/api/article';
import { formatDate } from '@/utils/index';
import { ArticleList } from '@/types/index'
const route = useRoute()

interface Params {
  id: string,
  artId: string
}
const { id, artId } = route.params

const artDetail = ref<ArticleList>({})

const fetchData = async () => {
  if (id) {
    const { data } = await getArtDetail(artId as string)
    if (data) artDetail.value = data
  } else {
    const { data }  = await getArticleDetail(artId as string)
    if (data) artDetail.value = data
  }
}
fetchData()

</script>
<style lang="scss" scoped>
.detail-container{
  padding: 24px;
  .header-tags{
    display: flex;
    padding: 16px 0;
    align-items: center;
    .status{
      margin-right: 30px;
      color: rgba(153, 153, 144, 1);
      font-size: 14px;
    }
    .isVip{
      font-size: 14px;
      font-weight: 500;
      color: #665728 !important;
      line-height: 20px;
    }
    .time{
      font-size: 14px;
      font-weight: 500;
      color: rgba(153, 153, 153, 0.85);
      line-height: 20px;
    }
  }
  .detail-content{
    font-size: 14px;
    font-weight: 500;
    color: rgba(102, 102, 102, 0.85);
    line-height: 24px;
  }
}
</style>