<template>
  <BaseTable>
    <template #head>
      <tr>
        <th>품목코드</th>
        <th>품목명</th>
        <th>단위</th>
        <th>재고</th>
        <th>상태</th>
        <th width="180">관리</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.code }}</td>

        <td>{{ product.name }}</td>

        <td>{{ product.unit }}</td>

        <td>{{ product.stock }}</td>

        <td>
          <span class="badge" :class="badgeClass(product.stock)">
            {{ getStatus(product.stock) }}
          </span>
        </td>

        <td class="actions">
          <BaseButton
            style="margin-top: 12px"
            size="sm"
            variant="secondary"
            @click="$emit('edit', product)"
          >
            수정
          </BaseButton>

          <BaseButton
            style="margin-top: 12px"
            size="sm"
            variant="danger"
            @click="$emit('delete', product)"
          >
            삭제
          </BaseButton>
        </td>
      </tr>

      <tr v-if="products.length === 0">
        <td colspan="6" class="empty">등록된 품목이 없습니다.</td>
      </tr>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseButton from "@/components/common/BaseButton.vue";
import BaseTable from "@/components/common/BaseTable.vue";

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit", "delete"]);

function getStatus(stock) {
  if (stock === 0) return "품절";
  if (stock < 20) return "부족";
  return "정상";
}

function badgeClass(stock) {
  if (stock === 0) return "badge--danger";
  if (stock < 20) return "badge--warning";
  return "badge--success";
}
</script>

<style scoped>
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
  gap: 6px;

  padding: 4px 10px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;
}

.badge::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.badge--success {
  background: #dcfce7;
  color: #15803d;
}

.badge--warning {
  background: #fef3c7;
  color: #b45309;
}

.badge--danger {
  background: #fee2e2;
  color: #b91c1c;
}
</style>
