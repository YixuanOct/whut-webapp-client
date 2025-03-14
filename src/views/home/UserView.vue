<script setup>
import { PlusOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { ref, computed, onMounted } from "vue";
import Dialog from "@/components/Dialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";

const originData = ref([
  {
    id: "1",
    date: "2016-05-03 08:00:00",
    name: "王小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    postcode: "200333",
  },
  {
    id: "2",
    date: "2016-05-03 08:00:00",
    name: "张小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    postcode: "200333",
  },
  {
    id: "3",
    date: "2016-05-03 08:00:00",
    name: "刘小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    postcode: "200333",
  },
  {
    id: "4",
    date: "2016-05-03 08:00:00",
    name: "李小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    postcode: "200333",
  },
  {
    id: "5",
    date: "2016-05-03 08:00:00",
    name: "赵小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    postcode: "200333",
  },
  {
    id: "6",
    date: "2016-05-03 08:00:00",
    name: "吴小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    postcode: "200333",
  },
]);
const filteredData = ref(originData.value);
const currentPage = ref(1);
const pageSize = ref(5);
const total = computed(() => filteredData.value.length);
const maxId = computed(() => {
  return Math.max(...originData.value.map((item) => item.id));
});
const DisplayedData = computed(() => {
  return filteredData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
});
const keyword = ref("");
const dialogRef = ref(null);

function handleSearch() {
  if (keyword.value.trim() === "") {
    filteredData.value = originData.value;
  } else {
    filteredData.value = originData.value.filter((item) =>
      item.name.includes(keyword.value)
    );
  }
  currentPage.value = 1;
}
function handleOpen(title, type, data) {
  dialogRef.value.open(title, type, data);
}
function handleAdd(data) {
  data.id = maxId.value + 1;
  //和后端交互
  originData.value.push(data);
  handleSearch();
  ElMessage.success("添加成功");
}
function handleEdit(data) {
  const item = originData.value.find((item) => item.id === data.id);
  //和后端交互
  if (item) {
    Object.assign(item, data);
  }
  handleSearch();
  ElMessage.success("修改成功");
}
function handleDelete(data) {
  ElMessageBox.confirm("确定删除吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    originData.value = originData.value.filter((item) => item.id !== data.id);
    //和后端交互
    handleSearch();
    ElMessage.success("删除成功");
  });
}
</script>

<template>
  <el-container class="user-container">
    <Dialog ref="dialogRef" @add="handleAdd" @edit="handleEdit" />
    <el-header class="user-header">
      <h1 style="margin-bottom: 3rem">用户管理</h1>
      <div class="table-header">
        <el-button
          plain
          type="primary"
          style="height: 40px"
          @click="handleOpen('新增用户', 'add')"
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
    <el-main class="user-main">
      <el-table
        :data="DisplayedData"
        style="width: 100%"
        :show-overflow-tooltip="true"
        :row-style="{ height: '48px' }"
        :header-row-style="{ height: '48px' }"
        height="100%"
        border
      >
        <el-table-column prop="id" label="序号" width="100" />
        <el-table-column prop="date" label="日期" width="200" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="province" label="省份" width="150" />
        <el-table-column prop="city" label="市区" width="100" />
        <el-table-column prop="address" label="地址" min-width="250" />
        <el-table-column prop="postcode" label="邮编" width="100" />
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleOpen('编辑用户', 'edit', scope.row)"
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
    <el-footer class="user-footer">
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
.user-container {
  background-color: white;
  height: 100%;
}

.user-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
}

.user-main {
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

.user-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-body {
  height: calc(100%-40px);
}
</style>
