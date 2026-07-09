import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCustomerStore = defineStore("customer", () => {
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
  ]);

  const totalCustomers = computed(() => customers.value.length);

  function addCustomer(customer) {
    customers.value.push({
      ...customer,
      id: customer.id ?? Date.now(),
    });
  }

  function updateCustomer(customer) {
    console.log("updateCustomer", customer);
    const index = customers.value.findIndex((item) => item.id === customer.id);
    console.log("index =", index);
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
});
