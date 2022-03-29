<template>
  <aside class="cart-container">
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          購買清單
          <i class="icofont-cart-alt icofont-1x"></i>
        </span>
        <button @click="toggle" class="cart-close">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table">
          <thead>
            <tr>
              <th>產品</th>
              <th>價格</th>
              <th>數量</th>
              <th>小計</th>
              <th><span class="sr-only">刪除</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(quantity, key, i) in cart" :key="i">
              <td>{{ key }}</td>
              <td>${{ getPrice(key) }}</td>
              <td class="center">{{ quantity }}</td>
              <td>${{ (quantity * getPrice(key)).toFixed(2) }}</td>
              <td class="center">
                <button @click="remove(key)" class="btn btn-light cart-remove">
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" v-if="!Object.keys(cart).length">
          <em>購物車內沒有商品～～～</em>
        </p>
        <div class="spread">
          <span><strong>總計:</strong>${{ calculateTotal() }}</span>
          <button class="btn btn-light">結帳</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: ["toggle", "cart", "inventory", "remove"],
  methods: {
    getPrice(name) {
      const product = this.inventory.find((p) => {
        return p.name === name;
      });
      return product.price.NTD;
    },
    calculateTotal() {
      //[key,value]
      const total = Object.entries(this.cart).reduce((acc, curr) => {
        return acc + curr[1] * this.getPrice(curr[0]);
      }, 0);
      return total.toFixed(2);
    },
  },
};
</script>

<style scope>
.cart-container,
.cart {
  top: 55px;
  right: 0px;
  width: 410px;
  height: 60%;
}
.cart-container {
  position: fixed;
  overflow: hidden;
}
.cart {
  position: relative;
  background: #084594;
  color: #fff8ea;
  transition: 1s ease right;
}

.cart-title {
  align-items: center;
  min-height: 49px;
  max-height: 49px;
  background: #335;
  border-bottom: 1px solid #fff8ea;
  padding: 0px 15px;
  font-size: 26px;
}
.cart-table {
  width: 398px;
  border-collapse: collapse;
  margin: 5px;
  font-size: 18px;
  justify-content: space-between;
}
.spread {
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
}
.cart-close {
  background: transparent;
  border: 0px;
  border-radius: 3px;
  padding: 0px 13px;
  color: #fcf5d8;
  font-size: 32px;
  font-weight: bold;
}
.cart-close:hover {
  background: rgb(28, 28, 46);
}
</style>