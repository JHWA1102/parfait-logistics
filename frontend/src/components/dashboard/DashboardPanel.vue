<template>
  <div class="dashboard-panel">
    <div v-if="title || $slots.header" class="dashboard-panel__header">
      <slot name="header">
        <h3>{{ title }}</h3>
      </slot>
    </div>

    <div class="dashboard-panel__body">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.dashboard-panel {
  background: var(--bg-card);

  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-sm);

  overflow: hidden;
}

.dashboard-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 18px 22px;

  border-bottom: 1px solid var(--border-color);

  background: #fafbfc;
}

.dashboard-panel__header h3 {
  margin: 0;

  font-size: 16px;
  font-weight: var(--font-semibold);

  color: var(--text-primary);
}

.dashboard-panel__body {
  padding: 20px;
}
</style>
