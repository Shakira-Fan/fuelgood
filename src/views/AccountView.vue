<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <h1>註冊會員</h1>
    <div class="round">
      <img class="logo" src="../assets/images/wels.svg" alt="" />
    </div>
    <label>姓名:</label>
    <input type="text" name="name" v-model="name" required />
    <label>Email:</label>
    <input type="email" name="email" v-model="email" required />
    <label>密碼:</label>
    <input type="password" name="password" v-model="password" required />

    <p class="err" v-if="error.length">{{ error }}</p>
    <button class="sign-up-btn">註冊</button>

    <div class="alternative">
      <span>已經有帳號了嗎?</span>
      <button class="register-btn" @click="handleClick">立刻登入!</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      error: '',
    };
  },

  methods: {
    async handleGoogleAuth() {
      try {
        const res = await axios.get(
          'https://fuel-good.herokuapp.com/auth/google'
        );
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        }
      }
    },
    async handleSubmit() {
      try {
        const res = await axios.post(
          'https://fuel-good.herokuapp.com/auth/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
          }
        );
        alert('Account created! Please sign in');
        this.$router.push('/login');
      } catch (err) {
        if (err.response) {
          this.error = err.response.data;
          this.name = '';
          this.email = '';
          this.password = '';
        } else {
          this.error = err.message;
        }
      }
    },
    async handleClick() {
      await this.$router.push('/login');
      window.location.reload();
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
  border-bottom: 2px solid var(--color-grey);
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
  background-color: var(--color-grey);
  margin: 2rem auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
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
