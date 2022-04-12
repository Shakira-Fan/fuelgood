<template>
  <div class="cart-container" v-if="Object.keys(cart).length">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">產品</th>
          <th scope="col">價格</th>
          <th scope="col">數量</th>
          <th scope="col">小計</th>
          <th><span class="sr-only">刪除</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quantity, key, i) in cart" :key="i">
          <th scope="row">{{ key }}</th>
          <td>{{ getPrice(key) }}</td>
          <td>{{ quantity }}</td>
          <td>{{ (quantity * getPrice(key)).toFixed(2) }}</td>
          <td>
            <button @click="remove(key)" class="btn btn-light cart-remove">
              &times;
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="spread">
      <span>共計 {{ calculateTotal() }} 元整</span>
      <router-link :to="'/create-order'" :calculateTotal="calculateTotal">
        <button class="confirm-btn">確定訂單</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['toggle', 'cart', 'inventory', 'remove'],
  methods: {
    getPrice(gasoline) {
      const product = this.inventory.find(p => {
        return p.gasoline === gasoline;
      });
      return product.price;
    },
    calculateTotal() {
      //[key,value]
      const total = Object.entries(this.cart).reduce((acc, curr) => {
        return acc + curr[1] * this.getPrice(curr[0]);
      }, 0);
      localStorage.total = total.toFixed(2);
      return total.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/bootstrap';

.spread {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 10px 0 10px;
  margin-top: 2rem;
}
.cart-remove {
  background-color: var(--color-primary);
  border-radius: 1rem;
  font-size: 2rem;
  line-height: 2rem;
  text-align: center;
  padding: 0.5rem 1rem;
}
.confirm-btn {
  background-color: var(--color-primary);
  padding: 0.5rem;
  border: none;
  border-radius: 1rem;
  margin-top: 2rem;
}
</style>
