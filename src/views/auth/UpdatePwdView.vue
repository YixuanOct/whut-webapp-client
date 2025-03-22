<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const updatePwdForm = ref({
  name: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});
const updatePwdFormRef1 = ref(null);
const updatePwdFormRef2 = ref(null);
const rules = {
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 8, message: "密码长度不能小于 8 位", trigger: "blur" },
    {
      pattern: /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/,
      message: "仅允许字母、数字及特殊符号",
      trigger: "blur",
    },
  ],
  confirmNewPassword: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value === updatePwdForm.value.newPassword) {
          callback();
        } else {
          callback(new Error("两次输入的密码不一致"));
        }
      },
      trigger: "blur",
    },
  ],
};

async function handleUpdatePwd() {
  try {
    const [valid1, valid2] = await Promise.all([
      updatePwdFormRef1.value.validate(),
      updatePwdFormRef2.value.validate(),
    ]);
    if (valid1 && valid2) {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/user/updatePwd",
        updatePwdForm.value
      );

      if (response.data.code == 200) {
        ElMessage.success("修改密码成功");
        router.push("/auth/login");
      } else {
        ElMessage.error(response.data.message);
      }
    }
  } catch (error) {
    ElMessage.error("修改密码失败，请检查输入");
  }
}
</script>
<template>
  <el-container>
    <el-header class="update-pwd-header">修 改 密 码</el-header>

    <el-main class="update-pwd-main">
      <el-form
        :model="updatePwdForm"
        :rules="rules"
        status-icon
        ref="updatePwdFormRef1"
      >
        <el-form-item prop="name">
          <el-input v-model="updatePwdForm.name" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="oldPassword">
          <el-input v-model="updatePwdForm.oldPassword" placeholder="旧密码" />
        </el-form-item>
      </el-form>

      <el-divider direction="vertical" class="divider" />

      <el-form
        :model="updatePwdForm"
        :rules="rules"
        status-icon
        ref="updatePwdFormRef2"
      >
        <el-form-item prop="newPassword">
          <el-input v-model="updatePwdForm.newPassword" placeholder="新密码" />
        </el-form-item>
        <el-form-item prop="confirmNewPassword">
          <el-input
            v-model="updatePwdForm.confirmNewPassword"
            placeholder="确认新密码"
          />
        </el-form-item>
      </el-form>
    </el-main>

    <el-footer class="update-pwd-footer">
      <div class="button-group">
        <el-button link @click="handleUpdatePwd">修改密码</el-button>
        <el-button link @click="router.push('/auth/login')">返回登录</el-button>
      </div>
    </el-footer>
  </el-container>
</template>
<style scoped>
.update-pwd-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 600;
  color: #606266;
  user-select: none;
}

.update-pwd-main {
  display: flex;
  padding: 12px 25px;
}

.el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-form-item {
  margin: 8px 0;
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
  height: 116px;
  border-left: 1px #181818 solid;
  margin: 0 45px;
}

.update-pwd-footer {
  height: 50px;
  padding: 0 25px;
}

.update-pwd-footer .button-group {
  display: flex;
  justify-content: space-between;
}

.update-pwd-footer .el-button:first-child {
  flex: 1;
  padding-right: 46px;
}

.update-pwd-footer .el-button:last-child {
  flex: 1;
  padding-left: 46px;
}

:deep(.el-form-item .el-input__validateIcon) {
  color: #67c23a;
}

:deep(.el-form-item.is-error .el-input__validateIcon) {
  color: #f56c6c;
}

@media (max-width: 800px) {
  .update-pwd-main {
    flex-direction: column;
    align-items: center;
  }

  .divider {
    display: none;
  }

  .update-pwd-footer .button-group {
    flex-direction: column;
  }

  .update-pwd-footer .el-button {
    padding: 2px !important;
  }

  .update-pwd-footer {
    height: 70px;
  }
}
</style>
