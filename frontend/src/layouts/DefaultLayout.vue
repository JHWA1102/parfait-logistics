<template>
  <div class="layout">
    <Sidebar />

    <div class="layout__main">
      <Header />

      <main class="layout__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";

import Header from "@/layouts/Header.vue";
import Sidebar from "@/layouts/Sidebar.vue";
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
}

.layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout__content {
  flex: 1;
  overflow-y: auto;
}
</style>
