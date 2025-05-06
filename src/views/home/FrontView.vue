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
      <div class="avatar">
        <el-avatar
          shape="square"
          fit="contain"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        />
      </div>
    </el-aside>
    <el-main class="front-main">
      <!-- <el-calendar v-model="date" /> -->
      <el-descriptions title="用户基本信息" column="1" border label-width="80">
        <el-descriptions-item label="用户名">{{
          user.name
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{
          user.email
        }}</el-descriptions-item>
        <el-descriptions-item label="余额">0</el-descriptions-item>
        <el-descriptions-item label="生日">{{
          user.birthday
        }}</el-descriptions-item>
      </el-descriptions>
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

.el-descriptions {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 20px 0;
}
:deep(.el-descriptions__title) {
  margin-left: auto;
  margin-right: auto;
  font-size: 24px;
}
:deep(.el-descriptions__body) {
  border-radius: 4px;
  padding: 0 20px;
}
</style>
