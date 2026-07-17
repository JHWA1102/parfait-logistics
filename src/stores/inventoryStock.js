import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useInventoryStockStore = defineStore(
  "inventoryStock",
  () => {
    /*
      warehouseId + productId 조합으로 재고 관리
    */

    const stocks = ref([]);

    /* ==========================
       조회
    ========================== */

    function findStock(warehouseId, productId) {
      return stocks.value.find(
        (item) =>
          String(item.warehouseId) === String(warehouseId) &&
          String(item.productId) === String(productId),
      );
    }

    function getStock(warehouseId, productId) {
      const stock = findStock(warehouseId, productId);

      return stock ? stock.stock : 0;
    }

    /* ==========================
       증가
    ========================== */

    function increaseStock(warehouseId, productId, quantity) {
      quantity = Number(quantity);

      let stock = findStock(warehouseId, productId);

      if (!stock) {
        stock = {
          id: Date.now(),

          warehouseId,

          productId,

          stock: 0,
        };

        stocks.value.push(stock);
      }

      const beforeStock = stock.stock;

      stock.stock += quantity;

      return {
        beforeStock,
        afterStock: stock.stock,
      };
    }

    /* ==========================
       감소
    ========================== */

    function decreaseStock(warehouseId, productId, quantity) {
      quantity = Number(quantity);

      const stock = findStock(warehouseId, productId);

      if (!stock) {
        return false;
      }

      const beforeStock = stock.stock;

      if (beforeStock < quantity) {
        return false;
      }

      stock.stock -= quantity;

      return {
        beforeStock,
        afterStock: stock.stock,
      };
    }

    /* ==========================
       재고 직접 수정
    ========================== */

    function setStock(warehouseId, productId, newStock) {
      newStock = Number(newStock);

      let stock = findStock(warehouseId, productId);

      if (!stock) {
        stock = {
          id: Date.now(),

          warehouseId,

          productId,

          stock: 0,
        };

        stocks.value.push(stock);
      }

      const beforeStock = stock.stock;

      stock.stock = newStock;

      return {
        beforeStock,
        afterStock: stock.stock,
      };
    }

    /* ==========================
       삭제
    ========================== */

    function removeStock(warehouseId, productId) {
      stocks.value = stocks.value.filter(
        (item) =>
          !(
            String(item.warehouseId) === String(warehouseId) &&
            String(item.productId) === String(productId)
          ),
      );
    }

    /* ==========================
       품목 총재고
    ========================== */

    function getTotalStock(productId) {
      return stocks.value
        .filter((item) => String(item.productId) === String(productId))
        .reduce((sum, item) => sum + Number(item.stock), 0);
    }

    /* ==========================
       Dashboard
    ========================== */

    const totalStockCount = computed(() =>
      stocks.value.reduce((sum, item) => sum + Number(item.stock), 0),
    );

    const lowStockCount = computed(() => stocks.value.filter((item) => item.stock < 20).length);

    const lowStockStocks = computed(() =>
      stocks.value.filter((item) => item.stock < 20).sort((a, b) => a.stock - b.stock),
    );

    return {
      stocks,

      totalStockCount,
      lowStockCount,
      lowStockStocks,

      findStock,
      getStock,
      getTotalStock,

      increaseStock,
      decreaseStock,
      setStock,

      removeStock,
    };
  },
  {
    persist: true,
  },
);
