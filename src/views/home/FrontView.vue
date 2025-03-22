<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

const date = ref(new Date());
const user = ref({});

onMounted(() => {
  user.value = JSON.parse(sessionStorage.getItem("user"));
});
</script>

<template>
  <el-container>
    <el-aside class="front-aside">
      <h2>欢迎 {{ user.name }}</h2>
      <div class="avatar">
        <el-avatar
          shape="square"
          fit="contain"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        />
      </div>
    </el-aside>
    <el-main class="front-main">
      <el-calendar v-model="date" />
    </el-main>
  </el-container>
</template>

<style scoped>
.front-aside {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
}

.front-main {
  flex: 2;
}

.avatar {
  width: 100%;
  aspect-ratio: 3/2;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-avatar {
  width: 90%;
  height: 90%;
  border-radius: 4px;
  --el-avatar-bg-color: transition;
  border-radius: 4px;
}
</style>
