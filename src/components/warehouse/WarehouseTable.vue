<template>
  <BaseTable>
    <template #head>
      <tr>
        <th>창고코드</th>
        <th>창고명</th>
        <th>유형</th>
        <th>담당자</th>
        <th>연락처</th>
        <th>상태</th>
        <th width="170">관리</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="warehouse in warehouses" :key="warehouse.id">
        <td>{{ warehouse.code }}</td>

        <td>{{ warehouse.name }}</td>

        <td>{{ warehouse.type }}</td>

        <td>{{ warehouse.manager }}</td>

        <td>{{ warehouse.phone }}</td>

        <td>
          <BaseBadge :variant="getStatusVariant(warehouse.status)">
            {{ warehouse.status }}
          </BaseBadge>
        </td>

        <td>
          <div class="table-actions">
            <BaseButton size="sm" variant="secondary" @click="$emit('edit', warehouse)">
              수정
            </BaseButton>

            <BaseButton size="sm" variant="danger" @click="$emit('delete', warehouse)">
              삭제
            </BaseButton>
          </div>
        </td>
      </tr>
    </template>

    <template v-if="warehouses.length === 0" #empty> 등록된 창고가 없습니다. </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from "@/components/common/BaseTable.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseBadge from "@/components/common/BaseBadge.vue";

defineProps({
  warehouses: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit", "delete"]);

function getStatusVariant(status) {
  switch (status) {
    case "운영중":
      return "success";

    case "점검중":
      return "warning";

    case "폐쇄":
      return "danger";

    default:
      return "secondary";
  }
}
</script>

<style scoped>
.table-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
