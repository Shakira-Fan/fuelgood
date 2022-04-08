<template>
<div class="banner"><img src="../assets/images/animation.gif" alt=""></div>
  <div class="chart">
    <div>
          <div class="left">
          <h2>今日油價</h2>
            <div class="price">
              <div>
                <div class="info"><p class="oilName">92無鉛汽油:</p><span><h4>{{price92}}</h4><p>元/公升</p></span><button @click="activeTab='Chart92'">92汽油歷史油價</button></div>
                <div class="info"><p class="oilName">95無鉛汽油:</p><span><h4>{{price95}}</h4><p>元/公升</p></span><button  @click="activeTab='Chart95'">95汽油歷史油價</button></div>
              </div>
              <div>
                <div class="info"><p class="oilName">98無鉛汽油:</p><span><h4>{{price98}}</h4><p>元/公升</p></span><button  @click="activeTab='Chart98'">98汽油歷史油價</button></div>
                <div class="info"><p class="oilName">超級柴油價格:</p><span><h4>{{priceSuper}}</h4><p>元/公升</p></span><button @click="activeTab='ChartSuper'">超級柴油歷史油價</button></div>
              </div>
            </div>
          <a class="buyIt" href="/cart">我要購買</a>
       </div>
      <component class="right" :is="activeTab" :getLabels="historyDate" :getDataValues="currentTabPrice" />
    </div> 
    </div>
<Card />
<Map />
</template>

<script>
import Card from '../components/Card.vue'
import Map from '../components/Map.vue'
import Chart92 from '../components/Chart92.vue'
import Chart95 from '../components/Chart95.vue'
import Chart98 from '../components/Chart98.vue'
import ChartSuper from '../components/ChartSuper.vue'




export default {
components: {Map,Chart92,Chart95,Chart98,ChartSuper,Animation, Card},
data() {
  return{
    activeTab:'Chart92',
    priceData:[],
    price98:"",
    price92:"",
    price95:"",
    priceSuper:"",
    historyData98:[],
    historyData95:[],
    historyData92:[],
    historyDataSuper:[],
    historyPrice98:[],
    historyPrice92:[],
    historyPrice95:[],
    historyPriceSuper:[],
    historyDate:[],
    lottie: {},  
  }},
  methods:{
    async getPrice() {
      const url =('https://fuel-good.herokuapp.com/crawler/price/recent/');
      await this.axios.get(url).then((response) => {
      console.log(response.data) //object
      this.priceData = (response.data);
      this.price98 = this.priceData[2].price;
      this.price95 = this.priceData[3].price;
      this.price92 = this.priceData[1].price;
      this.priceSuper = this.priceData[0].price;
      })
    },
    async history98() {
      const url =('https://fuel-good.herokuapp.com/crawler/price/recent/98%E7%84%A1%E9%89%9B%E6%B1%BD%E6%B2%B9/14');
      await this.axios.get(url).then((response) => {
      console.log(response.data) //object
      this.historyData98 = (response.data)   
      this.historyPrice98=this.historyData98.map(i=>{
        return i.price;})  
      this.historyDate=this.historyData98.map(i=>{
        return i.appliedDate;}) 
      })

      },
    async history95() {
      const url =('https://fuel-good.herokuapp.com/crawler/price/recent/95%E7%84%A1%E9%89%9B%E6%B1%BD%E6%B2%B9/14');
      await this.axios.get(url).then((response) => {
      console.log(response.data) //object
      this.historyData95 = (response.data);
      this.historyPrice95=this.historyData95.map(i=>{
        return i.price;})  
      })
      },
    async history92() {
      const url =('https://fuel-good.herokuapp.com/crawler/price/recent/92%E7%84%A1%E9%89%9B%E6%B1%BD%E6%B2%B9/14');
      await this.axios.get(url).then((response) => {
      console.log(response.data) //object
      this.historyData92 = (response.data);
      this.historyPrice92=this.historyData92.map(i=>{
        return i.price;})  
      })
      },
    async historySuper() {
      const url =('https://fuel-good.herokuapp.com/crawler/price/recent/%E9%AB%98%E7%B4%9A%E6%9F%B4%E6%B2%B9/14');
      await this.axios.get(url).then((response) => {
      console.log(response.data) //object
      this.historyDataSuper = (response.data);
      this.historyPriceSuper=this.historyDataSuper.map(i=>{
        return i.price;})   
      })
      },
  },
  computed:{
  currentTabPrice: function() {
    if (this.activeTab === 'Chart92') {
      return this.historyPrice92
    }else if (this.activeTab === 'Chart95') {
      return this.historyPrice95
    }else if (this.activeTab === 'Chart98') {
      return this.historyPrice98
    }else {
      return this.historyPriceSuper
    }
  }
  },

  mounted(){
    this.getPrice();
    this.history98();
    this.history95();
    this.history92();
    this.historySuper();
  }
}
</script>

<style lang="scss" scoped>

* {
  padding:0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
}

/* 動畫設置 */
.banner{
  width:100%;
  height: 90vh;
  background-color:var(--color-primary);
  padding:0;
  img{
    margin: 0%;
    padding:0%;
    width: 100%;
    height: 100%;
  }
}

  
  /* 圖表設置 */
  .chart{
    width:100%;
    padding:5rem 0;
    div{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      padding: 1rem 0;
      .left{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
      h2{
        width:12vw;
        text-decoration: none;
        padding: 0.5rem;
        background-color:var(--color-secondary);
        color: white;
        font-size:2.5rem ;
        border-radius: 1rem;
      }
      .price{
        display: flex;
        justify-content: space-around;
        div{
          display: flex;
          flex-direction: column;
          .info{
            margin: 1rem ,0;
            background-color: var(--color-grey);
            margin: 1rem;
            padding: 1.5rem;
            border-radius: 1rem;

          }
          span{
            display: flex;
            align-items: flex-end;
            h4{
              font-size: 5rem;
              color: red;
            }
          }
          button{
            width:12vw;
            margin: .5rem;
            padding: .5rem;
            font-size: 1rem;
            background-color: var(--color-secondary);
            color: white;
            border: none;
            border-radius: 1rem;
            text-align: center;
            &:hover{
                background-color: #0e3365;
            }
          }
        }
      }
      a{
      width:12vw;
      text-decoration: none;
      padding: 0.5rem;
      background-color:var(--color-secondary);
      color: white;
      font-size:2.5rem ;
      border-radius: 1rem;
      &:hover{
        background-color: #0e3365;
      }
    }
    
    
  }
    }
  }
</style>
