<template>
  <div class="card">
    <div class="card-title">{{ product.name }}</div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="cell">
            <label>種類:</label>
          </div>
          <div class="cell">
            <em>{{ product.type }}</em>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>售價:</label>
          </div>
          <div class="cell">${{ product.price.NTD }}</div>
        </div>
        <div class="row">
          <div class="cell">
            <label>數量:</label>
          </div>
          <div class="cell">
            <input type="number" v-model.number="quantity" />
          </div>
          <span class="cell">公升</span>
        </div>
      </form>
    </div>
    <div class="card-footer">
      <button @click="addToCart(product.name, quantity)" class="btn btn-light">
        加入購物車
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'index', 'addToCart'],
  data() {
    return {
      quantity: 0,
    };
  },
};
</script>

<style>
.card {
  display: inline-block;
  width: 300px;
  background: #faf2c3;
  margin-bottom: 20px;
  color: #280d14;
  margin: 10px;
  border-radius: 20px;
}

.card-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 93%;
  background: #ffd32d;
  padding: 10px;
  font-size: 22px;
  font-weight: bold;
  border-radius: 10px 10px 0 0;
}
.card-body {
  border: 1px solid #f6e57b;
  border-top: 0px;
  border-bottom: 0px;
  text-align: center;
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
  background: #088682;
  margin-top: 15px;
  padding: 10px;
  text-align: right;
  border-radius: 0 0 10px 10px;
}
.btn-light {
  background: #fff8ea;
  color: #79a206;
}
button {
  border: 0px;
  border-radius: 3px;
  padding: 5px 12px;
  font-weight: bold;
  vertical-align: middle;
  font-size: medium;
  cursor: pointer;
}
</style>
