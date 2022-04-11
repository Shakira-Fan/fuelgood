<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <h1>登入</h1>
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
          await localStorage.setItem('id', this.user[0].user._id);
          localStorage.setItem('email', this.user[0].user.email);
          this.$store.commit('updateLogIn', true);
          this.$store.commit('updateName', localStorage.getItem('name'));
          this.$store.commit('updateId', localStorage.getItem('id'));
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
  width: 6rem;
}
h1 {
  font-size: 3rem;
  text-align: center;
  padding: 2rem;
  font-weight: 500;
}
p {
  text-align: center;
}
.signup-form {
  max-width: 50rem;
  background: #fff;
  margin: 5rem auto;
  text-align: left;
  padding: 3rem;
  padding-bottom: 5rem;
  margin-top: 15rem;
  border-radius: 8px;
  box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.17);
}
label {
  display: block;
  width: 100%;
  padding: 1.5rem;
  font-size: 2.3rem;
}
input {
  outline: none;
  font-size: 1.8rem;
  box-sizing: border-box;
  width: 95%;
  padding: 1rem;
  border: none;
  border-bottom: 1px solid var(--color-secondary);
  line-height: 2.3rem;
}
.sign-up-btn {
  display: block;
  margin-top: 5rem;
  width: 7rem;
  font-size: 2.3rem;
  transition: all 0.1s ease-in-out;
  line-height: 3.5rem;
}
.sign-up-btn:hover {
  background-color: #0e3365;
  transform: scale(1.1);
}
.register-btn {
  display: inline-block;
  border: none;
  background: none;
  color: var(--color-secondary);
  font-weight: bold;
  font-size: 1.8rem;
  border-bottom: 1px solid var(--color-secondary);
  padding: 0.3rem;
  cursor: pointer;
  line-height: 2.6rem;
  transition: all 0.1s ease-in-out;
}
.register-btn:hover {
  transform: scale(1.1);
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
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  border: 2px solid var(--color-secondary);
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.17);
}
.round:hover {
  transform: scale(1.2);
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
