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

    /* ==========================
       Dashboard
    ========================== */

    const totalProducts = computed(() => products.value.length);

    const lowStockCount = computed(
      () => products.value.filter((product) => product.stock < 20).length,
    );

    /* ==========================
       재고 상태 갱신
    ========================== */

    function updateStockStatus(product) {
      product.status = product.stock < 20 ? "부족" : "정상";
    }

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
       재고 증가
    ========================== */

    function increaseStock(productId, quantity) {
      const product = findProduct(productId);

      if (!product) return;

      product.stock += Number(quantity);

      updateStockStatus(product);
    }

    /* ==========================
       재고 감소
    ========================== */

    function decreaseStock(productId, quantity) {
      const product = findProduct(productId);

      if (!product) return false;

      quantity = Number(quantity);

      if (product.stock < quantity) {
        return false;
      }

      product.stock -= quantity;

      updateStockStatus(product);

      return true;
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
      lowStockCount,

      addProduct,
      updateProduct,
      removeProduct,

      increaseStock,
      decreaseStock,

      findProduct,
    };
  },
  {
    persist: true,
  },
);
