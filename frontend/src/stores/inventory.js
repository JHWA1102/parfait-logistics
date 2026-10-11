import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api/axios";

export const useInventoryStore = defineStore("inventory", () => {
  const products = ref([]);

    /* ==========================
       Dashboard
    ========================== */

    const totalProducts = computed(() => products.value.length);

    /* ==========================
       등록
    ========================== */

  async function fetchProducts() {
    const response = await api.get("/api/products");
    products.value = response.data;
  }

    /* ==========================
       수정
    ========================== */

  async function addProduct(product) {
    const response = await api.post("/api/products", product);
    products.value.push(response.data);
    return response.data;
  }

  async function updateProduct(updatedProduct) {
    const response = await api.put(`/api/products/${updatedProduct.id}`, {
      name: updatedProduct.name,
      unit: updatedProduct.unit,
      active: updatedProduct.active,
    });

    const index = products.value.findIndex((product) => product.id === updatedProduct.id);

    if (index !== -1) {
      products.value.splice(index, 1, response.data);
    }

    return response.data;
  }

    /* ==========================
       삭제
    ========================== */

  async function removeProduct(id) {
    await api.delete(`/api/products/${id}`);
    products.value = products.value.filter((product) => product.id !== id);
  }

    /* ==========================
       품목 조회
    ========================== */

  function findProduct(productId) {
    return products.value.find((item) => String(item.id) === String(productId)) ?? null;
  }

  return {
    products,

    totalProducts,

    fetchProducts,
    addProduct,
    updateProduct,
    removeProduct,

    findProduct,
  };
});
