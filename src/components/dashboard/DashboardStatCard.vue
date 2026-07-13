<template>
  <div class="stat-card">
    <div class="stat-card__icon">
      <slot name="icon" />
    </div>

    <div class="stat-card__content">
      <div class="stat-card__label">
        {{ label }}
      </div>

      <div class="stat-card__value">
        {{ value }}
      </div>

      <div v-if="description" class="stat-card__description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },

  value: {
    type: [String, Number],
    required: true,
  },

  description: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: 18px;

  padding: 24px;

  background: var(--bg-card);

  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-sm);

  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-card__icon {
  width: 56px;
  height: 56px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;

  background: rgba(37, 99, 235, 0.1);

  color: var(--color-primary);
}

.stat-card__content {
  flex: 1;
}

.stat-card__label {
  font-size: var(--font-sm);

  color: var(--text-secondary);
}

.stat-card__value {
  margin-top: 6px;

  font-size: 30px;
  font-weight: var(--font-bold);

  color: var(--text-primary);

  line-height: 1;
}

.stat-card__description {
  margin-top: 10px;

  font-size: 13px;

  color: var(--text-secondary);
}
</style>
