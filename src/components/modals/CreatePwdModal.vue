<template>
  <Modal
    title="添加账户信息"
    centered
    :visible="visible"
    @cancel="cancel"
    @ok="sumbitExec"
  >
    <div class="form">
      <Input v-model:value="name" placeholder="登录账户" />
      <Input v-model:value="pwd" placeholder="登录密码" type="password" />
      <TextArea v-model:value="comment" placeholder="备注" auto-size />
    </div>
  </Modal>
</template>

<script setup>
import { defineEmit, defineProps, reactive } from 'vue'
import { Modal, Input } from 'ant-design-vue'
import TextArea from 'ant-design-vue/es/input/TextArea'
import { useCreate } from '../../hooks/pwd.hooks'
import { cryptoUtils } from '@xizher/js-utils'
const props = defineProps({
  visible: { type: Boolean, default: false },
})
const emit = defineEmit(['update:visible', 'loadDataSource'])
const cancel = () => emit('update:visible', false)
const state = reactive({
  name: '',
  pwd: '',
  comment: '',
})
const { name, pwd, comment, sumbit } = useCreate()
function sumbitExec () {
  sumbit().then(res => {
    if (res) {
      cancel()
      emit('loadDataSource')
    }
  })
}
</script>

<style scoped>
.form > * {
  margin: 8px 0;
}
</style>
