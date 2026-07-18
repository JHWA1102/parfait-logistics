<template>
  <div class="login">
    <div class="login-card">
      <div class="login-header">
        <h1>WMS / ERP</h1>
        <p>Warehouse Management System</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <BaseInput v-model="username" label="아이디" placeholder="아이디를 입력하세요" />

        <BaseInput
          v-model="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />

        <BaseButton type="submit" color="primary" block> 로그인 </BaseButton>
      </form>

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>

      <div class="demo-account">
        <h3>테스트 계정</h3>

        <table>
          <tbody>
            <tr>
              <td>관리자</td>
              <td>admin</td>
              <td>1234</td>
            </tr>

            <tr>
              <td>구매담당</td>
              <td>purchase</td>
              <td>1234</td>
            </tr>

            <tr>
              <td>영업담당</td>
              <td>sales</td>
              <td>1234</td>
            </tr>

            <tr>
              <td>물류담당</td>
              <td>warehouse</td>
              <td>1234</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseButton from "@/components/common/BaseButton.vue";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

function handleLogin() {
  errorMessage.value = "";

  const result = authStore.login(username.value, password.value);

  if (!result.success) {
    errorMessage.value = result.message;
    return;
  }

  router.push("/");
}
</script>

<style scoped>
.login {
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #f5f7fb;
}

.login-card {
  width: 420px;

  background: white;

  border-radius: 16px;

  padding: 40px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.login-header {
  text-align: center;

  margin-bottom: 32px;
}

.login-header h1 {
  font-size: 32px;

  margin-bottom: 8px;
}

.login-header p {
  color: #888;
}

.login-form {
  display: flex;
  flex-direction: column;

  gap: 20px;
}

.error {
  margin-top: 20px;

  text-align: center;

  color: #ef4444;

  font-size: 14px;
}

.demo-account {
  margin-top: 36px;

  padding-top: 24px;

  border-top: 1px solid #eee;
}

.demo-account h3 {
  margin-bottom: 12px;

  font-size: 16px;
}

.demo-account table {
  width: 100%;

  border-collapse: collapse;

  font-size: 14px;
}

.demo-account td {
  padding: 8px 0;

  border-bottom: 1px solid #f0f0f0;
}
</style>
