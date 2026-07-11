import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { useInventoryStore } from "./inventory";
import { generateDocumentNo } from "@/utils/numberGenerator";

export const useInboundStore = defineStore(
  "inbound",
  () => {
    const inventoryStore = useInventoryStore();

    const inbounds = ref([]);

    /* ==========================
       Dashboard
    ========================== */

    const totalInbounds = computed(() => inbounds.value.length);

    const completedInbounds = computed(
      () => inbounds.value.filter((item) => item.status === "완료").length,
    );

    /* ==========================
       등록
    ========================== */

    function addInbound(inbound) {
      const newInbound = {
        ...inbound,

        id: Date.now(),

        inboundNo: generateDocumentNo("IN", inbounds.value, "inboundNo"),

        status: "완료",
      };

      inbounds.value.push(newInbound);

      // 재고 증가
      inventoryStore.increaseStock(newInbound.productId, newInbound.quantity);
    }

    /* ==========================
       수정
    ========================== */

    function updateInbound(updatedInbound) {
      const index = inbounds.value.findIndex((item) => item.id === updatedInbound.id);

      if (index === -1) return;

      inbounds.value[index] = {
        ...updatedInbound,
      };
    }

    /* ==========================
       삭제
    ========================== */

    function removeInbound(id) {
      inbounds.value = inbounds.value.filter((item) => item.id !== id);
    }

    return {
      inbounds,

      totalInbounds,
      completedInbounds,

      addInbound,
      updateInbound,
      removeInbound,
    };
  },
  {
    persist: true,
  },
);
