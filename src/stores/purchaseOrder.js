// stores/purchaseOrder.js

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePurchaseOrderStore = defineStore("purchaseOrder", () => {
  const purchaseOrders = ref([]);

  /**
   * 발주 등록
   */
  function addPurchaseOrder(order) {
    purchaseOrders.value.push({
      ...order,
      status: order.status ?? "발주중",
    });

    return {
      success: true,
      message: "발주가 등록되었습니다.",
    };
  }

  /**
   * 발주 수정
   */
  function updatePurchaseOrder(updatedOrder) {
    const index = purchaseOrders.value.findIndex((item) => item.orderNo === updatedOrder.orderNo);

    if (index === -1) {
      return {
        success: false,
        message: "발주 정보를 찾을 수 없습니다.",
      };
    }

    purchaseOrders.value[index] = {
      ...purchaseOrders.value[index],
      ...updatedOrder,
    };

    return {
      success: true,
      message: "발주가 수정되었습니다.",
    };
  }

  /**
   * 발주 삭제
   */
  function removePurchaseOrder(orderNo) {
    purchaseOrders.value = purchaseOrders.value.filter((item) => item.orderNo !== orderNo);

    return {
      success: true,
      message: "발주가 삭제되었습니다.",
    };
  }

  /**
   * 발주 조회
   */
  function findPurchaseOrder(orderNo) {
    return purchaseOrders.value.find((item) => item.orderNo === orderNo);
  }

  const totalPurchaseOrders = computed(() => purchaseOrders.value.length);

  return {
    purchaseOrders,

    totalPurchaseOrders,

    addPurchaseOrder,
    updatePurchaseOrder,
    removePurchaseOrder,
    findPurchaseOrder,
  };
});
