import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "@/api/axios";

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

    async function login(email, password) {
      try {
        const response = await api.post("/api/auth/login", {
          email,
          password,
        });

        const data = response.data;

        token.value = data.accessToken;
        user.value = data.user;

        console.log(user.value);

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        return {
          success: true,
          message: "로그인되었습니다.",
        };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "이메일 또는 비밀번호가 올바르지 않습니다.",
        };
      }
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
