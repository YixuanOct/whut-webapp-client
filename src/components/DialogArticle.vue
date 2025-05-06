<script setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const emit = defineEmits(["add", "edit"]);

const visible = ref(false);
const form = ref({});
const dialogTitle = ref("");
const dialogType = ref("");
const formRef = ref(null);

const rules = {
  title: [{ required: true, message: "请选择标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
};

function open(title, type, data) {
  if (type === "add") {
    form.value = {
      id: "",
      title: "",
      content: "",
      author: data,
    };
  } else {
    form.value = { ...data };
  }
  dialogTitle.value = title;
  dialogType.value = type;
  visible.value = true;
}
async function handleConfirm() {
  try {
    const valid = await formRef.value.validate();
    if (valid) {
      ElMessageBox.confirm("确定提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        emit(dialogType.value, form.value);
        visible.value = false;
      });
    }
  } catch (error) {
    ElMessage.error("提交失败，请检查输入");
  }
}
defineExpose({
  open,
});
</script>
<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    width="400px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      :hide-required-asterisk="true"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
:deep(.el-date-editor.el-input) {
  width: 100%;
}
</style>
