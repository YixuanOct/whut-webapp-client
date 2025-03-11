<script setup>
import SidebarNav from "@/components/SidebarNav.vue";
import { ref } from "vue";

const theme = ref("blue-theme");
</script>

<template>
  <el-container class="home-container">
    <el-aside width="200px">
      <SidebarNav
        :class="theme"
        @toggle-blue-theme="() => (theme = 'blue-theme')"
        @toggle-yellow-theme="() => (theme = 'yellow-theme')"
      />
    </el-aside>
    <el-container class="home-sub-container" :class="theme">
      <el-header class="home-header"> </el-header>
      <el-main class="home-main">
        <router-view v-slot="{ Component }">
          <transition>
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.home-container {
  width: 100vw;
  height: 100vh;
}

.home-sub-container {
  width: 100%;
  height: 100%;
}

.blue-theme .home-header {
  background-color: var(--el-color-primary-dark-2);
}

.blue-theme .home-main {
  background-color: var(--el-color-primary-light-8);
}

.yellow-theme .home-header {
  background-color: var(--el-color-warning-dark-2);
}

.yellow-theme .home-main {
  background-color: var(--el-color-warning-light-8);
}
</style>
