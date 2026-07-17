<template>
  <header class="header">
    <div class="header__left"></div>

    <div class="header__right">
      <!-- Notification -->
      <div class="header__notification">
        <button class="header__icon-btn" @click.stop="toggleNotification">
          <Bell :size="20" />

          <span v-if="notificationStore.unreadCount" class="header__badge">
            {{ notificationStore.unreadCount }}
          </span>
        </button>

        <Transition name="dropdown">
          <div v-if="notificationOpen" class="notification" @click.stop>
            <div class="notification__title">알림</div>

            <div
              v-for="item in notificationStore.notifications"
              :key="item.title"
              class="notification__item"
            >
              <strong>{{ item.title }}</strong>

              <p>{{ item.message }}</p>
            </div>

            <div v-if="!notificationStore.notifications.length" class="notification__empty">
              새로운 알림이 없습니다.
            </div>
          </div>
        </Transition>
      </div>

      <!-- User -->
      <div class="header__user-wrapper">
        <button class="header__user" @click.stop="toggleMenu">
          <div class="header__avatar">
            {{ userInitial }}
          </div>

          <div class="header__info">
            <div class="header__name">
              {{ authStore.userName }}
            </div>

            <div class="header__role">
              {{ roleName }}
            </div>
          </div>

          <ChevronDown :size="18" />
        </button>

        <Transition name="dropdown">
          <div v-if="menuOpen" class="header__dropdown" @click.stop>
            <div class="header__dropdown-user">
              <div class="header__dropdown-name">
                {{ authStore.userName }}
              </div>

              <div class="header__dropdown-role">
                {{ roleName }}
              </div>
            </div>

            <div class="header__divider"></div>

            <button class="header__menu-item">👤 내 정보</button>

            <button class="header__menu-item">🔒 비밀번호 변경</button>

            <div class="header__divider"></div>

            <button class="header__menu-item logout" @click="logout">🚪 로그아웃</button>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Bell, ChevronDown } from "lucide-vue-next";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification";

const router = useRouter();
const authStore = useAuthStore();

const menuOpen = ref(false);
const notificationOpen = ref(false);

const notificationStore = useNotificationStore();

function toggleNotification() {
  notificationOpen.value = !notificationOpen.value;
  menuOpen.value = false;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
  notificationOpen.value = false;
}

const roleName = computed(() => {
  const map = {
    ADMIN: "관리자",
    PURCHASE: "구매담당",
    SALES: "영업담당",
    WAREHOUSE: "물류담당",
  };

  return map[authStore.role] ?? authStore.role;
});

const userInitial = computed(() =>
  authStore.userName ? authStore.userName.charAt(0).toUpperCase() : "?",
);

function logout() {
  authStore.logout();
  router.push("/login");
}

function closeMenu(event) {
  if (!event.target.closest(".header__user-wrapper")) {
    menuOpen.value = false;
  }

  if (!event.target.closest(".header__notification")) {
    notificationOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener("click", closeMenu);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", closeMenu);
});
</script>

<style scoped>
.header {
  height: 72px;
  padding: 0 28px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.header__left {
  flex: 1;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 18px;
}

.header__icon-btn {
  position: relative;

  width: 42px;
  height: 42px;

  border: none;
  border-radius: 12px;

  background: #f8fafc;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: 0.2s;
}

.header__icon-btn:hover {
  background: #eef2ff;
}

.header__user-wrapper {
  position: relative;
}

.header__user {
  display: flex;
  align-items: center;
  gap: 12px;

  border: none;
  background: white;

  padding: 8px 12px;

  border-radius: 12px;

  cursor: pointer;

  transition: 0.2s;
}

.header__user:hover {
  background: #f8fafc;
}

.header__avatar {
  width: 42px;
  height: 42px;

  border-radius: 50%;

  background: var(--color-primary);

  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
}

.header__info {
  text-align: left;
}

.header__name {
  font-size: 14px;
  font-weight: 600;
}

.header__role {
  font-size: 12px;
  color: #64748b;
}

.header__arrow {
  color: #94a3b8;
}

.header__dropdown {
  position: absolute;

  top: 58px;
  right: 0;

  width: 240px;

  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  overflow: hidden;

  z-index: 100;
}

.header__dropdown-user {
  padding: 18px;
}

.header__dropdown-name {
  font-weight: 700;
}

.header__dropdown-role {
  color: #64748b;
  font-size: 13px;
  margin-top: 4px;
}

.header__divider {
  height: 1px;
  background: #f1f5f9;
}

.header__menu-item {
  width: 100%;

  padding: 14px 18px;

  border: none;
  background: white;

  text-align: left;

  cursor: pointer;

  transition: 0.2s;
}

.header__menu-item:hover {
  background: #f8fafc;
}

.logout {
  color: #dc2626;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.header__badge {
  position: absolute;

  top: -4px;
  right: -4px;

  min-width: 18px;
  height: 18px;

  padding: 0 4px;

  border-radius: 999px;

  background: #ef4444;

  color: white;

  font-size: 11px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
}

.header__notification {
  position: relative;
}

.notification {
  position: absolute;

  top: 54px;
  right: 0;

  width: 340px;

  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);

  overflow: hidden;

  z-index: 1000;
}

.notification__title {
  padding: 16px;

  font-weight: 700;

  border-bottom: 1px solid #eee;
}

.notification__item {
  padding: 16px;

  border-bottom: 1px solid #f3f4f6;
}

.notification__item strong {
  display: block;

  margin-bottom: 6px;
}

.notification__item p {
  color: #64748b;

  font-size: 14px;
}

.notification__empty {
  padding: 30px;

  text-align: center;

  color: #94a3b8;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.18s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
