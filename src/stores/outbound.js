import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { useInventoryStore } from "./inventory";
import { generateDocumentNo } from "@/utils/numberGenerator";

export const useOutboundStore = defineStore(
  "outbound",
  () => {
    const inventoryStore = useInventoryStore();

    const outbounds = ref([]);

    /* ==========================
       Dashboard
    ========================== */

    const totalOutbounds = computed(() => outbounds.value.length);

    const completedOutbounds = computed(
      () => outbounds.value.filter((item) => item.status === "완료").length,
    );

    /* ==========================
       등록
    ========================== */

    function addOutbound(outbound) {
      const success = inventoryStore.decreaseStock(outbound.productId, outbound.quantity);

      if (!success) {
        return {
          success: false,
          message: "재고가 부족합니다.",
        };
      }

      const newOutbound = {
        ...outbound,

        id: Date.now(),

        outboundNo: generateDocumentNo("OUT", outbounds.value, "outboundNo"),

        status: "완료",
      };

      outbounds.value.push(newOutbound);

      return {
        success: true,
      };
    }

    /* ==========================
       수정
    ========================== */

    function updateOutbound(updatedOutbound) {
      const index = outbounds.value.findIndex((item) => item.id === updatedOutbound.id);

      if (index === -1) return;

      outbounds.value[index] = {
        ...updatedOutbound,
      };
    }

    /* ==========================
       삭제
    ========================== */

    function removeOutbound(id) {
      outbounds.value = outbounds.value.filter((item) => item.id !== id);
    }

    return {
      outbounds,

      totalOutbounds,
      completedOutbounds,

      addOutbound,
      updateOutbound,
      removeOutbound,
    };
  },
  {
    persist: true,
  },
);
