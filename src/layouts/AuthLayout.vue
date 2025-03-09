<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const enterActiveClass = ref("");
const leaveActiveClass = ref("");
const route = useRoute();

watch(
  () => route.meta.index,
  (newIndex, oldIndex) => {
    if (newIndex > oldIndex) {
      enterActiveClass.value = "animate__animated animate__fadeInRight";
      leaveActiveClass.value = "animate__animated animate__fadeOutLeft";
    } else {
      enterActiveClass.value = "animate__animated animate__fadeInLeft";
      leaveActiveClass.value = "animate__animated animate__fadeOutRight";
    }
  }
);
</script>
<template>
  <el-container class="auth-container">
    <el-main class="auth-main">
      <router-view v-slot="{ Component }">
        <Transition
          mode="out-in"
          :enter-active-class="enterActiveClass"
          :leave-active-class="leaveActiveClass"
        >
          <component :is="Component" />
        </Transition>
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
}
</style>
