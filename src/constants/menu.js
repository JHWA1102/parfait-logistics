import {
  LayoutDashboard,
  Package,
  Warehouse,
  Building2,
  Boxes,
  ArrowRightLeft,
  ClipboardList,
  ShoppingCart,
  PackagePlus,
  PackageMinus,
  History,
} from "lucide-vue-next";

export const menus = [
  {
    title: "Dashboard",

    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
        roles: ["ADMIN", "PURCHASE", "SALES", "WAREHOUSE"],
      },
    ],
  },

  {
    title: "Master",

    items: [
      {
        name: "품목관리",
        path: "/inventory",
        icon: Package,
        roles: ["ADMIN"],
      },
      {
        name: "거래처관리",
        path: "/customer",
        icon: Building2,
        roles: ["ADMIN"],
      },
      {
        name: "창고관리",
        path: "/warehouse",
        icon: Warehouse,
        roles: ["ADMIN"],
      },
    ],
  },

  {
    title: "Purchase",

    items: [
      {
        name: "발주관리",
        path: "/purchase-order",
        icon: ClipboardList,
        roles: ["ADMIN", "PURCHASE"],
      },
    ],
  },

  {
    title: "Sales",

    items: [
      {
        name: "주문관리",
        path: "/sales-order",
        icon: ShoppingCart,
        roles: ["ADMIN", "SALES"],
      },
    ],
  },

  {
    title: "Warehouse",

    items: [
      {
        name: "입고관리",
        path: "/inbound",
        icon: PackagePlus,
        roles: ["ADMIN", "PURCHASE", "WAREHOUSE"],
      },

      {
        name: "출고관리",
        path: "/outbound",
        icon: PackageMinus,
        roles: ["ADMIN", "SALES", "WAREHOUSE"],
      },

      {
        name: "재고관리",
        path: "/inventory-stock",
        icon: Boxes,
        roles: ["ADMIN", "WAREHOUSE"],
      },

      {
        name: "재고이동",
        path: "/transfer",
        icon: ArrowRightLeft,
        roles: ["ADMIN", "WAREHOUSE"],
      },

      {
        name: "재고이력",
        path: "/inventory-history",
        icon: History,
        roles: ["ADMIN", "WAREHOUSE"],
      },
    ],
  },
];
