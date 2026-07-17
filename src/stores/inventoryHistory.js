import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useInventoryHistoryStore = defineStore(
  "inventoryHistory",
  () => {
    const histories = ref([]);

    /* ==========================
       Dashboard
    ========================== */

    const totalHistories = computed(() => histories.value.length);

    const inboundHistories = computed(
      () => histories.value.filter((item) => item.type === "입고").length,
    );

    const outboundHistories = computed(
      () => histories.value.filter((item) => item.type === "출고").length,
    );

    /* ==========================
       등록
    ========================== */

    function addHistory(history) {
      histories.value.unshift({
        id: Date.now(),

        type: "",

        documentNo: "",

        productId: null,

        warehouseId: null,

        quantity: 0,

        beforeStock: 0,

        afterStock: 0,

        date: new Date().toISOString().slice(0, 10),

        ...history,
      });
    }

    /* ==========================
       삭제
    ========================== */

    function removeHistory(id) {
      histories.value = histories.value.filter((item) => item.id !== id);
    }

    /* ==========================
       전체 삭제
    ========================== */

    function clearHistory() {
      histories.value = [];
    }

    return {
      histories,

      totalHistories,
      inboundHistories,
      outboundHistories,

      addHistory,
      removeHistory,
      clearHistory,
    };
  },
  {
    persist: true,
  },
);
