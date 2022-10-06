<template>
  <BookTitle title="订阅管理"></BookTitle>
  <div class="subscribe-wrap">
    <div class="subscribe-opera">
      <div class="subscribe-opera__email">
        <span>邮箱：</span><a-input v-model:value="email" placeholder="请输入邮箱" />
      </div>
      <div class="subscribe-opera__type">
        <span>会员状态：</span>
        <a-select v-model:value="status" :default-value="1" style="width: 120px">
          <a-select-option :value="1">
            进行中
          </a-select-option>
          <a-select-option :value="0">
            已过期
          </a-select-option>
          <a-select-option :value="false">
            已冻结
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="subscribe-btn">
      <a-button @click="resetHandle" class="btn-default">
        重置
      </a-button>
      <a-button @click="filterHandle" type="primary">
        筛选
      </a-button>
    </div>
  </div>
  <div class="subscribe-content">
     <a-table bordered :columns="columns" rowKey="_id" :data-source="sourceData">
       <template #type=" { record } ">
        <span v-if="record.type === 0">普通用户</span>
        <span v-else-if="record.type === 1">会员用户</span>
      </template>
      <template #expTime=" { record } ">
        <span>{{ formatDate( record.expTime ) }}</span>
      </template>
      <template #subTime=" { record } ">
        <span>{{ formatDate( record.subTime ) }}</span>
      </template>
      <template #operation="{ record }" >
        <a @click="editHandle(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认冻结帐号?"
          v-if="record.status === true"
          @confirm="() => statusHandle(record, false)"
        >
          <a>冻结</a>
        </a-popconfirm>
        <a-popconfirm
          v-else-if="record.status === false"
          title="确认解禁帐号?"
          :style="{ color: 'red' }"
          @confirm="() => statusHandle(record, true)"
        >
          <a>解禁</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
  <editView
    @loadData="loadDataHandle"
    ref="editViewModal"
    :isEdit="isEdit" />
</template>
<script lang="ts" setup>
import BookTitle from 'components/title/index.vue'
import { getSubscribe, putSubscribe } from '@/api/subscribe'
import { ref } from 'vue'
import editView from 'components/modal/editModal.vue'
import { formatDate } from '@/utils/index'

const email = ref<string>('')
const status = ref<number>(1)
const isEdit = ref<boolean>(false)
const editViewModal = ref()

const columns = [
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '会员状态',
    dataIndex: 'type',
    width: 200,
    slots: { customRender: 'type' }
  },
  {
    title: '会员到期时间',
    dataIndex: 'expTime',
    slots: { customRender: 'expTime' }
  },
  {
    title: '订阅日期',
    dataIndex: 'subTime',
    slots: { customRender: 'subTime' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
];

const sourceData = ref([]);

const fetchData = async (payload?: any) => {
  const { code, data } = await getSubscribe(payload)
  if(data){
    sourceData.value = data.list
  }
}

const resetHandle = async () => {
  email.value = ''
  status.value = 1
  fetchData()
}

const filterHandle = async () => {
  const typeName = typeof status.value === 'number' ? 'type' : 'status'
  fetchData({
    email: email.value,
    [typeName]: status.value
  })
}

const statusHandle = async (item:any, check: boolean) => {
  const { _id } = item
  const { code, data } = await putSubscribe(_id, { status: check })
  const typeName = typeof status.value === 'number' ? 'type' : 'status'
  if(code === 0 && data) {
    fetchData({
      email: email.value,
      [typeName]: status.value
    })
  }
}

const loadDataHandle = async () => {
  fetchData({
    email: email.value,
    type: status.value
  })
}

const editHandle = (item: any) => {
  const { email, expTime, _id } = item
  editViewModal.value.setFormData({ email, expTime, _id })
  editViewModal.value.editView.showModal()
}


fetchData()
</script>
<style lang="scss" scoped>
.subscribe-wrap{
  display: flex;
  justify-content: space-between;
  padding: 24px;
  .subscribe-btn{
    :deep(.btn-default){
      margin-right: 20px;
    }
  }
}
.subscribe-opera{
  display: flex;
  justify-content: space-between;

  width: 60%;
  .subscribe-opera__email{
    width: 45%;
    min-width: 200px;
    display: inline-flex;
    align-items: center;
    & > span{
      width: 50px;
      flex-shrink: 0;
    }
  }
  .subscribe-opera__type{
    width: 45%;
    min-width: 200px;
    & > span{
      width: 100px;
      flex-shrink: 0;
    }
    :deep(.ant-select) {
      width: calc(100% - 100px) !important;
    }
  }
}

.subscribe-content{
  padding: 24px;
  :deep(.content-add){
    margin-bottom: 24px;
  }
}
</style>
