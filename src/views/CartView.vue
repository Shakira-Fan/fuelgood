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
import fuel from "../fuel.json";

export default {
  data() {
    return {
      inventory: fuel,
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
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    },
  },
  methods: {
    addToCart(name, quantity) {
      if (!this.cart[name]) this.cart[name] = 0;
      this.cart[name] += quantity;
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    removeItem(name) {
      delete this.cart[name];
    },
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
  flex-wrap: wrap;
  padding: 5rem;
}
</style>
