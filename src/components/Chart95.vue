<template>
<div class="demo">
  <LineChart
    :chart-data="data"
    :options="options"
    css-classes="chart-container" />
</div>
</template>

<script setup>
import {ref,computed,defineProps, toRef} from "vue";  //composition寫法載入

import {LineChart} from "vue-chart-3";
import {
  Chart,
  LinearScale,
  LineElement,
  LineController,
  CategoryScale,
  PointElement
} from "chart.js"

Chart.register(
  LinearScale,
  LineElement,
  LineController,
  CategoryScale,
  PointElement,
 
)

const props = defineProps({
  getLabels : {
    type: Array,
    default() {
      return []
    }
  },
  getDataValues : {
    type: Array,
    default() {
      return []
    }
  }
})
const getLabels = toRef(props, 'getLabels');
const getDataValues = toRef(props, 'getDataValues');




const data = computed(() => ({
  labels:getLabels.value ,

  datasets: [
    {
      label: "95汽油歷史價格",
      data:getDataValues.value,
      borderColor: "#dc322f"
    }
  ]
}))

const options = ref({
    
  scales: {
    y: {
      beginAtZero: false  //從0開始
    },
    x:{
      display:false
    }
  },
  animation: {
          duration: 500 // 一般动画时间
      },
  plugins: {
      legend: {
        display: false
    },
    title: {
      text: "95汽油歷史價格",
       font: {
            size: 20,
            fontColor: "purple",
          }
    },

  }
})
</script>

<style lang="scss" scoped>
.demo{
    width:400px;
    height: 400px;
}
</style>