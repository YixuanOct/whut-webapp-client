<script setup>
import SidebarNav from "@/components/SidebarNav.vue";
import { ref } from "vue";
</script>

<template>
  <el-container class="home-container">
    <el-aside width="250px">
      <SidebarNav />
    </el-aside>
    <el-container class="home-sub-container">
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

.home-header {
  background-color: var(--el-color-primary-dark-2);
}

.home-main {
  background-color: var(--el-color-primary-light-8);
}
</style>
