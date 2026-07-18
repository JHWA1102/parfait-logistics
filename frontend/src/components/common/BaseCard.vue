<template>
  <div class="base-card">
    <div class="base-card__top">
      <div class="base-card__icon">
        {{ icon }}
      </div>

      <span
        v-if="trend"
        class="base-card__trend"
      >
        {{ trend }}
      </span>
    </div>

    <div class="base-card__body">
      <h4>{{ title }}</h4>

      <h2>{{ value }}</h2>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  value: {
    type: [String, Number],
    required: true,
  },

  icon: {
    type: String,
    default: '📦',
  },

  trend: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.base-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  transition: all .2s;
}

.base-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.base-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base-card__icon {
  width: 48px;
  height: 48px;

  border-radius: 12px;

  background: #eff6ff;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
}

.base-card__trend {
  color: #16a34a;
  font-size: 14px;
  font-weight: 600;
}

.base-card__body {
  margin-top: 24px;
}

.base-card__body h4 {
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
}

.base-card__body h2 {
  margin-top: 8px;
  font-size: 32px;
  font-weight: 700;
  color: #111827;
}
</style>