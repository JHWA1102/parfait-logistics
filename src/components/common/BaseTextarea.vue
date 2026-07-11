<template>
  <div class="base-textarea">
    <label v-if="label" class="base-textarea__label">
      {{ label }}

      <span v-if="required" class="base-textarea__required"> * </span>
    </label>

    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      class="base-textarea__field"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p v-if="hint" class="base-textarea__hint">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },

  label: {
    type: String,
    default: "",
  },

  placeholder: {
    type: String,
    default: "",
  },

  rows: {
    type: Number,
    default: 4,
  },

  hint: {
    type: String,
    default: "",
  },

  required: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.base-textarea {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.base-textarea__label {
  font-size: var(--font-sm);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.base-textarea__required {
  color: var(--color-danger);
}

.base-textarea__field {
  width: 100%;
  min-height: 100px;

  padding: 12px 14px;

  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);

  background: var(--color-white);

  font-size: var(--font-sm);
  color: var(--text-primary);

  resize: vertical;

  transition: var(--transition);
}

.base-textarea__field::placeholder {
  color: var(--text-placeholder);
}

.base-textarea__field:focus {
  outline: none;

  border-color: var(--color-primary);

  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.base-textarea__field:disabled {
  background: var(--color-gray-100);
  cursor: not-allowed;
}

.base-textarea__hint {
  font-size: var(--font-xs);
  color: var(--text-secondary);
}
</style>
