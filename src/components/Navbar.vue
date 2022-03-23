<template>
  <nav class="navbar">
    <img src="../assets/images/wels.svg" alt="wels logo" />
    <div class="navbar-items">
      <router-link :to="{ name: 'home' }">首頁</router-link>
      <router-link :to="{ name: 'news' }">優惠活動</router-link>

      <router-link :to="{ name: 'account' }">登入／註冊</router-link>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primary);
  padding: 2rem;
}
.navbar-items {
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
img {
  width: 8rem;
}
a {
  font-size: 2.3rem;
  text-decoration: none;
  color: #000;
}
a.router-link-active {
  border-bottom: 0.3rem solid var(--color-secondary);
  padding-bottom: 4px;
}
</style>
