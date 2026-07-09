<template>
  <div class="page-header">
    <div class="page-header__content">
      <h1 class="page-header__title">
        {{ title }}
      </h1>

      <p v-if="description" class="page-header__description">
        {{ description }}
      </p>
    </div>

    <div v-if="$slots.actions || buttonText" class="page-header__actions">
      <slot name="actions">
        <BaseButton @click="emit('create')">
          {{ buttonText }}
        </BaseButton>
      </slot>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/common/BaseButton.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  buttonText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["create"]);
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.page-header__content {
  display: flex;
  flex-direction: column;
}

.page-header__title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
}

.page-header__description {
  margin-top: 6px;
  color: #64748b;
  font-size: 14px;
}

.page-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
