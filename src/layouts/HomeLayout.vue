<script setup>
import SidebarNav from "@/components/SidebarNav.vue";
import { onMounted, ref } from "vue";
import { MenuOutlined, DownOutlined } from "@ant-design/icons-vue";
import anime from "animejs/lib/anime.es.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const theme = ref("blue-theme");
const isMobile = ref(false);
const isOpen = ref(false);
const router = useRouter();
const user = ref({});

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
function handleIconToggle(visible) {
  if (visible) {
    anime({
      targets: ".down-icon",
      rotate: 180,
      duration: 400,
      easing: "easeInOutQuad",
    });
  } else {
    anime({
      targets: ".down-icon",
      rotate: 0,
      duration: 400,
      easing: "easeInOutQuad",
    });
  }
}
function handleLogout() {
  sessionStorage.removeItem("user");
  ElMessage.success("退出登录成功");
  router.push("/auth/login");
}
function closeDrawer(path) {
  isOpen.value = false;
  router.push(path);
}
function handleResize() {
  isMobile.value = window.innerWidth < 800;
}
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
onMounted(() => {
  user.value = JSON.parse(sessionStorage.getItem("user"));
});
</script>

<template>
  <el-container class="home-container">
    <el-aside :width="isMobile ? '0px' : '200px'" class="home-aside">
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
          @close-drawer="closeDrawer"
        />
      </el-drawer>
      <SidebarNav
        :class="theme"
        @toggle-blue-theme="toggleBlueTheme"
        @toggle-yellow-theme="toggleYellowTheme"
        @close-drawer="closeDrawer"
        v-else
      />
    </el-aside>
    <el-container class="home-sub-container" :class="theme">
      <el-header class="home-header">
        <el-button v-if="isMobile" link @click="isOpen = !isOpen" color="black">
          <MenuOutlined class="icon" />
        </el-button>
        <el-dropdown class="dropdown" @visible-change="handleIconToggle">
          <span>
            {{ user.name }}
            <DownOutlined class="down-icon" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                日历
              </el-dropdown-item>
              <el-dropdown-item @click="handleLogout">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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

.home-aside {
  user-select: none;
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

.dropdown {
  margin-left: auto;
  color: white;
}

:deep(.el-tooltip__trigger) {
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
