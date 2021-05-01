<template>
  <div class="content">
    <Input v-model:value="cryptoVal" placeholder="口令" type="password" />
    <Button type="primary" block @click="createPwdModalVisible = true">添加</Button>
    <CreatePwdModal v-model:visible="createPwdModalVisible" @loadDataSource="loadDataSource" />
    <ModityPwdModal v-model:visible="modityPwdModalVisible" @loadDataSource="loadDataSource" :item="modityItem" />
    <Table
      :columns="columns"
      :data-source="dataSource"
      rowKey="id"
      size="small"
    >
      <template #pwd="{ text, record }">
        {{ record.visible ? cryptoUtils.decrypto(text) : text }}
      </template>
      <template #actions="{ record }">
        <Button
          @mouseenter="crypto(record, true)"
          @mouseleave="crypto(record, false)"
          size="small"
        >
          解密
        </Button>
        <Button @click="copy(record.pwd)" size="small">复制</Button>
        <Button @click="showModity(record)" size="small">编辑</Button>
      </template> -->
    </Table>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Button, Input, Table, Pagination } from 'ant-design-vue'
import CreatePwdModal from '../modals/CreatePwdModal.vue'
import ModityPwdModal from '../modals/ModityPwdModal.vue'
import { useCryptoVal, useList } from '../../hooks/pwd.hooks'
import { baseUtils, cryptoUtils } from '@xizher/js-utils'
const cryptoVal = useCryptoVal()
const createPwdModalVisible = ref(false)
const modityPwdModalVisible = ref(false)
const { dataSource, loadDataSource, columns } = useList()
const crypto = (e, isShowRight) => e.visible = isShowRight
const copy = text => baseUtils.copyText(cryptoUtils.decrypto(text))
const modityItem = reactive({})
const showModity = e => {
  modityPwdModalVisible.value = true
  modityItem.id = e.id
  modityItem.name = e.name
  modityItem.pwd = cryptoUtils.decrypto(e.pwd)
  modityItem.comment = e.comment
}
</script>

<style scoped lang="scss">
.content {
  height: calc(100vh - 48px);
  overflow: auto;
  background-color: #F7F7F7;
}
</style>
