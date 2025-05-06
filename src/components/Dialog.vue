<script setup>
import { ref, watch, computed, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { pcTextArr } from "element-china-area-data";

const emit = defineEmits(["add", "edit"]);

const visible = ref(false);
const form = ref({});
const dialogTitle = ref("");
const dialogType = ref("");
const formRef = ref(null);
const provinces = computed(() => pcTextArr);
const cities = ref([]);

const skipReset = ref(false);

watch(
  () => form.value.province,
  (newVal, oldVal) => {
    const provinceObj = pcTextArr.find((item) => item.value === newVal);
    cities.value = provinceObj ? provinceObj.children : [];
    if (!skipReset.value && newVal !== oldVal) {
      form.value.city = "";
    }
  },
  { immediate: true }
);

const rules = {
  date: [{ required: true, message: "请选择日期", trigger: "blur" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  province: [{ required: true, message: "请选择省份", trigger: "blur" }],
  city: [{ required: true, message: "请选择市区", trigger: "blur" }],
  address: [{ required: true, message: "请输入地址", trigger: "blur" }],
  zip: [
    { required: true, message: "请输入邮编", trigger: "blur" },
    {
      pattern: /^\d{6}$/,
      message: "请输入正确的邮编",
      trigger: "blur",
    },
  ],
};

function open(title, type, data) {
  if (type === "add") {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    form.value = {
      id: "",
      date: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
      name: "",
      province: "",
      city: "",
      address: "",
      zip: "",
    };
  } else {
    form.value = { ...data };
  }
  dialogTitle.value = title;
  dialogType.value = type;
  skipReset.value = true;
  nextTick(() => {
    skipReset.value = false;
  });
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
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="form.date"
          type="datetime"
          value-format="YYYY-MM-DDTHH:mm:SS"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-select v-model="form.province" placeholder="请选择省份">
          <el-option
            v-for="item in provinces"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="市区" prop="city">
        <el-select v-model="form.city" placeholder="请选择市区">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="邮编" prop="zip">
        <el-input v-model="form.zip" />
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
