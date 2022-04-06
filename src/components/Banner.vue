<template>
  <div class="demo">
       <Vue3Lottie :animationData="AstronautJSON" :height="300" :width="600" />

  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import AstronautJSON from '../assets/data.json'



export default {
  name:'Banner',
    data(){
        return{
            AstronautJSON,
        }
    }
}
</script>

<style>

</style>