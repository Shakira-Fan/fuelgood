<template>
  <nav class="navbar">
    <img src="../assets/images/wels.svg" alt="" />
    <router-link :to="{ name: 'home' }">首頁</router-link>
    <router-link :to="{ name: 'news' }">優惠活動</router-link>
    <router-link :to="{ name: 'cart' }">購物車</router-link>
    <router-link :to="{ name: 'account' }">登入／註冊</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-primary);
  padding: 1.5rem;
}
img {
  width: 8rem;
}
a {
  font-size: 2.1rem;
  text-decoration: none;
}
</style>
