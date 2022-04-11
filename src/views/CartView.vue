<template>
  <div class="total-qty">
    <a>購買{{ totalQuantity }}公升</a>
    <button @click="toggleSidebar" class="top-bar-cart-link">購買清單</button>
  </div>
  <div class="date-style">
    <span>油價區間:</span> <span>{{ recentDate }}</span>
  </div>
  <SidebarComponent
    v-if="showSidebar"
    :toggle="toggleSidebar"
    :cart="cart"
    :inventory="inventory"
    :remove="removeItem"
  />
  <div class="card-container">
    <ShoppingCar
      v-for="(product, index) in inventory"
      :key="product.id"
      class="card"
      :index="index"
      :product="product"
      :addToCart="addToCart"
    />
  </div>
</template>

<script>
import ShoppingCar from "@/components/ShoppingCar.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import axios from "axios";

export default {
  data() {
    return {
      inventory: [],
      cart: {},
      showSidebar: false,
      recentDate: "",
    };
  },
  components: {
    ShoppingCar,
    SidebarComponent,
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cart).reduce((a, b) => a + b, 0);
    },
  },
  methods: {
    addToCart(gasoline, quantity) {
      if (!quantity) {
        alert("請輸入數量");
        return;
      }
      if (!this.cart[gasoline]) this.cart[gasoline] = 0;
      this.cart[gasoline] = quantity;
      localStorage[gasoline] = this.cart[gasoline];
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    removeItem(gasoline) {
      delete this.cart[gasoline];
      localStorage[gasoline] = 0;
    },
  },
  mounted() {
    axios
      .get(`https://fuel-good.herokuapp.com/crawler/price/recent/`)
      .then((res) => {
        this.inventory = res.data;
        this.recentDate = res.data[0].appliedDate;
      });
  },
};
</script>

<style scoped>
div a {
  font-size: 2.5rem;
  text-decoration: none;
}
div button {
  background: var(--color-secondary);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  color: #fff;
  margin: 1.5rem;
  font-size: 2rem;
  cursor: pointer;
}
.card-container {
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10rem;
}
.total-qty {
  padding-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8rem;
}
.date-style {
  margin-top: 3rem;
  font-size: 2.2rem;
  font-weight: 500;
  font-style: italic;
}
.top-bar-cart-link:hover {
  background-color: #0e3365;
}
.loading {
  padding: 30rem;
  font-size: 3rem;
}
</style>
