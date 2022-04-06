<template>
  <div>
    <i class="icofont-cart-alt icofont-1x"></i>
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
  font-size: 22px;
  text-decoration: none;
}
div button {
  background: #008e89;
  color: white;
  margin: 1.5rem;
  font-size: 18px;
  cursor: pointer;
}
.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5rem;
}
</style>
