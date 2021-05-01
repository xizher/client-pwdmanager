<template>
  <div class="header">
    <div class="title">🔒🔓🔏🔐🔑🗝</div>
    <div class="exit" @click="push('/login')">退出🔚</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter()
const push = path => router.push(path)

</script>

<style scoped lang="scss">
.header {
  background-color: #4C4A48;
  color: #F7F7F7;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.title {
  cursor: default;
}
.menu {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 16px;
  .menu-item {
    height: 100%;
    line-height: 48px;
    padding: 0 8px;
    margin: 0 8px;
    cursor: pointer;
    transition: .3s;
    &:hover {
      background-color: #8C8987;
    }
  }
}
.exit {
  margin-left: auto;
  cursor: pointer;
}
</style>
