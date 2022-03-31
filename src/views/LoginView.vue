<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <h1>登入會員</h1>
    <div class="round">
      <img class="logo" src="../assets/images/wels.svg" alt="" />
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
        console.log(res);
        this.user.push(res);
        console.log(this.user);
        // localStorage.setItem('token', res.data.token);
        localStorage.setItem('token', JSON.stringify(this.user[0].data));
        localStorage.setItem('name', this.user[0].data.user.name);
        this.$router.push('/user' + '/' + res.data.user._id);
        this.$store.commit('updateLogIn', true);
        this.$store.commit('updateName', localStorage.getItem('name'));
      } catch (err) {
        if (err.response) {
          this.error = err.response.data;
          this.email = '';
          this.password = '';
        } else {
          // throw new Error('Invalid email or password');
          this.error = err.message;
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
  border-radius: 8px;
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
  background-color: var(--color-primary);
}
.round {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: #eee;
  margin: 2rem auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
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
