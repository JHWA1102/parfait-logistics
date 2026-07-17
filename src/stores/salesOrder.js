import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSalesOrderStore = defineStore("salesOrder", () => {
  const salesOrders = ref([]);

  function addSalesOrder(order) {
    salesOrders.value.push({
      ...order,
      status: order.status ?? "주문접수",
    });

    return {
      success: true,
      message: "주문이 등록되었습니다.",
    };
  }

  function updateSalesOrder(updatedOrder) {
    const index = salesOrders.value.findIndex((order) => order.id === updatedOrder.id);

    if (index !== -1) {
      salesOrders.value[index] = updatedOrder;
    }
  }

  function removeSalesOrder(id) {
    const index = salesOrders.value.findIndex((order) => order.id === id);

    if (index !== -1) {
      salesOrders.value.splice(index, 1);
    }
  }

  function findSalesOrder(id) {
    return salesOrders.value.find((order) => order.id === id);
  }

  const totalSalesOrders = computed(() => salesOrders.value.length);

  return {
    salesOrders,

    addSalesOrder,
    updateSalesOrder,
    removeSalesOrder,
    findSalesOrder,

    totalSalesOrders,
  };
});
