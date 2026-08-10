<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";

import api from "@/api/axios";

const router = useRouter();

const email = ref("");
const name = ref("");
const password = ref("");
const passwordConfirm = ref("");

const roles = ref([]);
const role = ref("");

const errorMessage = ref("");
const successMessage = ref("");

onMounted(() => {
  loadRoles();
});

async function handleSignup() {
  errorMessage.value = "";
  successMessage.value = "";

  if (
    !email.value ||
    !name.value ||
    !password.value ||
    !passwordConfirm.value
  ) {
    errorMessage.value = "모든 항목을 입력해주세요.";
    return;
  }

  if (password.value !== passwordConfirm.value) {
    errorMessage.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  if (password.value.length < 4) {
    errorMessage.value = "비밀번호는 4자 이상 입력해주세요.";
    return;
  }

try {
    await api.post("/api/users/signup", {
      email: email.value,
      password: password.value,
      name: name.value,
    });

    successMessage.value = "회원가입이 완료되었습니다.";

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      "회원가입 중 오류가 발생했습니다.";
  }
}

function goToLogin() {
  router.push("/login");
}

async function loadRoles() {
  try {
    const response = await api.get("/api/roles");

    roles.value = response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));

    if (roles.value.length > 0) {
      role.value = roles.value[0].value;
    }
  } catch (error) {
    console.error("권한 목록 조회 실패:", error);
  }
}
</script>

<template>
  <div class="signup-page">
    <div class="signup-card">
      <div class="signup-header">
        <h1>Parfait Logistics</h1>
        <p>회원가입</p>
      </div>

      <!-- 가입 안내 -->
      <div class="invite-notice">
        <span class="notice-icon">ⓘ</span>

        <div>
          <strong>초대된 사용자만 가입할 수 있습니다.</strong>

          <p>
            등록된 이메일 주소로만 회원가입이 가능합니다.
          </p>
        </div>
      </div>

      <!-- 회원가입 -->
      <form class="signup-form" @submit.prevent="handleSignup">
        <BaseInput
          v-model="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
        />

        <BaseInput
          v-model="name"
          label="이름"
          placeholder="이름을 입력하세요"
        />

        <BaseInput
          v-model="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />

        <BaseInput
          v-model="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
        />

        <!-- 회원가입은 현재 인가된 사람만 허용, 권한은 인가된 사람 데이터에 따라감
        <BaseSelect
          v-model="role"
          label="권한"
          :options="roles"
        /> -->

        <p v-if="errorMessage" class="message error">
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="message success">
          {{ successMessage }}
        </p>

        <BaseButton type="submit" color="primary" block>
          회원가입
        </BaseButton>
      </form>

      <!-- 로그인 이동 -->
      <div class="login-link">
        <span>이미 계정이 있으신가요?</span>

        <button type="button" @click="goToLogin">
          로그인
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-page {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px 20px;

  background: #f7f8fa;
}

.signup-card {
  width: 100%;
  max-width: 440px;

  padding: 40px;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 16px;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}

/* 제목 */

.signup-header {
  margin-bottom: 28px;

  text-align: center;
}

.signup-header h1 {
  margin: 0;

  font-size: 24px;
  font-weight: 700;

  color: #111827;
}

.signup-header p {
  margin: 8px 0 0;

  font-size: 15px;

  color: #6b7280;
}

/* 가입 안내 */

.invite-notice {
  display: flex;

  gap: 10px;

  padding: 14px;

  margin-bottom: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 10px;

  background: #f9fafb;
}

.notice-icon {
  flex-shrink: 0;

  font-size: 16px;

  color: #6b7280;
}

.invite-notice strong {
  display: block;

  margin-bottom: 4px;

  font-size: 13px;
  font-weight: 600;

  color: #374151;
}

.invite-notice p {
  margin: 0;

  font-size: 12px;
  line-height: 1.5;

  color: #6b7280;
}

/* 회원가입 폼 */

.signup-form {
  display: flex;

  flex-direction: column;

  gap: 18px;
}

/* 메시지 */

.message {
  margin: -4px 0 0;

  font-size: 13px;
}

.message.error {
  color: #dc2626;
}

.message.success {
  color: #16a34a;
}

/* 로그인 이동 */

.login-link {
  display: flex;

  justify-content: center;

  gap: 5px;

  margin-top: 24px;

  font-size: 13px;

  color: #6b7280;
}

.login-link button {
  padding: 0;

  border: none;

  background: none;

  color: #111827;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;
}

.login-link button:hover {
  text-decoration: underline;
}

/* 모바일 */

@media (max-width: 480px) {
  .signup-page {
    padding: 20px 16px;
  }

  .signup-card {
    padding: 28px 22px;
  }
}
</style>