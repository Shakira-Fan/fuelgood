<template>
  <div class="banner container-fluid">
    <Banner />
  </div>
  <Card />
  <div class="chart">
    <h2 class="mb-5">今日油價</h2>
    <div
      class="row flex flex-column-reverse flex-md-row justify-content-center align-items-start no-gutters"
    >
      <div class="left col-12 col-md-5">
        <div class="price">
          <div class="info flex flex-column">
            <p class="oilName">92無鉛汽油:</p>
            <span>
              <h4>{{ price92 }}</h4>
              <p>元/公升</p> </span
            ><button @click="activeTab = 'Chart92'">92汽油歷史油價</button>
          </div>
          <div class="info flex flex-column">
            <p class="oilName">95無鉛汽油:</p>
            <span>
              <h4>{{ price95 }}</h4>
              <p>元/公升</p> </span
            ><button @click="activeTab = 'Chart95'">95汽油歷史油價</button>
          </div>
          <div class="info flex flex-column">
            <p class="oilName">98無鉛汽油:</p>
            <span>
              <h4>{{ price98 }}</h4>
              <p>元/公升</p> </span
            ><button @click="activeTab = 'Chart98'">98汽油歷史油價</button>
          </div>
          <div class="info flex flex-column">
            <p class="oilName">高級柴油價格:</p>
            <span>
              <h4>{{ priceSuper }}</h4>
              <p>元/公升</p> </span
            ><button @click="activeTab = 'ChartSuper'">高級柴油歷史油價</button>
          </div>
        </div>
        <a class="buyIt shadow" href="/login">立即加油去！</a>
      </div>
      <div class="right col-12 col-md-5">
        <component
          :is="activeTab"
          :getLabels="historyDate"
          :getDataValues="currentTabPrice"
        />
      </div>
    </div>
  </div>
  <Map />
</template>

<script>
import Banner from '../components/Banner.vue';
import Card from '../components/Card.vue';
import Map from '../components/Map.vue';
import Chart92 from '../components/Chart92.vue';
import Chart95 from '../components/Chart95.vue';
import Chart98 from '../components/Chart98.vue';
import ChartSuper from '../components/ChartSuper.vue';

export default {
  components: {
    Map,
    Chart92,
    Chart95,
    Chart98,
    ChartSuper,
    Animation,
    Card,
    Banner,
  },
  data() {
    return {
      activeTab: 'Chart92',
      priceData: [],
      price98: '',
      price92: '',
      price95: '',
      priceSuper: '',
      historyData98: [],
      historyData95: [],
      historyData92: [],
      historyDataSuper: [],
      historyPrice98: [],
      historyPrice92: [],
      historyPrice95: [],
      historyPriceSuper: [],
      historyDate: [],
      lottie: {},
      style: {
        backgroundColor: '',
      },
      color: false,
    };
  },
  methods: {
    async getPrice() {
      const url = 'https://fuel-good.herokuapp.com/crawler/price/recent/';
      await this.axios.get(url).then(response => {
        console.log(response.data); //object
        this.priceData = response.data;
        this.price98 = this.priceData[2].price;
        this.price95 = this.priceData[3].price;
        this.price92 = this.priceData[1].price;
        this.priceSuper = this.priceData[0].price;
      });
    },
    async history98() {
      const url =
        'https://fuel-good.herokuapp.com/crawler/price/recent/98%E7%84%A1%E9%89%9B%E6%B1%BD%E6%B2%B9/14';
      await this.axios.get(url).then(response => {
        console.log(response.data); //object
        this.historyData98 = response.data;
        this.historyPrice98 = this.historyData98.map(i => {
          return i.price;
        });
        this.historyDate = this.historyData98.map(i => {
          return i.appliedDate;
        });
      });
    },
    async history95() {
      const url =
        'https://fuel-good.herokuapp.com/crawler/price/recent/95%E7%84%A1%E9%89%9B%E6%B1%BD%E6%B2%B9/14';
      await this.axios.get(url).then(response => {
        console.log(response.data); //object
        this.historyData95 = response.data;
        this.historyPrice95 = this.historyData95.map(i => {
          return i.price;
        });
      });
    },
    async history92() {
      const url =
        'https://fuel-good.herokuapp.com/crawler/price/recent/92%E7%84%A1%E9%89%9B%E6%B1%BD%E6%B2%B9/14';
      await this.axios.get(url).then(response => {
        console.log(response.data); //object
        this.historyData92 = response.data;
        this.historyPrice92 = this.historyData92.map(i => {
          return i.price;
        });
      });
    },
    async historySuper() {
      const url =
        'https://fuel-good.herokuapp.com/crawler/price/recent/%E9%AB%98%E7%B4%9A%E6%9F%B4%E6%B2%B9/14';
      await this.axios.get(url).then(response => {
        console.log(response.data); //object
        this.historyDataSuper = response.data;
        this.historyPriceSuper = this.historyDataSuper.map(i => {
          return i.price;
        });
      });
    },
    //   handleScroll(){
    //   if (window.scrollY > 5){
    //     this.style.backgroundColor=`#ffd32d`;
    //   }else{
    //     this.style.backgroundColor="transparent";
    //   }
    // },
    // beforeDestroy(){
    //     window.removeEventListener("scroll",this.handleScroll);
    //   },
  },
  computed: {
    currentTabPrice: function () {
      if (this.activeTab === 'Chart92') {
        return this.historyPrice92;
      } else if (this.activeTab === 'Chart95') {
        return this.historyPrice95;
      } else if (this.activeTab === 'Chart98') {
        return this.historyPrice98;
      } else {
        return this.historyPriceSuper;
      }
    },
  },

  mounted() {
    this.getPrice();
    this.history98();
    this.history95();
    this.history92();
    this.historySuper();
    // window.addEventListener("scroll",this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/bootstrap';

/* 動畫設置 */
.banner {
  padding: 0;
  margin: 0;
  width: 100vw;
}

/* 圖表設置 */
.chart {
  width: 100%;
  padding: 5rem 0;
  h2 {
    display: inline-block;
    font-size: 4rem;
    border-bottom: 5px solid var(--color-primary);
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .left {
      flex-wrap: wrap;
      align-items: center;
      .price {
        padding: 0;
        .info {
          margin: 1rem;
          background-color: var(--color-grey);
          padding: 1.5rem;
          border-radius: 1rem;

          &:hover {
            transition: all ease-out 0.3s;
            box-shadow: 0px 0px 2.7px rgba(0, 0, 0, 0.042),
              0px 0px 7.5px rgba(0, 0, 0, 0.06),
              0px 0px 18.1px rgba(0, 0, 0, 0.078),
              0px 0px 60px rgba(0, 0, 0, 0.12);
          }
          span {
            display: flex;
            align-items: flex-end;
            h4 {
              font-size: 5rem;
              color: red;
            }
          }
          button {
            width: 15rem;
            margin: 0.5rem;
            padding: 0.5rem;
            font-size: 1.6rem;
            background-color: var(--color-secondary);
            color: white;
            border: none;
            border-radius: 1rem;
            text-align: center;
            &:hover {
              background-color: #0e3365;
            }
          }
        }
      }
      a {
        text-decoration: none;
        margin-top: 1.5rem;
        padding: 0 1rem;
        background-color: var(--color-button);
        color: white;
        font-size: 1.5rem;
        border-radius: 1.5rem;
        &:hover {
          font-size: 2rem;
        }
      }
    }
  }
  .right {
    margin-top: 1rem;
    border-radius: 1.5rem;
    box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.17);
  }
}
</style>
