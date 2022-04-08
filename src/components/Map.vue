<template>
 <div class="store">
   <h4>據點查詢</h4>
     <div class="row no-gutters">
 <div class="col-sm-8">
 <div id="map"></div>
 </div>
 <div class="col-sm-4">
 <div class="toolbox">
 <div class="sticky-top bg-white shadow-sm p-2">
 <div class="form-group d-flex">
 <label for="cityName" class="mr-2 col-form-label text-right"><p>縣市</p></label>
 <div class="flex-fill">
           <select id="cityName" class="form-control"
              v-model="select.city" @change="select.area = ''">
                <option value="">-- Select One --</option>
                <option :value="c.CityName" v-for="c in cityName" :key="c.CityName">
                  {{ c.CityName }}
                </option>
          </select>
 </div>
 </div>
 <div class="form-group d-flex">
 <label for="area" class="mr-2 col-form-label text-right"><p>地區</p></label>
 <div class="flex-fill">
  <select id="area" class="form-control" v-if="select.city.length"
                v-model="select.area" @change="updateSelect">
                <option value="">-- Select One --</option>
                <option :value="a.AreaName"
                  v-for="a in cityName.find((city)=>city.CityName === select.city).AreaList"
                  :key="a.AreaName">
                  {{ a.AreaName }}
                </option>
              </select>
 </div>
 </div>
 <p class="mb-0 small text-muted text-right"></p>
 </div>
 </div>
 </div>

</div>
     </div> 

</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import cityName from '../../public/cityName.json';

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


let osmMap ={};
export default {
    name:'Map',
 data(){
     return{
    cityName,
    osmMap: {},
    data: [],
    select: {
      city: '台北市',
      area: '大安區',
      },
     };
  },
  methods: {
    getList() {
      this.axios.get('/store.json').then((response) => {
      console.log(response.data) //object
      this.data = (response.data.table);
      console.log(this.data);
      this.updateMarker();
      })
    },
    updateMarker() {
       const gasStations = this.data.filter((gasStation) => {
        if (!this.select.area) {
          return gasStation.縣市===this.select.city;
        }
        return gasStation.縣市===this.select.city&&gasStation.鄉鎮區 === this.select.area;
      });
        console.log(gasStations);
        gasStations.forEach((gasStation)=>{
          let a = gasStation.經度;
          let b = gasStation.緯度;
          L.marker([b, a]).addTo(osmMap).bindPopup(`<strong>${gasStation.站名}</strong><br>
          地址:${gasStation.地址}<br>
          電話: ${gasStation.電話}<br>
          <small>營業時間: ${gasStation.營業時間}</small>`).openPopup()});
        this.penTo(gasStations[0]);
    },
    removeMarker() {
      osmMap.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        osmMap.removeLayer(layer);
      }});
    },
    penTo(gasStation) {
      L.popup()
        .setLatLng([
          gasStation.緯度,
          gasStation.經度,
        ])
        .setContent(`<strong>${gasStation.站名}</strong><br>
          地址:${gasStation.地址}<br>
          電話: ${gasStation.電話}<br>
          <small>營業時間: ${gasStation.營業時間}</small>`)
        .openOn(osmMap);
      osmMap.setView(
        [gasStation.緯度,gasStation.經度],
        12
      );
    },
    updateSelect() {
      this.removeMarker();
      this.updateMarker();
      const gasStation = this.data.find(item => item.鄉鎮區 === this.select.area);
      osmMap.penTo(gasStation.緯度, gasStation.經度);
    },
  },
  mounted(){
    this.getList();
    //訂一個經緯度在地圖框架內
    osmMap = L.map('map',{
        center:[25.03,121.55],
        zoom:12,
    });
    //對框架給地圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
    }).addTo(osmMap);
    //對該經緯度設立incn
    // L.marker([25.03,121.55]).addTo(osmMap);
  }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/bootstrap';

label{
  margin:0.5rem 0.5rem;
  padding:0 ;
  p{font-size: 1.5rem;}
}
select{
  margin-top: .7rem;
}
.store{
  width:100%;
  padding:10rem 15rem;
  h4{
    display: inline-block;
    width:12vw;
    padding: 0.5rem;
    margin: 1rem;
    background-color:var(--color-secondary);
    color: white;
    font-size:2.5rem ;
    border-radius: 1rem;
}
}
#map {
 height: 50vh;
}
.highlight {
 background: #e9ffe3;
}
.toolbox {
 height: 50vh;
 overflow-y: auto;
 a {
 cursor: pointer;
 }
}

@media screen and (max-width:920px) { 
  label{
  margin:0rem 0.5rem;
}
}

</style>