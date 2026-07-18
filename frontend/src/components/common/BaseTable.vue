<template>
  <div class="base-table">
    <table>
      <thead>
        <slot name="head" />
      </thead>

      <tbody>
        <slot name="body" />
      </tbody>
    </table>

    <div v-if="$slots.empty" class="base-table__empty">
      <slot name="empty" />
    </div>
  </div>
</template>

<style>
.base-table {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #fafafa;
}

th {
  height: 52px;

  padding: 0 24px;

  font-size: 14px;
  font-weight: 600;

  color: #475569;

  text-align: left;

  border-bottom: 1px solid #e5e7eb;
}

td {
  height: 58px;

  padding: 0 24px;

  font-size: 14px;

  color: var(--text-primary);

  border-bottom: 1px solid #f1f5f9;

  vertical-align: middle;
}

tbody tr {
  transition: background 0.15s;
}

tbody tr:hover {
  background: #fafafa;
}

tbody tr:last-child td {
  border-bottom: none;
}

th,
td {
  border-right: 1px solid #f3f4f6;
}

th:last-child,
td:last-child {
  border-right: none;
}

.base-table__empty {
  padding: 48px;

  text-align: center;

  color: #94a3b8;
}
</style>
