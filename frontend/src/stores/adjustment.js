import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { useInventoryStore } from "./inventory";
import { useInventoryHistoryStore } from "./inventoryHistory";

import { generateDocumentNo } from "@/utils/numberGenerator";

export const useAdjustmentStore = defineStore(
  "adjustment",
  () => {
    const inventoryStore = useInventoryStore();
    const historyStore = useInventoryHistoryStore();

    const adjustments = ref([]);

    /* ==========================
       Dashboard
    ========================== */

    const totalAdjustments = computed(() => adjustments.value.length);

    /* ==========================
       등록
    ========================== */

    function addAdjustment(adjustment) {
      const product = inventoryStore.findProduct(adjustment.productId);

      if (!product) {
        return {
          success: false,
          message: "품목을 찾을 수 없습니다.",
        };
      }

      const beforeStock = product.stock;
      const afterStock = Number(adjustment.afterStock);

      product.stock = afterStock;

      inventoryStore.updateStockStatus(product);

      const newAdjustment = {
        id: Date.now(),

        adjustmentNo: generateDocumentNo("ADJ", adjustments.value, "adjustmentNo"),

        date: adjustment.date,

        productId: adjustment.productId,

        warehouseId: adjustment.warehouseId,

        beforeStock,

        afterStock,

        quantity: afterStock - beforeStock,

        reason: adjustment.reason,

        memo: adjustment.memo ?? "",

        status: "완료",
      };

      adjustments.value.unshift(newAdjustment);

      historyStore.addHistory({
        type: "조정",

        documentNo: newAdjustment.adjustmentNo,

        productId: newAdjustment.productId,

        warehouseId: newAdjustment.warehouseId,

        quantity: newAdjustment.quantity,

        beforeStock,

        afterStock,

        date: newAdjustment.date,
      });

      return {
        success: true,
      };
    }

    /* ==========================
       수정
    ========================== */

    function updateAdjustment(updatedAdjustment) {
      const index = adjustments.value.findIndex((item) => item.id === updatedAdjustment.id);

      if (index === -1) return;

      adjustments.value[index] = {
        ...updatedAdjustment,
      };
    }

    /* ==========================
       삭제
    ========================== */

    function removeAdjustment(id) {
      adjustments.value = adjustments.value.filter((item) => item.id !== id);
    }

    return {
      adjustments,

      totalAdjustments,

      addAdjustment,
      updateAdjustment,
      removeAdjustment,
    };
  },
  {
    persist: true,
  },
);
