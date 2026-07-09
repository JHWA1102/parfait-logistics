import {
  LayoutDashboard,
  Package,
  Warehouse,
  Building2,
  ArrowDownToLine,
  ArrowUpFromLine,
  Truck,
  Globe,
  BarChart3,
  Settings,
} from "lucide-vue-next";

export const menus = [
  {
    title: "메인",
    items: [
      {
        name: "대시보드",
        icon: LayoutDashboard,
        path: "/",
      },
    ],
  },
  {
    title: "기준정보",
    items: [
      {
        name: "품목관리",
        icon: Package,
        path: "/inventory",
      },
      {
        name: "거래처관리",
        icon: Building2,
        path: "/customer",
      },
      {
        name: "창고관리",
        icon: Warehouse,
        path: "/warehouse",
      },
    ],
  },
  {
    title: "물류업무",
    items: [
      {
        name: "입고관리",
        icon: ArrowDownToLine,
        path: "/inbound",
      },
      {
        name: "출고관리",
        icon: ArrowUpFromLine,
        path: "/outbound",
      },
      {
        name: "배송관리",
        icon: Truck,
        path: "/shipment",
      },
    ],
  },
  {
    title: "국제물류",
    items: [
      {
        name: "수출입관리",
        icon: Globe,
        path: "/trade",
      },
    ],
  },
  {
    title: "시스템",
    items: [
      {
        name: "통계",
        icon: BarChart3,
        path: "/statistics",
      },
      {
        name: "설정",
        icon: Settings,
        path: "/settings",
      },
    ],
  },
];
