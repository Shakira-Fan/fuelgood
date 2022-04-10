<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <h1>註冊會員</h1>
    <div class="round">
      <img class="logo" src="../assets/images/logo3.png" alt="" />
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
        alert('註冊成功！請登入');
        this.$router.push('/login');
      } catch (err) {
        if (err.response) {
          if (
            err.response.data ===
            '"password" length must be at least 8 characters long'
          ) {
            this.error = '密碼長度需至少8字元';
            this.password = '';
          } else if (
            err.response.data === 'Email has already been registered.'
          ) {
            this.error = 'Email已被註冊過';
            this.password = '';
            this.name = '';
            this.email = '';
          }
        } else {
          this.error = err.message;
        }
      }
    },
    async handleClick() {
      await this.$router.push('/login');
      this.$router.go();
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
  border-bottom: 2px solid var(--color-grey);
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
