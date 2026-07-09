<template>
  <div class="base-input">
    <label
      v-if="label"
      class="base-input__label"
    >
      {{ label }}
      <span
        v-if="required"
        class="base-input__required"
      >
        *
      </span>
    </label>

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="base-input__field"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p
      v-if="hint"
      class="base-input__hint"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  placeholder: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  hint: {
    type: String,
    default: '',
  },

  required: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.base-input__label {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}

.base-input__required {
  color: #ef4444;
}

.base-input__field {
  width: 100%;
  height: 44px;

  padding: 0 14px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  font-size: 14px;

  transition: .2s;
}

.base-input__field:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, .15);
}

.base-input__field:disabled {
  background: #f8fafc;
  cursor: not-allowed;
}

.base-input__hint {
  font-size: 12px;
  color: #64748b;
}
</style>