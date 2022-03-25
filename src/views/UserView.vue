<template>
  <p>Hi, Welcome Back, {{ user[0].user.name }}</p>
  <div>
    <div class="inventory-container">
      <h2>您尚未提取的數量有:</h2>
      <div class="inventory">
        <div>92</div>
        <div class="progress-bar">
          <div class="blue"></div>
        </div>
      </div>

      <div class="inventory">
        <div>95</div>
        <div class="progress-bar">
          <div class="blue"></div>
        </div>
      </div>

      <div class="inventory">
        <div>98</div>
        <div class="progress-bar">
          <div class="blue"></div>
        </div>
      </div>

      <div class="inventory">
        <div>超級柴油</div>
        <div class="progress-bar">
          <div class="blue"></div>
        </div>
      </div>
      <div class="buttons">
        <button>我要取貨</button>
        <button>歷史訂單</button>
      </div>
    </div>
  </div>

  <div class="container">
    <h2>歷史訂單</h2>
  </div>
  <div class="container">
    <h2>產出會員QR CODE</h2>
    <p>請於時效內，出示QR code 提取汽油</p>

    <div class="img">
      <!-- <img src="" alt="qrcode" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
p {
  margin: 2rem;
  padding: 3rem;
}
.inventory-container {
  max-width: 120rem;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  margin: 3rem auto;
  background-color: #eee;
}
.inventory {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}
.progress-bar {
  width: 80%;
  height: 4rem;
  background-color: var(--color-secondary);
}
.blue {
  background-color: var(--color-primary);
  width: 75%;
  height: 4rem;
}
.buttons {
  display: flex;
  justify-content: space-around;
}
button {
  font-size: 3rem;
  padding: 1rem;
  border-radius: 1rem;
  border: none;
  margin-top: 5rem;
  cursor: pointer;
  background-color: var(--color-primary);
}
button:hover {
  background-color: var(--color-primary);
}

.container {
  max-width: 120rem;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  margin: 3rem auto;
  background-color: #eee;
}
.img {
  width: 10rem;
  height: 10rem;
  background-image: url('https://images.unsplash.com/photo-1550482768-88b710a445fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');
  margin: 0 auto;
}
</style>
