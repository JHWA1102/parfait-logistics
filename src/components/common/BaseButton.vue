<template>
  <button :type="type" :class="['base-button', `base-button--${variant}`, `base-button--${size}`]">
    <slot />
  </button>
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

  gap: 6px;

  cursor: pointer;

  border: none;

  border-radius: 10px;

  transition: 0.2s;

  font-weight: 600;
}

/* 크기 */

.base-button--sm {
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
}

.base-button--md {
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
}

.base-button--lg {
  height: 46px;
  padding: 0 20px;
  font-size: 15px;
}

/* 색상 */

.base-button--primary {
  background: #2563eb;
  color: white;
}

.base-button--primary:hover {
  background: #1d4ed8;
}

.base-button--secondary {
  background: #f1f5f9;
  color: #334155;
}

.base-button--secondary:hover {
  background: #e2e8f0;
}

.base-button--success {
  background: #16a34a;
  color: white;
}

.base-button--success:hover {
  background: #15803d;
}

.base-button--danger {
  background: #dc2626;
  color: white;
}

.base-button--danger:hover {
  background: #b91c1c;
}

.base-button--block {
  width: 100%;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
