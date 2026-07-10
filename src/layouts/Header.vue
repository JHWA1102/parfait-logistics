<template>
  <header class="header">
    <div class="header__left">
      <h1 class="header__title">Dashboard</h1>
      <p class="header__subtitle">Welcome back! Here's what's happening today.</p>
    </div>

    <div class="header__right">
      <!-- Search -->
      <div class="header__search">
        <input type="text" placeholder="Search..." />
      </div>

      <!-- Notification -->
      <button class="header__icon-btn">🔔</button>

      <!-- User -->
      <div class="header__user">
        <div class="header__avatar">A</div>

        <div>
          <div class="header__name">Administrator</div>

          <div class="header__role">Admin</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// 추후 로그인 정보(Pinia/Firebase) 연결 예정
</script>

<style scoped>
.header {
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 32px;
}

.header__left {
  display: flex;
  flex-direction: column;
}

.header__title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.header__subtitle {
  margin-top: 4px;
  color: #64748b;
  font-size: 14px;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header__search input {
  width: 260px;
  height: 42px;

  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);

  padding: 0 14px;

  outline: none;

  font-size: 14px;
}

.header__search input:focus {
  border-color: var(--color-primary);
}

.header__icon-btn {
  width: 42px;
  height: 42px;

  border: none;
  border-radius: var(--radius-md);

  background: #f1f5f9;

  cursor: pointer;

  transition: 0.2s;
}

.header__icon-btn:hover {
  background: #e2e8f0;
}

.header__user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__avatar {
  width: 42px;
  height: 42px;

  border-radius: 50%;

  background: var(--color-primary);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
}

.header__name {
  font-weight: 600;
  color: #111827;
}

.header__role {
  color: #64748b;
  font-size: 13px;
}
</style>
