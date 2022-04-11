<template>
  <div class="col-10 col-sm-6 com-md-5 col-lg-3">
    <div class="card h-100">
        <div class="card-title pt-5">
            <i class="bi bi-droplet-half"></i>
            {{ product.gasoline }}
        </div>
        <div class="card-body">
            <form>
                <h3 class="py-3 animate__animated animate__pulse animate__infinite animate__slow ">${{ product.price }}</h3>
                <span><input class="qty-input py-2" type="number" v-model.number="quantity" /> 公升</span>
            </form>
            <button @click="addToCart(product.gasoline, quantity)" class="btn my-5">
                加入汽油桶
          </button>
        </div>
        
    </div>
  </div>

</template>

<script>
import "animate.css";
export default {
  props: ["product", "index", "addToCart"],
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

<style lang="scss" scoped>
@import 'bootstrap/scss/bootstrap';



.card {
  
  border-radius: 1.5rem;
  box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.17);
  border: none;
  .card-title {
    font-size: 3rem;
  }
  .qty-input {
  border: 2px solid white;
  padding: 0.2rem;
  border-radius: 1rem;
  box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.17);
  width: 30%;
  &:hover{
      border: 2px solid var(--color-primary);
    }
  }

  h3{
    font-size: 5rem;
    color: red;
  }

  &:hover{
  transition: all ease-out 0.3s;
  box-shadow:
  0px 0px 2.7px rgba(0, 0, 0, 0.042),
  0px 0px 7.5px rgba(0, 0, 0, 0.06),
  0px 0px 18.1px rgba(0, 0, 0, 0.078),
  0px 0px 60px rgba(0, 0, 0, 0.12)
  }


}
button {
  background-color: #fac609 !important;
  color: #000;
  padding: 0.5rem;
  border: 0px;
  border-radius: 1.5rem !important;
  padding: 5px 12px;
  font-size: 1.8rem;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
  transition: 0.3s all ease;
}


.swal2-styled.swal2-confirm {
  background-color: var(--color-secondary);
}
</style>
