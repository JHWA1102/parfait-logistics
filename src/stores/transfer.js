import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useInventoryStockStore } from "./inventoryStock";
import { useInventoryHistoryStore } from "./inventoryHistory";

export const useTransferStore = defineStore("transfer", () => {
  const transfers = ref([]);

  const inventoryStockStore = useInventoryStockStore();
  const historyStore = useInventoryHistoryStore();

  const totalTransfers = computed(() => transfers.value.length);

  function addTransfer(transfer) {
    if (transfer.fromWarehouseId === transfer.toWarehouseId) {
      return {
        success: false,
        message: "출발창고와 도착창고는 같을 수 없습니다.",
      };
    }

    const quantity = Number(transfer.quantity);

    if (quantity <= 0) {
      return {
        success: false,
        message: "이동수량은 0보다 커야 합니다.",
      };
    }

    const decreaseResult = inventoryStockStore.decreaseStock(
      transfer.fromWarehouseId,
      transfer.productId,
      quantity,
    );

    if (!decreaseResult.success) {
      return decreaseResult;
    }

    const increaseResult = inventoryStockStore.increaseStock(
      transfer.toWarehouseId,
      transfer.productId,
      quantity,
    );

    const newTransfer = {
      ...transfer,
      id: Date.now(),
      quantity,
    };

    transfers.value.unshift(newTransfer);

    // 출발창고 이력
    historyStore.addHistory({
      type: "이동",

      documentNo: newTransfer.transferNo,

      productId: newTransfer.productId,

      warehouseId: newTransfer.fromWarehouseId,

      quantity,

      beforeStock: decreaseResult.beforeStock,

      afterStock: decreaseResult.afterStock,

      date: newTransfer.date,
    });

    // 도착창고 이력
    historyStore.addHistory({
      type: "이동",

      documentNo: newTransfer.transferNo,

      productId: newTransfer.productId,

      warehouseId: newTransfer.toWarehouseId,

      quantity,

      beforeStock: increaseResult.beforeStock,

      afterStock: increaseResult.afterStock,

      date: newTransfer.date,
    });

    return {
      success: true,
      message: "재고 이동이 완료되었습니다.",
    };
  }

  function removeTransfer(id) {
    const index = transfers.value.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    transfers.value.splice(index, 1);

    return true;
  }

  function findTransfer(id) {
    return transfers.value.find((item) => item.id === id);
  }

  return {
    transfers,

    totalTransfers,

    addTransfer,
    removeTransfer,
    findTransfer,
  };
});
