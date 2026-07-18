<template>
  <span :class="['base-badge', `base-badge--${variant}`, `base-badge--${size}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
  },

  size: {
    type: String,
    default: "md",
  },
});
</script>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--radius-full);

  font-weight: var(--font-semibold);
  white-space: nowrap;

  transition: var(--transition);
}

/* ===========================
   Size
=========================== */

.base-badge--sm {
  height: 22px;
  padding: 0 var(--space-2);

  font-size: 11px;
}

.base-badge--md {
  height: 28px;
  padding: 0 var(--space-3);

  font-size: var(--font-xs);
}

/* ===========================
   Variant
=========================== */

.base-badge--primary {
  background: rgba(37, 99, 235, 0.12);
  color: var(--color-primary);
}

.base-badge--secondary {
  background: var(--color-gray-100);
  color: var(--text-primary);
}

.base-badge--success {
  background: rgba(22, 163, 74, 0.12);
  color: var(--color-success);
}

.base-badge--warning {
  background: rgba(217, 119, 6, 0.12);
  color: var(--color-warning);
}

.base-badge--danger {
  background: rgba(220, 38, 38, 0.12);
  color: var(--color-danger);
}
</style>
