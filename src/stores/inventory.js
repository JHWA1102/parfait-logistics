import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useInventoryStore = defineStore(
  "inventory",
  () => {
    const products = ref([
      {
        id: 1,
        code: "P001",
        name: "박스 A",
        unit: "EA",
      },
      {
        id: 2,
        code: "P002",
        name: "박스 B",
        unit: "BOX",
      },
      {
        id: 3,
        code: "P003",
        name: "테이프",
        unit: "EA",
      },
    ]);

    /* ==========================
       Dashboard
    ========================== */

    const totalProducts = computed(() => products.value.length);

    /* ==========================
       등록
    ========================== */

    function addProduct(product) {
      products.value.push({
        ...product,
        id: product.id ?? Date.now(),
      });
    }

    /* ==========================
       수정
    ========================== */

    function updateProduct(updatedProduct) {
      const index = products.value.findIndex((product) => product.id === updatedProduct.id);

      if (index === -1) return;

      products.value.splice(index, 1, {
        ...updatedProduct,
      });
    }

    /* ==========================
       삭제
    ========================== */

    function removeProduct(id) {
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

      addProduct,
      updateProduct,
      removeProduct,

      findProduct,
    };
  },
  {
    persist: true,
  },
);
