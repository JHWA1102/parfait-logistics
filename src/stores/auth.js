import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    /* ==========================
       State
    ========================== */

    const user = ref(null);

    const token = ref("");

    /* ==========================
       Getter
    ========================== */

    const isAuthenticated = computed(() => !!user.value);

    const role = computed(() => user.value?.role ?? "");

    const userName = computed(() => user.value?.name ?? "");

    /* ==========================
       Mock Users
    ========================== */

    const users = [
      {
        id: 1,
        username: "admin",
        password: "1234",
        name: "관리자",
        role: "ADMIN",
      },

      {
        id: 2,
        username: "purchase",
        password: "1234",
        name: "구매담당",
        role: "PURCHASE",
      },

      {
        id: 3,
        username: "sales",
        password: "1234",
        name: "영업담당",
        role: "SALES",
      },

      {
        id: 4,
        username: "warehouse",
        password: "1234",
        name: "물류담당",
        role: "WAREHOUSE",
      },
    ];

    /* ==========================
       Login
    ========================== */

    function login(username, password) {
      const foundUser = users.find(
        (item) => item.username === username && item.password === password,
      );

      if (!foundUser) {
        return {
          success: false,
          message: "아이디 또는 비밀번호가 올바르지 않습니다.",
        };
      }

      user.value = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role,
      };

      // Spring Boot 연결 시 JWT 저장
      token.value = "mock-token";

      return {
        success: true,
        message: "로그인되었습니다.",
      };
    }

    /* ==========================
       Logout
    ========================== */

    function logout() {
      user.value = null;
      token.value = "";
    }

    /* ==========================
       Permission
    ========================== */

    function hasRole(...roles) {
      if (!user.value) return false;

      return roles.includes(user.value.role);
    }

    return {
      user,
      token,

      isAuthenticated,
      role,
      userName,

      login,
      logout,
      hasRole,
    };
  },
  {
    persist: true,
  },
);
