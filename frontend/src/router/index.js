import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import DashboardView from "@/views/dashboard/DashboardView.vue";
import InventoryListView from "@/views/inventory/InventoryListView.vue";
import CustomerListView from "@/views/customer/CustomerListView.vue";
import WarehouseListView from "@/views/warehouse/WarehouseListView.vue";
import InboundListView from "@/views/inbound/InboundListView.vue";
import OutboundListView from "@/views/outbound/OutboundListView.vue";
import InventoryHistoryListView from "@/views/inventory/InventoryHistoryListView.vue";
import AdjustmentListView from "@/views/adjustment/AdjustmentListView.vue";
import InventoryStockListView from "@/views/inventory/InventoryStockListView.vue";
import TransferListView from "@/views/transfer/TransferListView.vue";
import PurchaseOrderListView from "@/views/purchaseOrder/PurchaseOrderListView.vue";
import SalesOrderListView from "@/views/salesOrder/SalesOrderListView.vue";
import LoginView from "@/views/auth/LoginView.vue";

import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    // 로그인
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },

    // ERP
    {
      path: "/",
      component: DefaultLayout,

      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView,
        },

        {
          path: "inventory",
          name: "inventory",
          component: InventoryListView,
          meta: {
            roles: ["ADMIN"],
          },
        },

        {
          path: "customer",
          name: "customer",
          component: CustomerListView,
          meta: {
            roles: ["ADMIN"],
          },
        },

        {
          path: "warehouse",
          name: "warehouse",
          component: WarehouseListView,
          meta: {
            roles: ["ADMIN"],
          },
        },

        {
          path: "inventory-stock",
          name: "inventory-stock",
          component: InventoryStockListView,
          meta: {
            roles: ["ADMIN", "WAREHOUSE"],
          },
        },

        {
          path: "inventory-history",
          name: "inventory-history",
          component: InventoryHistoryListView,
          meta: {
            roles: ["ADMIN", "WAREHOUSE"],
          },
        },

        {
          path: "inbound",
          name: "inbound",
          component: InboundListView,
          meta: {
            roles: ["ADMIN", "WAREHOUSE", "PURCHASE"],
          },
        },

        {
          path: "outbound",
          name: "outbound",
          component: OutboundListView,
          meta: {
            roles: ["ADMIN", "WAREHOUSE", "SALES"],
          },
        },

        {
          path: "adjustment",
          name: "adjustment",
          component: AdjustmentListView,
          meta: {
            roles: ["ADMIN", "WAREHOUSE"],
          },
        },

        {
          path: "transfer",
          name: "transfer",
          component: TransferListView,
          meta: {
            roles: ["ADMIN", "WAREHOUSE"],
          },
        },

        {
          path: "purchase-order",
          name: "purchase-order",
          component: PurchaseOrderListView,
          meta: {
            roles: ["ADMIN", "PURCHASE"],
          },
        },

        {
          path: "sales-order",
          name: "sales-order",
          component: SalesOrderListView,
          meta: {
            roles: ["ADMIN", "SALES"],
          },
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  // 로그인 되어있는데 로그인 페이지 접근
  if (to.name === "login" && authStore.isAuthenticated) {
    return "/";
  }

  // 로그인 안됨
  if (to.name !== "login" && !authStore.isAuthenticated) {
    return "/login";
  }

  // 권한 체크
  const roles = to.meta.roles;

  if (roles && roles.length && !authStore.hasRole(...roles)) {
    alert("접근 권한이 없습니다.");
    return "/";
  }

  return true;
});

export default router;
