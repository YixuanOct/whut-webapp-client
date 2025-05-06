<script setup>
import { ref } from "vue";
import { onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({});
const users = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);

onMounted(() => {
  user.value = JSON.parse(sessionStorage.getItem("user"));
});
watch([currentPage, pageSize], () => {
  fetchData();
});
onMounted(() => {
  fetchData();
});

async function fetchData() {
  try {
    const response = await axios.get("http://127.0.0.1:8080/api/user/list", {
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
      },
    });

    if (response.data.code == 200) {
      users.value = response.data.data.users;
      total.value = response.data.data.total;
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    ElMessage.error("获取数据失败");
  }
}

function handleArticleInfo() {
    router.push("/home/articleinfo");
}
</script>

<template>
  <el-container>
    <el-main class="article-main">
      <el-card>
        <template #header>
          <h2>作者列表</h2>
        </template>
        <el-table
          :data="users"
          :show-overflow-tooltip="true"
          :row-style="{ height: '48px' }"
          :header-row-style="{ height: '48px' }"
          height="300px"
          border
        >
          <el-table-column prop="id" label="序号" width="60" />
          <el-table-column prop="name" label="作者姓名" min-width="100"/>
          <el-table-column prop="title_count" label="文章数量" width="100" />
          <el-table-column label="操作" width="145">
            <template #default="scope">
              <el-button type="primary" @click="handleArticleInfo()">进入文章管理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next"
          :total="total"
        />
      </el-card>
      <el-card>
        <template #header>
          <h2>作者发布文章统计图表</h2>
        </template>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped>
.article-main {
  display: flex;
}
.el-card {
  flex: 1;
  margin: 0 5px;
  text-align: center;
}
:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-pagination {
  margin-top: 10px;
}
</style>
