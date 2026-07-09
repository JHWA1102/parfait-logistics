import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useInventoryStore = defineStore("inventory", () => {
  const products = ref([
    {
      id: 1,
      code: "P001",
      name: "박스 A",
      unit: "EA",
      stock: 120,
      status: "정상",
    },
    {
      id: 2,
      code: "P002",
      name: "박스 B",
      unit: "BOX",
      stock: 18,
      status: "부족",
    },
    {
      id: 3,
      code: "P003",
      name: "테이프",
      unit: "EA",
      stock: 250,
      status: "정상",
    },
  ]);

  const totalProducts = computed(() => products.value.length);

  const lowStockCount = computed(
    () => products.value.filter((product) => product.stock < 20).length,
  );

  function addProduct(product) {
    products.value.push({
      id: Date.now(),
      ...product,
    });
  }

  function removeProduct(id) {
    products.value = products.value.filter((product) => product.id !== id);
  }

  function updateProduct(updatedProduct) {
    const index = products.value.findIndex((product) => product.id === updatedProduct.id);

    if (index === -1) return;

    products.value[index] = {
      ...updatedProduct,
    };
  }

  return {
    products,
    totalProducts,
    lowStockCount,

    addProduct,
    removeProduct,
    updateProduct,
  };
});
