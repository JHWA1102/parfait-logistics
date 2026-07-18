<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      {
        'base-button--block': block,
      },
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },

  variant: {
    type: String,
    default: "primary",
  },

  size: {
    type: String,
    default: "md",
  },

  block: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: var(--space-2);

  border: none;

  border-radius: var(--radius-md);

  cursor: pointer;

  font-weight: var(--font-semibold);
  font-size: var(--font-sm);

  transition: var(--transition);

  white-space: nowrap;
}

/* ===== Size ===== */

.base-button--sm {
  min-width: 60px;
  height: 32px;
  padding: 0 14px;
}

.base-button--md {
  min-width: 80px;
  height: 40px;
  padding: 0 18px;
}

.base-button--lg {
  min-width: 100px;
  height: 46px;
  padding: 0 22px;
}

/* ===== Variant ===== */

.base-button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.base-button--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.base-button--secondary {
  background: var(--color-gray-100);
  color: var(--text-primary);
}

.base-button--secondary:hover:not(:disabled) {
  background: var(--color-gray-200);
}

.base-button--success {
  background: var(--color-success);
  color: var(--color-white);
}

.base-button--danger {
  background: var(--color-danger);
  color: var(--color-white);
}

.base-button--success:hover:not(:disabled) {
  filter: brightness(0.95);
}

.base-button--danger:hover:not(:disabled) {
  filter: brightness(0.95);
}

/* ===== Block ===== */

.base-button--block {
  width: 100%;
}

/* ===== Disabled ===== */

.base-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
