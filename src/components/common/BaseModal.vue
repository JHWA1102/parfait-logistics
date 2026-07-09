<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @pointerdown="onPointerDown"
        @click="onOverlayClick"
      >
        <div class="modal" @click.stop>
          <div class="modal__header">
            <h2>{{ title }}</h2>

            <button class="modal__close" @click="close">
              <X :size="20" />
            </button>
          </div>

          <div class="modal__body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch, onBeforeUnmount } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  modelValue: Boolean,
  title: String,
});

const emit = defineEmits(["update:modelValue"]);

let startedOnOverlay = false;

function close() {
  emit("update:modelValue", false);
}

function onPointerDown(event) {
  startedOnOverlay = event.target === event.currentTarget;
}

function onOverlayClick(event) {
  if (!startedOnOverlay) return;
  if (event.target !== event.currentTarget) return;

  close();
}

function onKeydown(event) {
  if (event.key === "Escape") {
    close();
  }
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeydown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeydown);
    }
  },
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;

  background: rgba(15, 23, 42, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;

  padding: 20px;
}

.modal {
  width: 600px;
  max-width: 90vw;

  max-height: 90vh;

  display: flex;
  flex-direction: column;

  background: white;
  border-radius: 16px;

  overflow: hidden;
}

.modal__header {
  height: 64px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 24px;

  border-bottom: 1px solid #e5e7eb;
}

.modal__header h2 {
  font-size: 20px;
}

.modal__close {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
}

.modal__body {
  flex: 1;

  padding: 24px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;

  gap: 18px;
}

.modal__footer {
  flex-shrink: 0;

  padding: 20px 24px;

  border-top: 1px solid #e5e7eb;

  background: white;

  display: flex;
  justify-content: flex-end;

  gap: 12px;
}

/* Transition */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateY(12px) scale(0.98);
}

/* Chrome, Edge, Safari */

.modal__body::-webkit-scrollbar {
  width: 8px;
}

.modal__body::-webkit-scrollbar-track {
  background: transparent;
}

.modal__body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.modal__body::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
  border: 2px solid transparent;
  background-clip: content-box;
}

/* Firefox */

.modal__body {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
</style>
