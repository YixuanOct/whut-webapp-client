<script setup>
import SidebarNav from "@/components/SidebarNav.vue";
import { onMounted, ref } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
import anime from "animejs/lib/anime.es.js";

const theme = ref("blue-theme");
const isMobile = ref(false);
const isOpen = ref(false);

function toggleBlueTheme() {
  theme.value = "blue-theme";
  isOpen.value = false;
}
function toggleYellowTheme() {
  theme.value = "yellow-theme";
  isOpen.value = false;
}

function beforeEnter(el) {
  anime.set(el, {
    opacity: 0,
    scale: 0.8,
  });
}
function enter(el, done) {
  anime({
    targets: el,
    opacity: 1,
    scale: 1,
    duration: 400,
    easing: "easeOutExpo",
    complete: done,
  });
}
function leave(el, done) {
  anime({
    targets: el,
    opacity: 0,
    scale: 0.8,
    duration: 400,
    easing: "easeInExpo",
    complete: done,
  });
}
function handleResize() {
  isMobile.value = window.innerWidth < 800;
}
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
</script>

<template>
  <el-container class="home-container">
    <el-aside :width="isMobile ? '0px' : '200px'">
      <el-drawer
        v-model="isOpen"
        direction="ltr"
        size="200px"
        :with-header="false"
        body-class="home-drawer"
        v-if="isMobile"
      >
        <SidebarNav
          :class="theme"
          @toggle-blue-theme="toggleBlueTheme"
          @toggle-yellow-theme="toggleYellowTheme"
          @close-drawer="isOpen = false"
        />
      </el-drawer>
      <SidebarNav
        :class="theme"
        @toggle-blue-theme="toggleBlueTheme"
        @toggle-yellow-theme="toggleYellowTheme"
        @close-drawer="isOpen = false"
        v-else
      />
    </el-aside>
    <el-container class="home-sub-container" :class="theme">
      <el-header class="home-header">
        <el-button v-if="isMobile" link @click="isOpen = !isOpen" color="black">
          <MenuOutlined class="icon" />
        </el-button>
      </el-header>
      <el-main class="home-main">
        <router-view v-slot="{ Component }">
          <transition
            mode="out-in"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
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
  display: flex;
  align-items: center;
}

:deep(.home-drawer) {
  padding: 0;
}

.icon {
  font-size: 20px;
}
.el-button {
  outline: none;
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
