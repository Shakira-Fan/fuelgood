<template>
  <nav class="navbar">
    <div class="icon" @click="$router.push('/')">
      <img src="../assets/images/nav2.png" alt="wels logo" />
    </div>

    <div class="navbar-items">
      <router-link v-if="!username" :to="{ name: 'login' }">登入</router-link>
      <span class="nav-span" v-if="!username">|</span>
      <router-link v-if="!username" :to="{ name: 'account' }">註冊</router-link>
      <div class="user-account" v-if="username">
        <div class="shopping-cart">
          <router-link :to="'/cart'"
            ><span class="material-icons"> shopping_cart </span></router-link
          >
        </div>
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
    id() {
      return this.$store.state.id;
    },
  },
  methods: {
    handleClick() {
      this.user.pop();
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      alert('已登出');
      this.$store.commit('updateLogIn', false);
      this.$store.commit('updateName', '');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
.material-icons {
  font-size: 3.5rem;
}
.navbar {
  z-index: 999;
  width: 100%;
  position: fixed;
  top:0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background-color: var(--color-primary);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
}
.navbar-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 4rem;
}

.nav-span {
  margin: 0 0.5rem;
}
img {
  width: 12rem;
  margin-left: 3rem;
}
a {
  font-size: 2.3rem;
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
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #fff;
  background-color: var(--color-secondary);
  border-radius: 1rem;
}
.logout:hover {
  background-color: #0e3365;
}
</style>
