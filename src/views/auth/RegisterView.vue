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

function handleChange(uploadFile) {
  if (uploadFile.raw) {
    registerForm.value.avatarUrl = URL.createObjectURL(uploadFile.raw);
  } else {
    console.log(1);
  }
}
function beforeUpload(rawFile) {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
}
</script>
<template>
  <el-container class="login-container">
    <el-header class="login-header">注 册 新 用 户</el-header>

    <el-main class="login-main">
      <el-form :model="registerForm">
        <el-form-item>
          <el-input v-model="registerForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.password" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="registerForm.date" placeholder="日期" />
        </el-form-item>
      </el-form>

      <el-divider direction="vertical" class="divider" />

      <el-form :model="registerForm">
        <p>请上传头像</p>
        <el-upload
          action=""
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          class="avatar-uploader"
          :auto-upload="false"
        >
          <el-avatar
            v-if="registerForm.avatarUrl"
            shape="square"
            fit="contain"
            :src="registerForm.avatarUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form>
    </el-main>

    <el-footer class="login-footer">
      <div class="button-group">
        <el-button link>注册用户</el-button>
        <el-button link @click="router.push('/auth/login')">返回登录</el-button>
      </div>
    </el-footer>
  </el-container>
</template>
<style scoped>
.login-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 600;
  color: #606266;
  user-select: none;
}

.login-main {
  display: flex;
  padding: 12px 25px;
}

.login-main .button-group {
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
  margin-bottom: 0;
}

:deep(.el-input__wrapper) {
  width: 200px;
  height: 40px;
  margin: 4px 0;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.el-button {
  width: 222px;
  height: 42px;
  margin: 4px 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  outline: none;
}

.divider {
  height: 200px;
  border-left: 1px #181818 solid;
  margin: 0 45px;
}

.login-footer {
  height: 50px;
  padding: 0 25px;
}

.login-footer .button-group {
  display: flex;
  justify-content: space-between;
}

.login-footer .el-button:first-child {
  flex: 1;
  padding-right: 46px;
}

.login-footer .el-button:last-child {
  flex: 1;
  padding-left: 46px;
}

.avatar-uploader .avatar {
  width: 222px;
  height: 180px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #606266;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 222px;
  height: 180px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.el-form p {
  margin: 0;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
</style>
