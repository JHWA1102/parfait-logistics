<template>
  <div class="base-select">
    <label v-if="label" class="base-select__label">
      {{ label }}

      <span v-if="required" class="base-select__required"> * </span>
    </label>

    <select
      :value="modelValue"
      :disabled="disabled"
      class="base-select__field"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="">
        {{ placeholder }}
      </option>

      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <p v-if="hint" class="base-select__hint">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },

  label: {
    type: String,
    default: "",
  },

  placeholder: {
    type: String,
    default: "선택하세요",
  },

  options: {
    type: Array,
    default: () => [],
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
.base-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.base-select__label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.base-select__required {
  color: #ef4444;
}

.base-select__field {
  width: 100%;
  height: 44px;

  padding: 0 14px;

  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);

  background: #fff;

  font-size: 14px;
  color: var(--text-primary);

  transition: 0.2s;

  cursor: pointer;
}

.base-select__field:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.base-select__field:disabled {
  background: #f8fafc;
  cursor: not-allowed;
}

.base-select__hint {
  font-size: 12px;
  color: #64748b;
}
</style>
