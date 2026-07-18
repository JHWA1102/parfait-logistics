<template>
  <div class="page-search">
    <div class="page-search__input-wrapper">
      <Search :size="18" class="page-search__icon" />

      <input
        :value="modelValue"
        :placeholder="placeholder"
        class="page-search__input"
        @input="onInput"
      />

      <button v-if="modelValue" class="page-search__clear" @click="clear">
        <X :size="16" />
      </button>
    </div>

    <div v-if="$slots.actions" class="page-search__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { Search, X } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },

  placeholder: {
    type: String,
    default: "검색...",
  },
});

const emit = defineEmits(["update:modelValue"]);

function onInput(event) {
  emit("update:modelValue", event.target.value);
}

function clear() {
  emit("update:modelValue", "");
}
</script>

<style scoped>
.page-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.page-search__input-wrapper {
  position: relative;
  width: 360px;
}

.page-search__icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

.page-search__input {
  width: 100%;
  height: 46px;

  border-radius: 14px;

  border: 1px solid #dbe2ea;

  background: white;

  transition: 0.2s;

  padding-left: 42px;
  padding-top: 1px;
}

.page-search__input:focus {
  border-color: #4f46e5;

  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
}

.page-search__input:hover {
  border-color: #94a3b8;
}

.page-search__clear {
  position: absolute;
  right: 12px;
  top: 50%;

  transform: translateY(-50%);

  border: none;
  background: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  color: #94a3b8;
}

.page-search__clear:hover {
  color: #475569;
}

.page-search__actions {
  display: flex;
  gap: 12px;
}
</style>
