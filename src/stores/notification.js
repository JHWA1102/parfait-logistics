import { computed } from "vue";
import { defineStore } from "pinia";

import { useInventoryStockStore } from "@/stores/inventoryStock";
import { usePurchaseOrderStore } from "@/stores/purchaseOrder";
import { useSalesOrderStore } from "@/stores/salesOrder";

export const useNotificationStore = defineStore("notification", () => {
  const inventoryStockStore = useInventoryStockStore();
  const purchaseOrderStore = usePurchaseOrderStore();
  const salesOrderStore = useSalesOrderStore();

  const LOW_STOCK = 10;

  const notifications = computed(() => {
    const list = [];

    // 재고 부족
    const lowStocks = inventoryStockStore.stocks.filter((stock) => stock.stock <= LOW_STOCK);

    if (lowStocks.length) {
      list.push({
        type: "warning",
        title: "재고 부족",
        message: `${lowStocks.length}개의 품목 재고가 부족합니다.`,
      });
    }

    // 미입고 발주
    const purchase = purchaseOrderStore.purchaseOrders.filter((order) => order.status === "발주");

    if (purchase.length) {
      list.push({
        type: "info",
        title: "미입고 발주",
        message: `${purchase.length}건의 발주가 입고 대기중입니다.`,
      });
    }

    // 미출고 주문
    const sales = salesOrderStore.salesOrders.filter((order) => order.status === "주문접수");

    if (sales.length) {
      list.push({
        type: "info",
        title: "미출고 주문",
        message: `${sales.length}건의 주문이 출고 대기중입니다.`,
      });
    }

    return list;
  });

  const unreadCount = computed(() => notifications.value.length);

  return {
    notifications,
    unreadCount,
  };
});
