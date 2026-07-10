import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useWarehouseStore = defineStore(
  "warehouse",
  () => {
    const warehouses = ref([
      {
        id: 1,
        code: "WH-001",
        name: "본사창고",
        type: "일반",
        manager: "홍길동",
        phone: "010-1234-5678",
        address: "서울특별시 강남구",
        status: "운영중",
      },
      {
        id: 2,
        code: "WH-002",
        name: "부산창고",
        type: "물류센터",
        manager: "김철수",
        phone: "010-2345-6789",
        address: "부산광역시 강서구",
        status: "운영중",
      },
      {
        id: 3,
        code: "WH-003",
        name: "인천항창고",
        type: "항만",
        manager: "이영희",
        phone: "010-3456-7890",
        address: "인천광역시 중구",
        status: "점검중",
      },
    ]);

    // Dashboard
    const totalWarehouses = computed(() => warehouses.value.length);

    const activeWarehouses = computed(
      () => warehouses.value.filter((warehouse) => warehouse.status === "운영중").length,
    );

    const inactiveWarehouses = computed(
      () => warehouses.value.filter((warehouse) => warehouse.status !== "운영중").length,
    );

    // 등록
    function addWarehouse(warehouse) {
      warehouses.value.push({
        ...warehouse,
        id: warehouse.id ?? Date.now(),
      });
    }

    // 수정
    function updateWarehouse(updatedWarehouse) {
      const index = warehouses.value.findIndex((warehouse) => warehouse.id === updatedWarehouse.id);

      if (index === -1) return;

      warehouses.value.splice(index, 1, {
        ...updatedWarehouse,
      });
    }

    // 삭제
    function removeWarehouse(id) {
      warehouses.value = warehouses.value.filter((warehouse) => warehouse.id !== id);
    }

    return {
      warehouses,

      totalWarehouses,
      activeWarehouses,
      inactiveWarehouses,

      addWarehouse,
      updateWarehouse,
      removeWarehouse,
    };
  },
  {
    persist: true,
  },
);
