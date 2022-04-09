<template>
    <Vue3Lottie :animationData="DogJSON"/>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import DogJSON from '../../public/animation.json';
export default {
    name:'Banner',
    data() {
    return {
      DogJSON,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>