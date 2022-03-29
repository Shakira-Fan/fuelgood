<template>
  <p v-if="error.length">{{ error }}</p>
  <form class="signup-form" @submit.prevent="handleLogin">
    <h1>登入會員</h1>
    <div class="round" @click="handleGoogleAuth">
      <div class="icon">G</div>
    </div>
    <label>Email:</label>
    <input type="text" name="email" v-model="email" required />
    <label>密碼:</label>
    <input type="password" name="password" v-model="password" required />
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
  },
  methods: {
    handleLogin() {
      (async () => {
        try {
          const res = await fetch(
            'https://fuel-good.herokuapp.com/auth/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
              body: JSON.stringify({
                email: this.email,
                password: this.password,
              }),
            }
          );
          const data = await res.json();
          console.log(data);
          this.user.push(data);
          console.log(this.user);
          localStorage.setItem('token', data.token);
          this.$router.push('/user' + '/' + data.user._id);
        } catch (err) {
          this.error = err.message;
          console.log(err.message);
        }
        console.log(this.email, this.password);
      })();
    },
  },
};
</script>

<style scoped>
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
</style>
