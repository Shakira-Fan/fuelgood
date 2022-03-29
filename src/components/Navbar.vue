<template>
  <nav class="navbar">
    <img src="../assets/images/wels.svg" alt="wels logo" />
    <div class="navbar-items">
      <router-link :to="{ name: 'home' }">首頁</router-link>
      <router-link :to="{ name: 'news' }">優惠活動</router-link>

      <router-link v-if="!user.length" :to="{ name: 'account' }"
        >登入／註冊</router-link
      >
      <div class="user-account" v-if="user.length">
        <router-link :to="'/cart'">購物車</router-link>
      </div>
      <div class="user-account" v-if="user.length">
        <router-link :to="'/user/' + user[0].user._id">{{
          `HI,${user[0].user.name}`
        }}</router-link>
        <span class="logout" @click="handleClick">登出</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleClick() {
      console.log("clicked");
      this.user.pop();
      console.log(this.user);
      alert("Logged out");
      this.$router.push("/");
    },
  },
};
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
.user-account {
  display: flex;
  align-items: center;
}
.logout {
  margin: 0 2rem;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--color-secondary);
}
</style>
