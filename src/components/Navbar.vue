<template>
  <nav class="navbar" :style="style" :class="{ color: color }">
    <div class="icon" @click="$router.push('/')">
      <img src="../assets/images/nav3.png" alt="wels logo" />
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
  data() {
    return {
      style: {
        backgroundColor: '',
      },
      color: false,
    };
  },

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
    handleScroll() {
      if (window.scrollY > 5) {
        this.style.backgroundColor = `#ffd32d`;
      } else {
        // this.style.backgroundColor = 'transparent';
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    handleClick() {
      this.user.pop();
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      this.$swal({
        confirmButtonColor: '#084594',
        title: '已登出，歡迎您再次回來～',
      });
      this.$store.commit('updateLogIn', false);
      this.$store.commit('updateName', '');
      this.$store.commit('updateInv', []);
      this.$store.commit('updateUser', []);
      this.$store.commit('updateOrders', []);
      this.$router.push('/');
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
.material-icons {
  font-size: 3rem;
  margin-right: 1.5rem;
}
.navbar {
  z-index: 999;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  background-color: transparent;
}
.navbar-items {
  color: var(--color-secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 1rem;
}
.navbar-items a {
  color: var(--color-secondary);
  transition: all 0.1s ease-in-out;
}

.user-account a :hover {
  transform: scale(1.2);
}

.nav-span {
  margin: 0 0.5rem;
}
img {
  margin-top: 1rem;
  width: 13rem;
  margin-left: 3rem;
  transition: all 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}

a {
  font-size: 2.3rem;
  text-decoration: none;
  color: #fff;
  transition: all 0.2s ease-in-out;
}
a:hover {
  transform: scale(1.2);
}
.user-account {
  margin-right: 2 rem;
}
.logout {
  margin: 0 2rem;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.7rem;
  color: var(--color-secondary);
  background-color: none;
  border: 2px solid var(--color-secondary);
  border-radius: 1rem;
  transition: all 0.2s ease-in-out;
}
.logout:hover {
  background-color: var(--color-secondary);
  color: #fff;
}
.swal2-styled.swal2-confirm {
  border: 0;
  border-radius: 0.25em;
  background: initial;
  background-color: var(--color-secondary);
  color: #fff;
  font-size: 1em;
  line-height: 1.5;
}

@media only screen and (max-width: 31.25em) {
  .material-icons {
    margin-left: 2rem;
  }
  .navbar {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: none;
    margin: 0 auto;
    background-color: var(--color-primary);
    padding-bottom: 1rem;
  }
  .navbar-items {
    color: var(--color-secondary);
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
  .navbar-items a {
    color: var(--color-secondary);
    margin: 0 auto;
  }

  .user-account a :hover {
    transform: none;
  }

  .nav-span {
    margin: 0 0.5rem;
  }
  img {
    margin-top: 0.5rem;
    width: 12rem;
    margin: 0 auto;
  }

  img:hover {
    transform: none;
  }
  a {
    font-size: 1.8rem;
  }
  a:hover {
    transform: none;
  }
  .user-account {
    margin-right: 2rem;
  }
  .logout {
    margin: 0 2rem;
    font-size: 1.8rem;
    padding: 0.7rem;
    border: 2px solid var(--color-secondary);
    border-radius: 1rem;
  }
  .logout:hover {
    background-color: none;
    color: #fff;
  }
}
</style>
