import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCustomerStore = defineStore(
  "customer",
  () => {
    const customers = ref([
      {
        id: 1,
        code: "SUP-0001",
        company: "삼성전자",
        manager: "김철수",
        phone: "010-1234-5678",
        email: "kim@samsung.com",
        country: "대한민국",
        type: "공급업체",
      },
      {
        id: 2,
        code: "CUS-0001",
        company: "쿠팡",
        manager: "홍길동",
        phone: "010-2222-3333",
        email: "hong@coupang.com",
        country: "대한민국",
        type: "고객사",
      },
    ]);

    const totalCustomers = computed(() => customers.value.length);

    function addCustomer(customer) {
      customers.value.push({
        ...customer,
        id: customer.id ?? Date.now(),
      });
    }

    function updateCustomer(customer) {
      const index = customers.value.findIndex((item) => item.id === customer.id);
      if (index !== -1) {
        customers.value[index] = customer;
      }
    }

    function removeCustomer(id) {
      customers.value = customers.value.filter((item) => item.id !== id);
    }

    return {
      customers,
      totalCustomers,
      addCustomer,
      updateCustomer,
      removeCustomer,
    };
  },
  {
    persist: true,
  },
);
