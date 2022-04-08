<template>
  <div>
    <div class="loading" v-if="loading">載入中...</div>
    <p v-if="!loading">歡迎回來, {{ username }}!</p>

    <h2 v-if="!loading">目前未提取的數量</h2>
    <div class="inventory-container" v-if="!loading">
      <div class="inventory">
        <div class="gas-title">92無鉛汽油:</div>
        <div class="actual-inventory">
          {{ inventory[0].properties['92無鉛汽油'].liter }}
          <span class="unit">公升</span>
        </div>
      </div>

      <div class="inventory">
        <div class="gas-title">95無鉛汽油:</div>
        <div class="actual-inventory">
          {{ inventory[0].properties['95無鉛汽油'].liter }}
          <span class="unit">公升</span>
        </div>
      </div>

      <div class="inventory">
        <div class="gas-title">98無鉛汽油:</div>
        <div class="actual-inventory">
          {{ inventory[0].properties['98無鉛汽油'].liter }}
          <span class="unit">公升</span>
        </div>
      </div>

      <div class="inventory">
        <div class="gas-title">超級柴油:</div>
        <div class="actual-inventory">
          {{ inventory[0].properties['高級柴油'].liter }}
          <span class="unit">公升</span>
        </div>
      </div>
    </div>
  </div>
  <div class="buttons" v-if="!loading">
    <button @click="handleQr">我要取貨</button>
    <button @click="handleOrder">歷史訂單</button>
    <button @click="$router.push('/cart')">我要購買</button>
  </div>

  <div class="container" v-if="listOrder">
    <h2 v-if="listOrder">歷史訂單</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">92</th>
          <th scope="col">95</th>
          <th scope="col">98</th>
          <th scope="col">柴油</th>
          <th scope="col">日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders.flat()" :key="order.email">
          <th scope="row">{{ order.orderNumber }}</th>
          <td>{{ order.orders['92無鉛汽油'].liter }}</td>
          <td>{{ order.orders['95無鉛汽油'].liter }}</td>
          <td>{{ order.orders['98無鉛汽油'].liter }}</td>
          <td>{{ order.orders['高級柴油'].liter }}</td>
          <td>{{ localDate(order.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="qr-container" v-if="qr">
    <p>請於時效內，出示QR code 提取汽油</p>
    <div class="img"></div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  data() {
    return {
      qr: false,
      loading: true,
      listOrder: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    logIn() {
      return this.$store.state.logIn;
    },
    email() {
      return this.$store.state.email;
    },
    username() {
      return this.$store.state.username;
    },
    orders() {
      return this.$store.state.orders;
    },
    inventory() {
      return this.$store.state.inventory;
    },
  },
  methods: {
    localDate(utcDate) {
      return moment.utc(utcDate).local().format('YYYY-MM-DD,h:mm:ss a');
    },
    handleQr() {
      this.qr = !this.qr;
    },
    handleOrder() {
      this.listOrder = !this.listOrder;
    },
  },
  async created() {
    this.loading = true;
    const res = await axios.get('https://fuel-good.herokuapp.com/order/all');
    console.log(res);
    if (!this.orders.length) {
      await this.orders.push(
        res.data.filter(order => {
          return order.email === localStorage.getItem('email');
        })
      );
    }

    const res2 = await axios.get(
      `https://fuel-good.herokuapp.com/admin/user/${this.email}`
    );
    console.log(res2);

    if (!this.inventory.length) {
      this.inventory.push(res2.data);
    }
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/bootstrap';
p {
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 5rem;
  padding: 3rem;
  font-style: italic;
}
h2 {
  font-size: 2.5rem;
  font-weight: 300;
  width: 30rem;
  padding: 1rem;
  background-color: var(--color-secondary);
  color: #fff;
  font-weight: 700;
  border-radius: 1rem;
  margin: 1rem auto;
}
.inventory-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 60rem;
  padding: 2rem;
  margin: 1rem auto;
}
.inventory {
  max-width: 30rem;
  max-height: 30rem;
  margin: 1rem;
  padding: 3rem;
  background-color: var(--color-grey);
  border-radius: 2rem;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
}
.unit {
  font-size: 2.3rem;
}
.actual-inventory {
  font-size: 6rem;
}
.gas-title {
  font-size: 2.5rem;
  padding-bottom: 3rem;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10rem;
}
button {
  font-size: 2.5rem;
  padding: 1rem;
  border-radius: 1rem;
  border-color: none;
  margin: 2rem;
  cursor: pointer;
  background-color: var(--color-secondary);
  color: #fff;
}
button:hover {
  background-color: #0e3365;
}

.container {
  max-width: 80rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  margin: 3rem auto;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
}
.qr-container {
  max-width: 80rem;
  padding: 2rem;
  border-radius: 1rem;
  margin: 3rem auto;
  padding-bottom: 8rem;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
}
.img {
  width: 10rem;
  height: 10rem;
  background-image: url('https://images.unsplash.com/photo-1550482768-88b710a445fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');
  margin: 0 auto;
}
.order-info {
  margin-right: 0.5rem;
}
.order {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}
.loading {
  padding: 30rem;
  font-size: 3rem;
}
</style>
