<template>

<div class="container d-flex flex-column justify-content-end cart">

    <div class="date-style my-5">
        <span>目前油價區間: {{ recentDate }}</span>
    </div>
    <SidebarComponent v-if="showSidebar" :toggle="toggleSidebar" :cart="cart" :inventory="inventory"
        :remove="removeItem" />

    <div class="container">
        <div class="row d-flex g-3 justify-content-center align-items-stretch">
            <ShoppingCar v-for="(product, index) in inventory" :key="product.id" :index="index" :product="product"
                :addToCart="addToCart" />
        </div>
    </div>

    <div class="total-qty">
        <a>共計{{ totalQuantity }}公升</a>
        <button @click="toggleSidebar" class="top-bar-cart-link">購買清單</button>
    </div>


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
        this.$swal("請輸入數量");
        return;
      }
      if (!this.cart[gasoline]) this.cart[gasoline] = 0;
      this.cart[gasoline] = quantity;
      localStorage[gasoline] = this.cart[gasoline];
      this.$swal({ confirmButtonColor: "#084594", title: "已加入購物車" });
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

<style lang="scss" scoped>
@import 'bootstrap/scss/bootstrap';

.cart{
  min-height: 100vh;
}

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

.total-qty {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
}
.date-style {
  font-size: 2.2rem;
  font-weight: 500;
  font-style: italic;
  span{
  border-bottom: 5px solid var(--color-primary);

  }
}
.top-bar-cart-link:hover {
  background-color: #0e3365;
}
.loading {
  padding: 30rem;
  font-size: 3rem;
}
</style>
