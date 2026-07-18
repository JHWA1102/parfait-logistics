<template>
  <div class="base-input">
    <label v-if="label" class="form-label">
      {{ label }}
      <span v-if="required" class="form-required"> * </span>
    </label>

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="form-control"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p v-if="hint" class="form-hint">
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
    default: "",
  },

  type: {
    type: String,
    default: "text",
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
.base-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
