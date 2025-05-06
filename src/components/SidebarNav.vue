<script setup>
import {
  HomeOutlined,
  CompassOutlined,
  SkinOutlined,
  EnvironmentOutlined,
  UserOutlined,
  ReadOutlined,
  HighlightTwoTone,
} from "@ant-design/icons-vue";

const emit = defineEmits(["closeDrawer"]);
</script>

<template>
  <el-menu :default-openeds="['2', '3']" default-active="1">
    <el-menu-item index="1" @click="$emit('closeDrawer', '/home/front')">
      <template #title>
        <HomeOutlined class="icon" />
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <CompassOutlined class="icon" />
        <span>功能菜单</span>
      </template>
      <el-menu-item index="2-1" @click="$emit('closeDrawer', '/home/author')">
        <template #title>
          <UserOutlined class="icon" />
          <span>联系人管理</span>
        </template>
      </el-menu-item>
      <el-menu-item>
        <template #title>
          <ReadOutlined class="icon" />
          <span>文章管理</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <SkinOutlined class="icon" />
        <span>主题切换</span>
      </template>
      <el-menu-item @click="$emit('toggleBlueTheme')">
        <template #title>
          <HighlightTwoTone class="icon" twoToneColor="#409EFF" />
          <span>蓝色风格</span>
        </template>
      </el-menu-item>
      <el-menu-item @click="$emit('toggleYellowTheme')">
        <template #title>
          <HighlightTwoTone class="icon" twoToneColor="#E6A23C" />
          <span>黄色风格</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item>
      <template #title>
        <EnvironmentOutlined class="icon" />
        <span>导航三</span>
      </template>
    </el-menu-item>
    <el-menu-item>
      <template #title>
        <EnvironmentOutlined class="icon" />
        <span>导航四</span>
      </template>
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
