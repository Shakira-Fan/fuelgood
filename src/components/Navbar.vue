<template>
  <nav class="navbar">
    <router-link :to="{ name: 'home' }">
      <img src="../assets/images/wels.svg" alt="wels logo" />
    </router-link>

    <div class="navbar-items">
      <router-link v-if="!username" :to="{ name: 'login' }">登入</router-link>
      <span class="nav-span">|</span>
      <router-link v-if="!username" :to="{ name: 'account' }">註冊</router-link>
      <div class="user-account" v-if="username">
        <router-link :to="'/cart'">購物車</router-link>
      </div>
      <div class="user-account" v-if="username">
        <router-link :to="`/user/${id}`">Hi, {{ username }}</router-link>
        <span class="logout" @click="handleClick">登出</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    user() {
      return this.$store.state.user;
    },
    logIn() {
      return this.$store.state.logIn;
    },
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    handleClick() {
      this.user.pop();
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      alert('Logged out');
      this.$store.commit('updateLogIn', false);
      this.$store.commit('updateName', '');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 10rem;
  align-items: center;
  background-color: var(--color-primary);
  padding: 2rem;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
}
.navbar-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-span {
  margin: 0 0.5rem;
}
img {
  width: 6rem;
  margin-left: 3rem;
}
a {
  font-size: 2rem;
  text-decoration: none;
  color: #000;
}
a:hover {
  color: var(--color-secondary);
}
.user-account {
  margin-right: 2rem;
}
.logout {
  margin: 0 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #fff;
  background-color: var(--color-secondary);
  border-radius: 1rem;
}
</style>
