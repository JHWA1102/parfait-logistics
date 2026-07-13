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

    /* ==========================
   최근 7일 출고 통계
========================== */

    const weeklyOutboundStats = computed(() => {
      const labels = [];
      const data = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(date.getDate() - i);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");

        const dateString = `${yyyy}-${mm}-${dd}`;

        labels.push(`${mm}/${dd}`);

        data.push(outbounds.value.filter((item) => item.date === dateString).length);
      }

      return {
        labels,
        data,
      };
    });

    return {
      outbounds,

      totalOutbounds,
      completedOutbounds,
      weeklyOutboundStats,

      addOutbound,
      updateOutbound,
      removeOutbound,
    };
  },
  {
    persist: true,
  },
);
