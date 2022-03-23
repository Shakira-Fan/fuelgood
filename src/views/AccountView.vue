<template>
  <form class="signup-form" v-if="account">
    <h1>登入</h1>
    <div class="round">
      <div class="icon">G</div>
    </div>
    <label>Email:</label>
    <input type="text" name="email" required />
    <label>Password:</label>
    <input type="password" name="password" required />
    <button class="sign-up-btn">Log in</button>

    <div class="alternative">
      <span>Do not have an account yet?</span>
      <button class="register-btn" @click="account = false">
        Sign Up Now!
      </button>
    </div>
  </form>

  <form class="signup-form" v-if="!account">
    <h1>註冊</h1>
    <div class="round">
      <div class="icon">G</div>
    </div>
    <label>Username:</label>
    <input type="text" name="name" required />
    <label>Email:</label>
    <input type="email" name="password" required />
    <label>Password:</label>
    <input type="password" name="password" required />
    <button class="sign-up-btn">Sign up Now!</button>
    <div class="alternative">
      <span>Already have an account?</span>
      <button class="register-btn" @click="account = true">Log in Now!</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      account: true,
    };
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
  margin: 5rem auto;
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
  margin-top: 2rem;
  border-bottom: 1px solid var(--color-primary);
  padding: 0.3rem;
  cursor: pointer;
}
span {
  font-size: 1.8rem;
  margin-right: 1rem;
}
.alternative {
  margin-top: 10rem;
  font-weight: bold;
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
