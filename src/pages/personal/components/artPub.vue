<template>
  <div :style="{ padding: '5%' }" v-if="isEditorShow">
    <a-skeleton active />
  </div>
  <div
    v-else
    :style="{ 'background-color': '#F5F5F5'}"
  >
    <a-affix class="affix" :offset-top="0">
      <!-- 工具栏 -->
        <Toolbar
          :editorId="editorId"
          style="border-bottom: 1px solid #ccc"
        />
    </a-affix>
    <div class="edit-container">
      <div class="title">
        <a-input v-model:value="title" placeholder="请输入文章标题"></a-input>
      </div>
      <!-- 编辑器 -->
      <Editor
          :editorId="editorId"
          :defaultConfig="editorConfig"
          style="height: 500px; overflow-y: hidden;"
          class="editor"
      />
    </div>
    <!-- 富文本完 -->
    <div class="opera-container">
      <div class="opera-item">
        <div class="opera-item-title">封面图</div>
        <div class="opera-item-cover">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :customRequest="uploadHandle"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
            </div>
          </a-upload>
        </div>
      </div>
      <div class="opera-item">
        <div class="opera-item-title">
          发布渠道
        </div>
        <div>
          <a-select
            ref="select"
            v-model:value="artType"
            style="width: 50%"
          >
            <a-select-option :value="0">所有人可见</a-select-option>
            <a-select-option :value="1">仅会员可见</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <div class="footer-btn" @click="pushArticleHandle('drafts')">保存草稿</div>
      <div class="footer-btn btn-success" @click="pushArticleHandle(null)">立即发布</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue';
import { ref, onBeforeUnmount, computed } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import '@wangeditor/editor/dist/css/style.css';

import { getArticleDetail, putArticle, postArticle } from '@/api/article'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { formImageUrl } from '@/utils/index';

import COS from 'cos-js-sdk-v5';
import { cosParams } from '@/utils/cos'

const store = useStore()
const route = useRoute()

const loading = ref<boolean>(false);
const imageUrl = ref<string>('');
const cover = ref<string>('');
const title = ref<string>('')

const isEditorShow = ref<boolean>(false)

const userId = computed(() => store.state.user._id)

const editorId: string = 'wangeEditor-1'

const uploadType = 'cover'

const cosPayload = cosParams(userId.value, uploadType)

let cos = new COS({ ...cosPayload })

const artType = ref<number>(0)

const fetchData = async () => {
  isEditorShow.value = true
  const { code, data } = await getArticleDetail(route.query.id as string)
  // 设置数据
  const { cover: coverInfo, content, title:titleInfo, type} =  data
  cover.value = coverInfo
  imageUrl.value = formImageUrl(coverInfo);
  title.value = titleInfo
  artType.value = type < 0 ? 0: type
  // 必须异步
  setTimeout(() => getEditor(editorId)?.dangerouslyInsertHtml(content), 0)
  isEditorShow.value = false
}

// 编辑状态再请求数据
if(route.query.id) {
  fetchData()
}

const pushArticleHandle = async (drafts: string| null) => {
  if(route.query && route.query.id) {
    const { code, data } = await putArticle(route.query.id as string, {
      cover: cover.value,
      title: title.value,
      content: getEditor(editorId)?.getHtml(),
      type: drafts ? -1: artType.value
    })
    if (data) {
      message.success('文章更新成功')
    }
  } else {
    const { code, data } = await postArticle({
      user: userId.value,
      cover: cover.value,
      title: title.value,
      content: getEditor(editorId)?.getHtml(),
      type: drafts ? -1: artType.value
    })
    if (data) {
      message.success('文章发布成功')
      // 清理数据
      imageUrl.value = '';
      cover.value = '';
      title.value = ''
      getEditor(editorId)?.clear()
    }
  }
}

const uploadHandle = (upload: any) => {
  loading.value = true;
  // 上传数据
  cos.putObject({
    Bucket: 'lighthouse-1300007333', /* 填入您自己的存储桶，必须字段 */
    Region: 'ap-chengdu',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
    Key: `/${uploadType}/${userId.value}/${upload.file.name}`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    StorageClass: 'STANDARD',
    Body: upload.file, // 上传文件对象
    onProgress: function(progressData:any) {
        console.log(JSON.stringify(progressData));
    }
  }, function(err: any, data: any) {
      console.log(err, data)
      if(data && data.statusCode === 200) {
        imageUrl.value = formImageUrl(data.Location);
        cover.value = data.Location;
        setTimeout(() => {
          loading.value = false;
        }, 200);
      }
  });
};

// 编辑器配置
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: { /* 菜单配置，下文解释 */ }
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = getEditor(editorId)
  if (editor == null) return
  // 销毁，并移除 editor
  editor.destroy()
  removeEditor(editorId)
})

</script>
<style lang="scss" scoped>
.toolbar {
    @include border-1px;
}
.affix{
  :deep(.ant-affix){
    z-index: 99999;
  }
}
.edit-container{
  @include border-1px;
  margin: 10px 0;
}
.title{
  height: 50px;
  & > :deep(.ant-input){
    height: 50px;
    outline: none;
    border-radius: 0;
    border: none;
    box-shadow: none;
    @include border-bottom-1px;
  }
}

.text {
    @include border-1px;
    min-height: 400px;
    background-color: $white;
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.opera-container{
  display: flex;
  margin: 20px 0 0 0;
  padding: 0 20px;
  background-color: $white;
  .opera-item{
    width: 40%;
    .opera-item-title{
      padding: 20px 0;
    }
    .opera-item-cover{
      :deep(.ant-upload){
        width: 350px;
        height: 200px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.footer-container{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: $white;
  .footer-btn{
    width: 100px;
    height: 40px;
    background: $borderColor;
    @include border-1px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
    color: rgba(102, 102, 102, 0.85);
    user-select: none;
    cursor: pointer;
    border-radius: 4px;
    &:active{
      opacity: 0.8;
    }
  }
  .btn-success{
    background: $blue;
    color: rgba(255, 255, 255, 0.85);
  }
}
</style>
