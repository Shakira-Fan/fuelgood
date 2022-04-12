<template>
  <div class="user-page container">
    <div
      class="loading animate__animated animate__bounce animate__infinite"
      v-if="loading"
    >
      載入中...
    </div>

    <div>
      <ul v-if="!loading" id="navbar-example2" class="nav-container">
        <li class="nav-item">
          <a class="nav-link" @click="handleOrder" href="#order">歷史訂單</a>
        </li>
        <li class="nav-item">
          <a
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            class="nav-link"
            @click="handleQr"
            href="#scrollspyHeading2"
            >領用汽油</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click="$router.push('/cart')"
            href="#scrollspyHeading2"
            >添購汽油</a
          >
        </li>
      </ul>
    </div>

    <div class="row flex justify-content-center align-items-center">
      <div class="profile">
        <i class="bi bi-person-circle" v-if="!loading"></i>
        <p class="mt-3" v-if="!loading">
          <strong>{{ username }}</strong
          >，歡迎回來！
        </p>
      </div>

      <div
        class="row m-5 flex align-items-center justify-content-center inventory-container"
        v-if="!loading"
      >
        <h2 class="mb-5" v-if="!loading">未提取庫存</h2>
        <div class="row flex-lg-nowrap flex-wrap flex justify-content-center">
          <div
            class="inventory col-lg-3 col-10 col-md-5 flex-fill py-5 flex-shrink-2"
          >
            <i
              class="bi animate__animated animate__pulse animate__infinite bi-droplet mb-3"
            ></i>
            <!-- 92無鉛汽油 -->
            <h2 class="gas-title">無鉛汽油</h2>
            <h3 class="actual-inventory">
              {{ inventory[0].properties['92無鉛汽油'].liter }}
            </h3>
            <p class="unit">公升</p>
            <button
              class="btn btn-deduct"
              @click="handleQr"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              領用−
            </button>
            <button class="btn btn-add" @click="$router.push('/cart')">
              添購＋
            </button>
          </div>

          <div
            class="inventory col-lg-3 col-10 col-md-5 flex-fill py-5 flex-shrink-2"
          >
            <i
              class="bi animate__animated animate__pulse animate__infinite bi-droplet mb-3"
            ></i>
            <!-- 95無鉛汽油 -->
            <h2 class="gas-title">無鉛汽油:</h2>
            <h3 class="actual-inventory">
              {{ inventory[0].properties['95無鉛汽油'].liter }}
            </h3>
            <p class="unit">公升</p>
            <button
              class="btn btn-deduct"
              @click="handleQr"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              領用−
            </button>
            <button class="btn btn-add" @click="$router.push('/cart')">
              添購＋
            </button>
          </div>

          <div
            class="inventory col-lg-3 col-10 col-md-5 flex-fill py-5 flex-shrink-2"
          >
            <i
              class="bi animate__animated animate__pulse animate__infinite bi-droplet mb-3"
            ></i>
            <!-- 98無鉛汽油 -->
            <h2 class="gas-title">無鉛汽油</h2>
            <h3 class="actual-inventory">
              {{ inventory[0].properties['98無鉛汽油'].liter }}
            </h3>
            <p class="unit">公升</p>
            <button
              class="btn btn-deduct"
              @click="handleQr"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              領用−
            </button>
            <button class="btn btn-add" @click="$router.push('/cart')">
              添購＋
            </button>
          </div>

          <div
            class="inventory col-lg-3 col-10 col-md-5 flex-fill py-5 flex-shrink-2"
          >
            <i
              class="bi animate__animated animate__pulse animate__infinite bi-droplet mb-3"
            ></i>
            <!-- 超級柴油 -->
            <h2 class="gas-title">超級柴油</h2>
            <h3 class="actual-inventory">
              {{ inventory[0].properties['高級柴油'].liter }}
            </h3>
            <p class="unit">公升</p>
            <button
              class="btn btn-deduct"
              @click="handleQr"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              領用−
            </button>
            <button class="btn btn-add" @click="$router.push('/cart')">
              添購＋
            </button>
          </div>
        </div>
      </div>

      <div class="container order-table p-3 m-5" v-if="listOrder">
        <div class="row">
          <h2 class="m-5" v-if="listOrder" id="order">歷史訂單</h2>
          <div class="col">
            <table class="table table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col"># No.</th>
                  <th scope="col">92無鉛汽油</th>
                  <th scope="col">95無鉛汽油</th>
                  <th scope="col">98無鉛汽油</th>
                  <th scope="col">高級柴油</th>
                  <th class="date-hidden" scope="col">購買日期</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders.flat()" :key="order.email">
                  <th scope="row">{{ order.orderNumber }}</th>
                  <td>{{ order.orders['92無鉛汽油'].liter }}</td>
                  <td>{{ order.orders['95無鉛汽油'].liter }}</td>
                  <td>{{ order.orders['98無鉛汽油'].liter }}</td>
                  <td>{{ order.orders['高級柴油'].liter }}</td>
                  <td class="date-hidden">{{ localDate(order.date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
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
      return moment.utc(utcDate).local().format('YYYY/MM/DD,HH:mm');
    },
    handleQr() {
      this.$swal({
        title: '領用汽油',
        imageUrl: require('../assets/images/qr-code.png'),
        imageWidth: 400,
        imageAlt: 'Custom image',
        confirmButtonColor: '#084594',
      });
    },
    handleOrder() {
      this.listOrder = true;
    },
  },
  async created() {
    this.loading = true;
    if (this.user[0].name !== null) {
      //Get historic orders
      try {
        const res = await axios.get(
          `https://fuel-good.herokuapp.com/order/${this.user[0].user.email}`
        );
        console.log(res.data);
        if (!this.orders.length) {
          await this.orders.push(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }

      // Get inventories
      try {
        const res2 = await axios.get(
          `https://fuel-good.herokuapp.com/admin/user/${this.user[0].user.email}`
        );
        console.log(res2);
        if (!this.inventory.length) {
          this.inventory.push(res2.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/bootstrap';
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css');

.user-page {
  min-height: 100vh;
  margin-top: 5rem;

  ul {
    list-style-type: none;
    display: flex;
    justify-content: end;
    li a {
      color: #0e3365;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .inventory {
    margin: 1rem;
    border-radius: 2rem;
    box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.17);

    button {
      padding: 0 0.5rem;
      margin: 0.5rem;
      border: none;
      color: white;
      font-size: 1.5rem;
      border-radius: 1.5rem;

      &.btn-add {
        background-color: var(--color-button);
        &:hover {
          background-color: var(--color-button-hover);
        }
      }
      &.btn-deduct {
        background-color: #f28482;
        &:hover {
          background-color: #f28482c5;
        }
      }
    }

    &:hover {
      transition: all ease-out 0.3s;
      box-shadow: 0px 0px 2.7px rgba(0, 0, 0, 0.042),
        0px 0px 7.5px rgba(0, 0, 0, 0.06), 0px 0px 18.1px rgba(0, 0, 0, 0.078),
        0px 0px 60px rgba(0, 0, 0, 0.12);
    }

    i {
      font-size: 10rem;
      position: relative;
      display: block;
      color: #0e3365;
      &::after {
        font-size: 4rem;
        position: absolute;
        top: 50%;
        right: 0;
        width: 100%;
        height: 100%;
      }
    }
    &:nth-child(1) {
      i::after {
        content: '92';
      }
    }
    &:nth-child(2) {
      i::after {
        content: '95';
      }
    }
    &:nth-child(3) {
      i::after {
        content: '98';
      }
    }
    &:nth-child(4) {
      i::after {
        content: '柴';
      }
    }
  }

  .profile i {
    font-size: 10rem;
    color: #0e3365;
  }

  .modal.fade {
    border: none;
    border-radius: 1.5rem;
  }
}

h2 {
  font-size: 4rem;
}

.unit {
  font-size: 2.3rem;
}
.actual-inventory {
  font-size: 6rem;
}

.container.order-table {
  border-radius: 2rem;
  box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.17);
}
.qr-container {
  max-width: 80rem;
  padding: 2rem;
  border-radius: 1rem;
  margin: 3rem auto;
  padding-bottom: 8rem;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
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

.nav-item {
  margin-top: 4rem;
  padding: 2rem 0;
}

@media only screen and (max-width: 31.25em) {
  .order-table {
    font-size: 1.8rem;
  }
  .date-hidden {
    display: none;
  }
  .nav-container {
    padding-top: 2rem;
    font-size: 1.7rem;
  }
}
</style>
