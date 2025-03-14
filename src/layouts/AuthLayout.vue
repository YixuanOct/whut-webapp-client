<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import anime from "animejs/lib/anime.es.js";

const route = useRoute();
const nextPosition = ref(100);

function beforeEnter(el) {
  anime.set(el, {
    translateX: nextPosition.value,
    opacity: 0,
  });
}
function enter(el, done) {
  anime({
    targets: ".auth-main",
    height: el.clientHeight + 24,
    duration: 400,
    easing: "easeOutExpo",
  });
  anime({
    targets: el,
    translateX: 0,
    opacity: 1,
    duration: 400,
    easing: "easeOutExpo",
    complete: done,
  });
}
function leave(el, done) {
  anime({
    targets: el,
    translateX: -nextPosition.value,
    opacity: 0,
    duration: 400,
    easing: "easeInExpo",
    complete: done,
  });
}

watch(
  () => route.meta.index,
  (newIndex, oldIndex) => {
    if (newIndex > oldIndex) {
      nextPosition.value = 100;
    } else {
      nextPosition.value = -100;
    }
  }
);
onMounted(() => {
  const mainEl = document.querySelector(".auth-main");
  anime.set(mainEl, {
    height: mainEl.clientHeight,
  });
});
</script>
<template>
  <el-container class="auth-container">
    <el-main class="auth-main">
      <router-view v-slot="{ Component }">
        <transition
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>
<style scoped>
.auth-container {
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}

.auth-main {
  flex: none;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  padding: 12px 25px;
  overflow: hidden;
  height: auto !important;
}
</style>
