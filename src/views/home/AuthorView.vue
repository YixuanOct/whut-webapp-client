<script setup>
import { PlusOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { onMounted, ref, watch } from "vue";
import Dialog from "@/components/Dialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import axios from "axios";

const authors = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const keyword = ref("");
const dialogRef = ref(null);

async function fetchData() {
  try {
    const response = await axios.get("http://127.0.0.1:8080/api/author/list", {
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
      },
    });
    if (response.data.code == 200) {
      authors.value = response.data.data.authors;
      total.value = response.data.data.total;
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    ElMessage.error("获取数据失败");
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}
function handleOpen(title, type, data) {
  dialogRef.value.open(title, type, data);
}
async function handleAdd(data) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/api/author/add",
      data
    );
    if (response.data.code == 200) {
      ElMessage.success("添加成功");
      fetchData();
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    ElMessage.error("添加失败");
  }
}
async function handleEdit(data) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/api/author/edit",
      data
    );
    if (response.data.code == 200) {
      ElMessage.success("修改成功");
      fetchData();
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    ElMessage.error("修改失败");
  }
}
function handleDelete(data) {
  ElMessageBox.confirm("此操作将永久删除该联系人，是否继续？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/author/delete",
        data
      );
      if (response.data.code == 200) {
        ElMessage.success("删除成功");
        fetchData();
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      ElMessage.error("删除失败");
    }
  });
}
const dateFormatter = (row, column, cellValue, index) => {
  return cellValue ? cellValue.replace("T", " ") : cellValue;
};

watch([currentPage, pageSize], () => {
  fetchData();
});
onMounted(() => {
  fetchData();
});
</script>

<template>
  <el-container class="author-container">
    <Dialog ref="dialogRef" @add="handleAdd" @edit="handleEdit" />
    <el-header class="author-header">
      <h1 style="margin-bottom: 3rem">联系人管理</h1>
      <div class="table-header">
        <el-button
          plain
          type="primary"
          style="height: 40px"
          @click="handleOpen('新增联系人', 'add')"
        >
          <PlusOutlined class="icon" />
          新增
        </el-button>
        <el-input
          v-model="keyword"
          placeholder="请输入昵称"
          :prefix-icon="SearchOutlined"
          @keyup.enter="handleSearch"
        />
        <el-button type="primary" style="height: 40px" @click="handleSearch">
          <PlusOutlined class="icon" />
          搜索
        </el-button>
      </div>
    </el-header>
    <el-main class="author-main">
      <el-table
        :data="authors"
        style="width: 100%"
        :show-overflow-tooltip="true"
        :row-style="{ height: '48px' }"
        :header-row-style="{ height: '48px' }"
        height="100%"
        border
      >
        <el-table-column prop="id" label="序号" width="100" />
        <el-table-column
          prop="date"
          label="日期"
          width="200"
          :formatter="dateFormatter"
        />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="province" label="省份" width="150" />
        <el-table-column prop="city" label="市区" width="100" />
        <el-table-column prop="address" label="地址" min-width="250" />
        <el-table-column prop="zip" label="邮编" width="100" />
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
    <el-footer class="author-footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next"
        :total="total"
      />
    </el-footer>
  </el-container>
</template>

<style scoped>
.author-container {
  background-color: white;
  height: 100%;
}

.author-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
}

.author-main {
  padding-top: 2px;
}

.icon {
  margin-right: 4px;
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

.author-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-body {
  height: calc(100%-40px);
}
</style>
