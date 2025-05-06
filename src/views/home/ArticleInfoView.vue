<script setup>
import { PlusOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";

const router = useRouter();
const user = ref({});
const keyword = ref("");
const articles = ref([]);

async function fetchData() {
  try {
    const response = await axios.get("http://127.0.0.1:8080/api/article/list", {
      params: {
        author: user.value.name,
        keyword: keyword.value,
      },
    });
    console.log(response.data);

    if (response.data.code == 200) {
      articles.value = response.data.data.articles;
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    ElMessage.error("获取数据失败" + error);
  }
}
onMounted(() => {
  user.value = JSON.parse(sessionStorage.getItem("user"));
});
onMounted(() => {
  fetchData();
});
function handleArticle() {
  router.push("/home/article");
}
</script>

<template>
  <el-container>
    <el-header class="articleinfo-header">
      <el-aside class="articleinfo-header-aside">
        <div class="avatar">
          <el-avatar shape="square" fit="contain" :src="user.avatar" />
        </div>
      </el-aside>
      <el-main class="articleinfo-header-main">
        <!-- <el-calendar v-model="date" /> -->
        <el-descriptions
          title="用户基本信息"
          column="1"
          border
          label-width="80"
        >
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
        <el-button
          type="primary"
          @click="handleArticle()"
          style="width: 10%; margin: 0 auto; margin-top: 10px"
          >返回</el-button
        >
      </el-main>
    </el-header>
    <el-main class="articleinfo-main">
      <div class="table-header">
        <el-button plain type="primary" style="height: 40px" @click="">
          <PlusOutlined class="icon" />
          新增
        </el-button>
        <el-input
          v-model="keyword"
          placeholder="请输入昵称"
          :prefix-icon="SearchOutlined"
          @keyup.enter=""
        />
        <el-button type="primary" style="height: 40px" @click="">
          <PlusOutlined class="icon" />
          搜索
        </el-button>
      </div>
      <el-table
        :data="articles"
        style="width: 100%"
        :show-overflow-tooltip="true"
        :row-style="{ height: '48px' }"
        :header-row-style="{ height: '48px' }"
        height="350px"
        border
      >
        <el-table-column prop="id" label="序号" width="60" />
        <el-table-column prop="title" label="文章标题" width="250" />
        <el-table-column prop="content" label="文章内容" min-width="150" />
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleOpen('修改联系人', 'edit', scope.row)"
            >
              编辑
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<style scoped>
.articleinfo-header {
  display: flex;
  height: 100%;
}
.articleinfo-header-aside {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
}

.articleinfo-header-main {
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 48px 20px;
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

:deep(.el-descriptions__title) {
  margin-left: auto;
  margin-right: auto;
  font-size: 24px;
}

:deep(.el-descriptions__body) {
  border-radius: 4px;
  padding: 0 20px;
}

.table-header {
  display: flex;
  width: 100%;
}

.el-input {
  width: 250px;
  margin-left: auto;
  margin-right: 4px;
}

.articleinfo-main {
  background-color: white;
}
</style>
