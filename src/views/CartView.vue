<template>
  <div class="total-qty">
    <a>購買{{ totalQuantity }}公升</a>
    <button @click="toggleSidebar" class="top-bar-cart-link">購買清單</button>
  </div>
  <SidebarComponent
    v-if="showSidebar"
    :toggle="toggleSidebar"
    :cart="cart"
    :inventory="inventory"
    :remove="removeItem"
  />
  <div class="card-container">
    <!-- <div class="row">
      <div class="cell">
        <span>油價區間:</span> <span>{{ this.inventory[0].appliedDate }}</span>
      </div>
      <div class="cell"></div>
    </div> -->
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
      .then((res) => (this.inventory = res.data));
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
  border-radius: 1.5rem;
  color: white;
  margin: 1.5rem;
  font-size: 2.5rem;
  cursor: pointer;
}
.card-container {
  max-width: 100rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5rem;
}
.total-qty {
  padding-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
