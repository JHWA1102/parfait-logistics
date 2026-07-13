<template>
  <DashboardPanel title="최근 입·출고 현황">
    <div class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </DashboardPanel>
</template>

<script setup>
import { computed } from "vue";

import DashboardPanel from "./DashboardPanel.vue";

import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { useInboundStore } from "@/stores/inbound";
import { useOutboundStore } from "@/stores/outbound";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const inboundStore = useInboundStore();
const outboundStore = useOutboundStore();

const chartData = computed(() => {
  return {
    labels: inboundStore.weeklyInboundStats.labels,

    datasets: [
      {
        label: "입고",

        data: inboundStore.weeklyInboundStats.data,
      },

      {
        label: "출고",

        data: outboundStore.weeklyOutboundStats.data,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top",
    },
  },

  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 350px;
}
</style>
