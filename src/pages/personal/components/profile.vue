<template>
  <div class="profile-container">
    <div class="profile-title">头像</div>
    <a-upload
      name="avatar"
      :show-upload-list="false"
      :customRequest="uploadHandle"
    >
      <a-avatar v-if="imageUrl" :size="80" :isImageUrl="true" :src="imageUrl"/>
      <img v-else src="@/assets/logo.png" />
    </a-upload>

    <div class="profile-title">昵称</div>
    <div class="profile-nickname"><a-input :maxlength="10" v-model:value="userData.nickname"></a-input></div>

    <div class="profile-list">
      <div class="list-item">
        <div class="profile-title">职业</div>
        <div><a-input v-model:value="userData.professional"></a-input></div>
      </div>
      <div class="list-item">
        <div class="profile-title">个人主页</div>
        <div>
          <a-input :addon-before="userData.homeUrl" v-model:value="userData.uid" disabled default-value="" />
        </div>
      </div>
    </div>

    <div class="profile-title">个人简介</div>
    <a-textarea
      v-model:value="userData.info"
      placeholder="个人的自我简介"
      :auto-size="{ minRows: 3, maxRows: 8 }"
    />

    <div class="profile-btn">
      <a-button @click="saveHandle" type="primary">
        保存资料
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { getArtUser, putArtUser } from '@/api/artUser'
import { message } from 'ant-design-vue'
import COS from 'cos-js-sdk-v5';

import { cosParams } from '@/utils/cos'
import { formImageUrl } from '@/utils/index'

const store = useStore()

const userId = computed(() => store.state.user._id)

const imageUrl = ref<string>('')

const uploadType = 'avatar'

const cosPayload = cosParams(userId.value, uploadType)

let cos = new COS({ ...cosPayload })

let userData = ref({
  uid: '',
  info: '',
  avatar: '',
  nickname: '',
  professional: '',
  homeUrl: import.meta.env.VITE_HOME_URL
})


const uploadHandle = (upload: any) => {
  // 上传数据
  cos.putObject({
    Bucket: 'lighthouse-1300007333', /* 填入您自己的存储桶，必须字段 */
    Region: 'ap-chengdu',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
    Key: `${uploadType}/${userId.value}/${upload.file.name}`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    StorageClass: 'STANDARD',
    Body: upload.file, // 上传文件对象
    onProgress: function(progressData: any) {
        console.log(JSON.stringify(progressData));
    }
  }, function(err: string, data:any) {
      if(data && data.statusCode === 200) {
        imageUrl.value =  formImageUrl(data.Location);
        userData.value.avatar = data.Location;
      }
  });
};


const fetchData = async () => {
  const { code, data } = await getArtUser(userId.value)
  if(data && typeof data === 'object') {
    imageUrl.value = formImageUrl(data.avatar)
    userData.value = Object.assign({ ...userData.value, ...data })
  }
}
fetchData()

const saveHandle = async () => {
  const { info, nickname, avatar, professional } = userData.value
  const { code, data } = await putArtUser(userId.value, { info, nickname, avatar, professional })
  if(data) {
    const { code, data } = await getArtUser(userId.value)
    store.commit('setUserActive', data)
    message.success('保存成功！')
  } else {
    message.error('保存失败！')
  }
}
</script>
<style lang="scss" scoped>
.profile-container{
  padding: 24px;
}
.profile-title{
  color: rgba(51, 51, 51, 0.85);
  padding: 24px 0;
}
.profile-nickname{
  width: 49%;
}
.profile-list{
  display: flex;
  justify-content: space-between;
  .list-item{
    width: 49%;
  }
}
.profile-btn{
  width: 100%;
  margin: 32px auto;
  text-align: center;
  :deep(.ant-btn-primary){
    width: 212px;
  }
}
</style>
