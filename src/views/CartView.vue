<template>

<div class="container d-flex flex-column align-items-center justify-content-end cart">

    <div class="date-style my-5">
        <span>目前油價區間: {{ recentDate }}</span>
    </div>
    <SidebarComponent v-if="showSidebar" :toggle="toggleSidebar" :cart="cart" :inventory="inventory"
        :remove="removeItem" />

    <div class="container mb-5">
        <div class="row d-flex g-3 justify-content-center align-items-stretch">
            <ShoppingCar v-for="(product, index) in inventory" :key="product.id" :index="index" :product="product"
                :addToCart="addToCart" />
        </div>
    </div>


    <div class="total-qty d-flex mb-5 flex-column col-6">
      <ul class="d-flex flex-column align-items-center">
        <li>共計 <span class="total">{{ totalQuantity }}</span> 公升</li>
        <li>共計 <span class="total">{{ totalQuantity }}</span> 元整</li>
      </ul>
      <div class="col d-flex justify-content-center">
        <button class="btn mb-3 btn-confirm">確定訂單</button>
        <button class="btn mb-3 btn-cancel">放棄訂單</button>
      </div>
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

.total-qty{
  text-align: center;
  li{
    font-size: 2rem;
    color: black;
    list-style-type: none;

  }
  .total{
    font-size: 3rem;
    color: red;
    
  }
}

button {
    padding: 0 0.5rem;
    margin: 0.5rem;
    font-size: 2rem !important;
    border-radius: 1.5rem !important;
    background-color: var(--color-primary) !important;
    border: 2px solid white !important;

    &.btn-confirm{
      &:hover{
      border: 2px solid var(--color-secondary) !important;
      color: var(--color-secondary);
      }
    }

    &.btn-cancel{
      &:hover{
      border: 2px solid red !important;
      color: red;
      }
    }
   }


.date-style {
  font-size: 3rem;
  font-weight: 500;
  font-style: italic;
  span{
  border-bottom: 5px solid var(--color-primary);

  }
}

.loading {
  padding: 30rem;
  font-size: 3rem;
}
</style>
