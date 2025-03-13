<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const router = useRouter();
const registerForm = ref({
  username: "",
  password: "",
  email: "",
  date: "",
  avatarUrl: "",
});
const registerFormRef1 = ref(null);
const registerFormRef2 = ref(null);
const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, message: "密码长度不能小于 8 位", trigger: "blur" },
    {
      pattern: /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/,
      message: "仅允许字母、数字及特殊符号",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" },
  ],
  date: [{ required: true, message: "请选择日期", trigger: "blur" }],
  avatarUrl: [{ required: true, message: "请上传头像", trigger: "blur" }],
};

function handleSuccess(uploadFile) {
  if (uploadFile.raw) {
    registerForm.value.avatarUrl = URL.createObjectURL(uploadFile.raw);
  } else {
    ElMessage.error("上传头像失败！");
  }
}
function beforeUpload(rawFile) {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("头像图片只能是 JPG 或 PNG 格式！");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像图片大小不能超过 2MB！");
    return false;
  }
  return true;
}

async function handleRegister() {
  try {
    const [valid1, valid2] = await Promise.all([
      registerFormRef1.value.validate(),
      registerFormRef2.value.validate(),
    ]);
    if (valid1 && valid2) {
      console.log(registerForm.value);
      // TODO: 向后端发送注册请求

      ElMessage.success("注册成功");
    }
  } catch (error) {
    ElMessage.error("注册失败，请检查输入");
  }
}
</script>
<template>
  <el-container>
    <el-header class="register-header">注 册 新 用 户</el-header>

    <el-main class="register-main">
      <el-form
        :model="registerForm"
        :rules="rules"
        status-icon
        ref="registerFormRef1"
      >
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" placeholder="密码" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item prop="date">
          <el-date-picker
            v-model="registerForm.date"
            placeholder="日期"
            :editable="false"
          />
        </el-form-item>
      </el-form>

      <el-divider direction="vertical" class="divider" />

      <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerFormRef2"
        :hide-required-asterisk="true"
      >
        <el-form-item
          prop="avatarUrl"
          label="请上传头像"
          label-position="top"
          label-width="auto"
          class="avatar-uploader"
        >
          <el-upload
            action="#"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-change="handleSuccess"
            :auto-upload="false"
          >
            <el-avatar
              v-if="registerForm.avatarUrl"
              shape="square"
              fit="contain"
              :src="registerForm.avatarUrl"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-main>

    <el-footer class="register-footer">
      <div class="button-group">
        <el-button link @click="handleRegister">注册用户</el-button>
        <el-button link @click="router.push('/auth/login')">返回登录</el-button>
      </div>
    </el-footer>
  </el-container>
</template>
<style scoped>
.register-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 600;
  color: #606266;
  user-select: none;
}

.register-main {
  display: flex;
  padding: 12px 25px;
  overflow: hidden;
}

.register-main .button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-form-item {
  margin: 8px 0;
}

.el-avatar {
  --el-avatar-bg-color: transition;
}

:deep(.el-input__wrapper) {
  width: 200px;
  height: 40px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

:deep(.el-form-item__error) {
  padding-left: 11px;
}

:deep(.el-date-editor.el-input) {
  height: 42px;
  width: 222px;
}

.el-button {
  width: 222px;
  height: 42px;
  margin: 8px 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  outline: none;
}

.divider {
  height: 232px;
  border-left: 1px #181818 solid;
  margin: 0 45px;
}

.register-footer {
  height: 50px;
  padding: 0 25px;
}

.register-footer .button-group {
  display: flex;
  justify-content: space-between;
}

.register-footer .el-button:first-child {
  flex: 1;
  padding-right: 46px;
}

.register-footer .el-button:last-child {
  flex: 1;
  padding-left: 46px;
}

.avatar-uploader {
  height: 216px;
  width: 222px;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #606266;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  width: 222px;
  height: 184px;
}

:deep(.avatar-uploader .el-form-item__label) {
  width: 100%;
  text-align: center;
  padding: 0;
}

.avatar-uploader .el-avatar {
  width: 100%;
  height: 100%;
  border-radius: 6px !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

:deep(.el-form-item .el-input__validateIcon) {
  color: #67c23a;
}

:deep(.el-form-item.is-error .el-input__validateIcon) {
  color: #f56c6c;
}
@media (max-width: 800px) {
  .register-main {
    flex-direction: column;
    align-items: center;
  }
  .divider {
    display: none;
  }
  .register-footer .button-group {
    flex-direction: column;
  }
  .register-footer .el-button {
    padding: 2px !important;
  }
  .register-footer {
    height: 70px;
  }
}
</style>
