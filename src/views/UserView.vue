<template>
<div class="user-page container mt-5">
    <div class="loading animate__animated animate__bounce animate__infinite" v-if="loading">載入中...</div>

    <div class="profile">
        <i class="bi bi-person-circle" v-if="!loading"></i>
        <p class="mt-3" v-if="!loading"><strong>{{ username }}</strong>，歡迎回來！</p>
    </div>

    <div class="row mt-5 flex align-items-center justify-content-center inventory-container" v-if="!loading">
        <h2 class="mb-5" v-if="!loading">未提取庫存</h2>
        <div class="row flex-lg-nowrap flex-wrap flex justify-content-center">
            <div class="inventory col-lg-3 col-10 col-md-5 flex-sm-fill py-5 flex-shrink-2">
                <i class="bi animate__animated animate__pulse animate__infinite bi-droplet mb-3"></i>
                <!-- 92無鉛汽油 -->
                <h2 class="gas-title">無鉛汽油</h2>
                <h3 class="actual-inventory">
                    {{ inventory[0].properties['92無鉛汽油'].liter }}
                </h3>
                 <p class="unit">公升</p>
                 <button class="btn btn-deduct">領用−</button>
                 <button class="btn btn-add">添購＋</button>
            </div>

            <div class="inventory col-lg-3 col-10 col-md-5 flex-fill py-5 flex-shrink-2">
                <i class="bi animate__animated animate__pulse animate__infinite bi-droplet mb-3"></i>
                <!-- 95無鉛汽油 -->
                <h2 class="gas-title">無鉛汽油:</h2>
                <h3 class="actual-inventory">
                    {{ inventory[0].properties['95無鉛汽油'].liter }}
                </h3>
                <p class="unit">公升</p>
                <button class="btn btn-deduct">領用−</button>
                <button class="btn btn-add">添購＋</button>
            </div>

            <div class="inventory col-lg-3 col-10 col-md-5 flex-fill py-5 flex-shrink-2">
                <i class="bi animate__animated animate__pulse animate__infinite bi-droplet mb-3"></i>
                <!-- 98無鉛汽油 -->
                <h2 class="gas-title">無鉛汽油</h2>
                <h3 class="actual-inventory">
                    {{ inventory[0].properties['98無鉛汽油'].liter }}
                </h3>
                <p class="unit">公升</p>
                <button class="btn btn-deduct">領用−</button>
                <button class="btn btn-add">添購＋</button>
            </div>

            <div class="inventory col-lg-3 col-10 col-md-5 flex-fill py-5 flex-shrink-2">
                <i class="bi animate__animated animate__pulse animate__infinite bi-droplet mb-3"></i>
                <!-- 超級柴油 -->
                <h2 class="gas-title">超級柴油</h2>
                <h3 class="actual-inventory">
                    {{ inventory[0].properties['高級柴油'].liter }}
                </h3>
                <p class="unit">公升</p>
                <button class="btn btn-deduct">領用−</button>
                <button class="btn btn-add">添購＋</button>
            </div>
        </div>
</div>

  </div>
  <div class="buttons" v-if="!loading">
    <button @click="handleOrder">歷史訂單</button>
  </div>

  <div class="container2" v-if="listOrder">
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
import 'animate.css';
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
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");

.user-page {
    min-height: 100vh;

    .inventory {
    margin: 1rem;
    border-radius: 2rem;
    box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.17);

    button {
    padding: 0 0.5rem;
    margin: 0.5rem;
    border: none;
    color: white;
    font-size:1.5rem ;
    border-radius: 1.5rem;

    &.btn-add{
        background-color: var(--color-button);
        &:hover {
        background-color: var(--color-button-hover);
        }
    }
      &.btn-deduct{
        background-color: #f28482;
        &:hover {
        background-color: #f28482c5;
        }
    }
  }


  &:hover{
    transition: all ease-out 0.3s;
    box-shadow:
    0px 0px 2.7px rgba(0, 0, 0, 0.042),
    0px 0px 7.5px rgba(0, 0, 0, 0.06),
    0px 0px 18.1px rgba(0, 0, 0, 0.078),
    0px 0px 60px rgba(0, 0, 0, 0.12)
    }

  i{
    font-size: 10rem;
    position: relative;
    display: block;
    color: #0e3365;
    &::after{
    font-size: 4rem;
    position: absolute;
    top: 50%;
    right: 0;
    width: 100%;
    height: 100% ;
    }
  }
    &:nth-child(1){
      i::after{
        content:"92";
      }
    }
    &:nth-child(2){
      i::after{
        content:"95";
      }
    }
    &:nth-child(3){
      i::after{
        content:"98";
      }
    }
    &:nth-child(4){
      i::after{
        content:"柴";
      }
    }
  }

  .profile i {
    font-size: 10rem;
    color: #0e3365;
  }

  h2 {
    font-size: 4rem;
  }
}



.unit {
  font-size: 2.3rem;
}
.actual-inventory {
  font-size: 6rem;
}


.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10rem;
}



.container2 {
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
  background-image: url("https://images.unsplash.com/photo-1550482768-88b710a445fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80");
  margin: 0 auto;
}
.order-info {
  margin-right: 0.5rem;
}
.order {
  display: flex;
  flex-wrap: wrap;
}
.loading {
  padding: 30rem;
  font-size: 3rem;
}

</style>
