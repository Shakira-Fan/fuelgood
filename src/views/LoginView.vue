<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <h1>登入會員</h1>
    <div class="round">
      <img class="logo" src="../assets/images/logo3.png" alt="" />
    </div>
    <label>Email:</label>
    <input type="text" name="email" v-model="email" required />
    <label>密碼:</label>
    <input type="password" name="password" v-model="password" required />

    <p class="err" v-if="error.length">{{ error }}</p>
    <button class="sign-up-btn">登入</button>

    <div class="alternative">
      <span>尚未有帳號嗎?</span>
      <button
        type="button"
        class="register-btn"
        @click="$router.push('/account')"
      >
        立刻註冊!
      </button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: null,
      password: null,
      error: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    id() {
      return this.$store.state.id;
    },
    username() {
      return this.$store.state.username;
    },
  },
  mutations: {
    updateLogIn(state, newState) {
      state.logIn = newState;
    },
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await axios.post(
          'https://fuel-good.herokuapp.com/auth/login',
          {
            email: this.email,
            password: this.password,
          }
        );

        console.log(res.data);
        this.user.push(res.data);
        console.log(this.user);
        if (res.data.user.name) {
          localStorage.setItem('name', this.user[0].user.name);
          localStorage.setItem('id', this.user[0].user._id);
          localStorage.setItem('email', this.user[0].user.email);
          this.$store.commit('updateLogIn', true);
          this.$store.commit('updateName', localStorage.getItem('name'));
          await this.$router.push('/user' + '/' + this.id);
        }
      } catch (err) {
        if (err.response) {
          // this.error = err.response.data;
          this.error = 'Email或密碼錯誤';
          this.email = '';
          this.password = '';
        }
      }
    },
  },
};
</script>

<style scoped>
.logo {
  width: 5rem;
}
h1 {
  font-size: 3rem;
  text-align: center;
  padding: 2rem;
}
p {
  text-align: center;
}
.signup-form {
  max-width: 60rem;
  background: #fff;
  margin: 8rem auto;
  text-align: left;
  padding: 3rem;
  padding-bottom: 5rem;
  border-radius: 8px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
}
label {
  display: block;
  width: 100%;
  padding: 1.5rem;
}
input {
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  border-radius: 4px;
  border: none;
  border-bottom: 2px solid #eee;
}
.sign-up-btn {
  display: block;
  margin-top: 5rem;
  font-size: 1.8rem;
  transition: all 0.2s ease-in-out;
}
.sign-up-btn:hover {
  background-color: #0e3365;
}
.register-btn {
  display: inline-block;
  border: none;
  background: none;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.8rem;
  border-bottom: 1px solid var(--color-primary);
  padding: 0.3rem;
  cursor: pointer;
}
.register-btn:hover {
  color: var(--color-secondary);
  border-bottom: 1px solid var(--color-secondary);
}
span {
  font-size: 1.8rem;
  margin-right: 1rem;
}
.alternative {
  display: flex;
  align-items: center;
  margin-top: 3rem;
}
.sign-up-btn {
  font-size: 1.8rem;
  padding: 1rem;
  border-radius: 1rem;
  border: none;
  margin-top: 5rem;
  cursor: pointer;
  background-color: var(--color-secondary);
  color: #fff;
}
.round {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: #eee;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.err {
  text-align: left;
  font-weight: bold;
  color: #cd1818;
  padding-top: 2rem;
  margin-left: 2rem;
  font-size: 1.8rem;
}
</style>
