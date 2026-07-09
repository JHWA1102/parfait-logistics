import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import DashboardView from "@/views/dashboard/DashboardView.vue";
import InventoryListView from "@/views/inventory/InventoryListView.vue";
import CustomerListView from "@/views/customer/CustomerListView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
          path: "inventory", // ✅ children에서는 / 없이 사용
          name: "inventory",
          component: InventoryListView,
        },
        {
          path: "customer",
          name: "customer",
          component: CustomerListView,
        },
      ],
    },
  ],
});

export default router;
