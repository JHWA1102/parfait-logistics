import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { useInventoryStore } from "./inventory";
import { useInventoryHistoryStore } from "./inventoryHistory";
import { useInventoryStockStore } from "./inventoryStock";
import { generateDocumentNo } from "@/utils/numberGenerator";

export const useInboundStore = defineStore(
  "inbound",
  () => {
    const inventoryStore = useInventoryStore();
    const historyStore = useInventoryHistoryStore();
    const inventoryStockStore = useInventoryStockStore();
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
      const stockResult = inventoryStockStore.increaseStock(
        newInbound.warehouseId,
        newInbound.productId,
        newInbound.quantity,
      );

      // 재고 이력 저장
      if (stockResult) {
        historyStore.addHistory({
          type: "입고",

          documentNo: newInbound.inboundNo,

          productId: newInbound.productId,

          warehouseId: newInbound.warehouseId,

          quantity: Number(newInbound.quantity),

          beforeStock: stockResult.beforeStock,

          afterStock: stockResult.afterStock,

          date: newInbound.date,
        });
      }
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

    /* ==========================
   최근 7일 입고 통계
========================== */

    const weeklyInboundStats = computed(() => {
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

        data.push(inbounds.value.filter((item) => item.date === dateString).length);
      }

      return {
        labels,
        data,
      };
    });

    return {
      inbounds,

      totalInbounds,
      completedInbounds,
      weeklyInboundStats,

      addInbound,
      updateInbound,
      removeInbound,
    };
  },
  {
    persist: true,
  },
);
