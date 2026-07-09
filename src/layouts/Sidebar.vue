<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar__logo">
      <div class="sidebar__logo-icon">
        <Package :size="24" />
      </div>

      <div>
        <h2>PARFAIT</h2>
        <h2>LOGISTICS</h2>
        <p>Warehouse & Logistics Management System</p>
      </div>
    </div>

    <!-- Menu -->
    <nav class="sidebar__menu">
      <div v-for="group in menus" :key="group.title" class="sidebar__group">
        <div class="sidebar__group-title">
          {{ group.title }}
        </div>

        <RouterLink
          v-for="menu in group.items"
          :key="menu.path"
          :to="menu.path"
          class="sidebar__item"
          :class="{ active: isActive(menu.path) }"
        >
          <component :is="menu.icon" :size="18" class="sidebar__icon" />

          <span>
            {{ menu.name }}
          </span>
        </RouterLink>
      </div>
    </nav>

    <!-- User -->
    <div class="sidebar__footer">
      <div class="sidebar__avatar">A</div>

      <div>
        <div class="sidebar__user">Administrator</div>

        <div class="sidebar__role">Admin</div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import { Package } from "lucide-vue-next";

import { menus } from "@/constants/menu";

const route = useRoute();

function isActive(path) {
  if (path === "/") {
    return route.path === "/";
  }

  return route.path.startsWith(path);
}
</script>

<style scoped>
.sidebar {
  width: 270px;
  height: 100vh;

  background: #fff;

  border-right: 1px solid #e5e7eb;

  display: flex;
  flex-direction: column;
}

/* Logo */

.sidebar__logo {
  display: flex;
  align-items: center;

  gap: 14px;

  padding: 24px;

  border-bottom: 1px solid #f1f5f9;
}

.sidebar__logo-icon {
  width: 52px;
  height: 52px;

  border-radius: 14px;

  background: #2563eb;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar__logo h2 {
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
}

.sidebar__logo p {
  margin-top: 6px;

  color: #94a3b8;

  font-size: 12px;

  line-height: 1.4;
}

/* Menu */

.sidebar__menu {
  flex: 1;

  overflow-y: auto;

  padding: 18px 14px;

  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.sidebar__group + .sidebar__group {
  margin-top: 22px;
}

.sidebar__group-title {
  padding: 0 14px 8px;

  font-size: 11px;

  font-weight: 700;

  color: #94a3b8;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}

.sidebar__item {
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 11px 14px;

  border-radius: 12px;

  color: #475569;

  text-decoration: none;

  transition: 0.18s;
}

.sidebar__item:hover {
  background: #eef2ff;
  color: #2563eb;
}

.active {
  background: #2563eb;
  color: white;
  font-weight: 600;
}

.active .sidebar__icon {
  color: white;
}

.sidebar__icon {
  flex-shrink: 0;
}

/* Footer */

.sidebar__footer {
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 18px;

  border-top: 1px solid #f1f5f9;
}

.sidebar__avatar {
  width: 44px;
  height: 44px;

  border-radius: 50%;

  background: #2563eb;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
}

.sidebar__user {
  font-weight: 600;
}

.sidebar__role {
  color: #94a3b8;
  font-size: 13px;
}

/* Chrome, Edge, Safari */

.sidebar__menu::-webkit-scrollbar {
  width: 8px;
}

.sidebar__menu::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar__menu::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: content-box;

  transition: background 0.2s ease;
}

.sidebar__menu::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
  border: 2px solid transparent;
  background-clip: content-box;
}
</style>
