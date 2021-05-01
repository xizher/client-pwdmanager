<template>
  <Modal
    title="编辑账户信息"
    centered
    :visible="visible"
    @cancel="cancel"
    @ok="modityExec"
  >
    <div class="form">
      <Input v-model:value="state.name" placeholder="登录账户" />
      <Input v-model:value="state.pwd" placeholder="登录密码" type="password" />
      <TextArea v-model:value="state.comment" placeholder="备注" auto-size />
    </div>
  </Modal>
</template>

<script setup>
import { Input, Modal } from 'ant-design-vue'
import TextArea from 'ant-design-vue/es/input/TextArea'
import { defineEmit, defineProps, watch } from 'vue'
import { useModity } from '../../hooks/pwd.hooks'
const props = defineProps({
  visible: { type: Boolean, default: false },
  item: { type: Object, default: () => {} },
})
const emit = defineEmit(['update:visible', 'loadDataSource'])
const cancel = () => emit('update:visible', false)
const { state, modity } = useModity()
watch(() => props.visible, visible => {
  visible && Object.keys(state).forEach(key => state[key] = props.item[key])
})
function modityExec () {
  modity().then(res => {
    if (res) {
      emit('loadDataSource')
      cancel()
    }
  })
}

</script>

<style scoped>
.form > * {
  margin: 8px 0;
}
</style>
