<template>
  <edit-modal
    ref="editView"
    :title="isEdit ? '编辑' : '创建'"
    @confirmHandle="confirmHandle"
  >
    <template v-slot:content>
      <a-form layout="vertical" :model="form" v-bind="{
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
      }">
        <a-form-item label="邮箱">
          <a-input :disabled="isEdit" v-model:value="form.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item label="会员有效期">
          <a-input v-model:value="form.vipTime" placeholder="会员有效期" />
        </a-form-item>
      </a-form>
    </template>
  </edit-modal>
</template>
<script lang="ts" setup>
import * as moment from 'moment';
import EditModal from './check.vue';
import { reactive, ref, } from 'vue';
import type { UnwrapRef } from 'vue';
import { putSubscribe } from '@/api/subscribe';
const editView = ref()
const isEdit = ref(false)
interface Form {
  email: string;
  vipTime: string;
  expTime: string;
  _id: string;
}
const emits = defineEmits<{
  (e: 'loadData'): void
}>()
let form: UnwrapRef<Form> = reactive({
  email: '',
  vipTime: '',
  expTime: '',
  _id: ''
})

const setFormData = ({ email, expTime, _id }: Form) => {
  form.email = email
  form.expTime = expTime
  form._id = _id
  isEdit.value = true
}

const confirmHandle = async () => {
  if(!form.vipTime) return false
  // 确认按钮，更新数据
  const durationTime = form.vipTime
  const expTime =
    form.expTime
     ? moment(new Date(form.expTime)).add(durationTime, 'd').toISOString()
      : ''
  const { code, data } = await putSubscribe(form._id, { expTime })
  if (code === 0 && data) {
    form.vipTime = ''
    form.expTime = ''
    // 关闭
    editView.value.handleCancel()
    emits('loadData')
  }
}

defineExpose({
  editView,
  setFormData
})
</script>
