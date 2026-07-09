<template>
  <BaseTable>
    <template #head>
      <tr>
        <th width="140">거래처 코드</th>
        <th>회사명</th>
        <th>담당자</th>
        <th>연락처</th>
        <th>국가</th>
        <th width="120">구분</th>
        <th width="160">관리</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="customer in customers" :key="customer.id">
        <td class="code">
          {{ customer.code }}
        </td>

        <td>
          {{ customer.company }}
        </td>

        <td>
          {{ customer.manager }}
        </td>

        <td>
          {{ customer.phone }}
        </td>

        <td>
          {{ customer.country }}
        </td>

        <td>
          <span
            class="badge"
            :class="customer.type === '공급업체' ? 'badge--primary' : 'badge--success'"
          >
            {{ customer.type }}
          </span>
        </td>

        <td>
          <div class="actions">
            <BaseButton size="sm" variant="secondary" @click="$emit('edit', customer)">
              수정
            </BaseButton>

            <BaseButton size="sm" variant="danger" @click="$emit('delete', customer)">
              삭제
            </BaseButton>
          </div>
        </td>
      </tr>

      <tr v-if="customers.length === 0">
        <td colspan="7" class="empty">등록된 거래처가 없습니다.</td>
      </tr>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseButton from "@/components/common/BaseButton.vue";
import BaseTable from "@/components/common/BaseTable.vue";

defineProps({
  customers: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit", "delete"]);
</script>

<style scoped>
.code {
  font-family: Consolas, monospace;
  font-weight: 600;
  color: #334155;
}

.actions {
  display: flex;
  gap: 8px;
}

.empty {
  text-align: center;
  color: #94a3b8;
  padding: 40px;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 70px;

  padding: 4px 10px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;
}

.badge--primary {
  background: #eef2ff;
  color: #4f46e5;
}

.badge--success {
  background: #dcfce7;
  color: #15803d;
}
</style>
