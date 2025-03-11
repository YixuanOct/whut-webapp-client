<script setup>
import { ref } from "vue";
import {
  HomeOutlined,
  CompassOutlined,
  SkinOutlined,
  EnvironmentOutlined,
  UserOutlined,
  ReadOutlined,
  HighlightTwoTone,
} from "@ant-design/icons-vue";

const isCollapse = ref(false);
</script>

<template>
  <el-menu
    :collapse="isCollapse"
    :default-openeds="['2', '3']"
    default-active="1"
  >
    <el-menu-item index="1">
      <HomeOutlined class="icon" />
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <CompassOutlined class="icon" />
        <span>功能菜单</span>
      </template>
      <el-menu-item index="2-1">
        <UserOutlined class="icon" />
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="2-2">
        <ReadOutlined class="icon" />
        <span>文章管理</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <SkinOutlined class="icon" />
        <span>主题切换</span>
      </template>
      <el-menu-item @click="$emit('toggleBlueTheme')">
        <HighlightTwoTone class="icon" twoToneColor="#409EFF" />
        <span>蓝色风格</span>
      </el-menu-item>
      <el-menu-item @click="$emit('toggleYellowTheme')">
        <HighlightTwoTone class="icon" twoToneColor="#E6A23C" />
        <span>黄色风格</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4">
      <EnvironmentOutlined class="icon" />
      <span>导航三</span>
    </el-menu-item>
    <el-menu-item index="5">
      <EnvironmentOutlined class="icon" />
      <span>导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.icon {
  margin-right: 20px;
}

.blue-theme .el-menu-item.is-active {
  color: var(--el-color-primary);
}

.blue-theme :deep(.el-sub-menu__title),
.blue-theme .el-menu-item:not(.el-sub-menu .el-menu-item) {
  background-color: var(--el-color-primary-light-5);
}

.blue-theme :deep(.el-sub-menu__title:hover),
.blue-theme .el-menu-item:hover {
  background-color: var(--el-color-primary-light-9) !important;
}

.blue-theme .el-menu-item.is-active {
  background-color: var(--el-color-primary-light-9) !important;
}

.yellow-theme .el-menu-item.is-active {
  color: var(--el-color-warning);
}

.yellow-theme :deep(.el-sub-menu__title),
.yellow-theme .el-menu-item:not(.el-sub-menu .el-menu-item) {
  background-color: var(--el-color-warning-light-5);
}

.yellow-theme :deep(.el-sub-menu__title:hover),
.yellow-theme .el-menu-item:hover {
  background-color: var(--el-color-warning-light-9) !important;
}

.yellow-theme .el-menu-item.is-active {
  background-color: var(--el-color-warning-light-9) !important;
}
</style>
