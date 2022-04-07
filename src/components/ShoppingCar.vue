<template>
  <div class="card">
    <div class="card-title">{{ product.gasoline }}</div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="cell">
            <label>售價:</label>
          </div>
          <div class="cell">${{ product.price }}</div>
        </div>
        <div class="row">
          <div class="cell">
            <label>數量:</label>
          </div>
          <div class="cell">
            <input class="qty-input" type="number" v-model.number="quantity" />
          </div>
          <span class="cell">公升</span>
        </div>
      </form>
    </div>
    <div class="card-footer">
      <button
        @click="addToCart(product.gasoline, quantity)"
        class="btn btn-light"
      >
        加入購物車
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'index', 'addToCart'],
  created() {
    localStorage[this.product.gasoline] = 0;
  },
  methods: {
    quantity() {
      return localStorage[this.product.gasoline];
    },
  },
};
</script>

<style>
.card {
  display: inline-block;
  max-width: 31rem;
  background: var(--color-grey);
  box-shadow: 1px 2px 5px solid #000;

  margin-bottom: 20px;
  color: #280d14;
  margin: 10px;
  border-radius: 20px;
}

.card-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  background-color: var(--color-primary);
  padding: 10px;
  font-size: 22px;
  font-weight: bold;
  border-radius: 10px 10px 0 0;
}
.card-body {
  border-top: 0px;
  border-bottom: 0px;
  text-align: center;
  padding: 2rem;
}
.row {
  display: flex;
}
.card-body .cell:first-of-type {
  justify-content: center;
  width: 20%;
}
.card-body .cell {
  align-items: center;
  width: 50%;
  min-height: 2em;
  padding: 3px 4px;
}
.cell {
  display: inline-flex;
}
.cell input {
  font-size: 20px;
  width: 100%;
}
.cell span {
  font-size: 20px;
  font-weight: bold;
}
.card-body label:first-of-type {
  margin-top: 0px;
}
.card-body label {
  display: inline-block;
  font-weight: bold;
}
.card-footer {
  background-color: var(--color-secondary);
  margin-top: 15px;
  padding: 1.2rem;
  text-align: right;
  border-radius: 0 0 10px 10px;
}
.btn-light {
  background: #fff8ea;
  background-color: var(--color-primary);
  color: #000;
  padding: 0.5rem;
}
button {
  border: 0px;
  border-radius: 1rem;
  padding: 5px 12px;
  font-weight: bold;
  vertical-align: middle;
  font-size: 1.8rem;
  cursor: pointer;
}
button:hover {
  background-color: #fac609;
}
.qty-input {
  border: none;
  background-color: #fff;
  padding: 0.2rem;
  border-radius: 1.2rem;
  box-shadow: 1px 2px 5px rgb(211, 204, 204);
}
</style>
