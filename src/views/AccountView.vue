<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <h1>註冊</h1>
    <div class="round">
      <img class="logo" src="../assets/images/logo3.png" alt="" />
    </div>
    <label>姓名:</label>
    <input type="text" name="name" v-model="name" required />
    <label>Email:</label>
    <input type="email" name="email" v-model="email" required />
    <label>密碼:</label>
    <input
      type="password"
      name="password"
      v-model="password"
      @click="showRule = true"
      required
    />
    <p class="showRule" v-if="showRule">**密碼長度需至少8字元</p>

    <p class="err" v-if="error.length">
      <span class="material-icons"> warning </span>{{ error }}
    </p>
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
      showRule: false,
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
        this.$swal({
          confirmButtonColor: '#084594',
          title: '註冊成功！請登入',
        });
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
  padding: 1rem;
  width: 95%;
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
  display: flex;
  align-items: center;
}
.material-icon {
  font-size: 2rem;
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
.showRule {
  color: var(--color-secondary);
  font-weight: 700;
  text-align: left;
}
</style>
