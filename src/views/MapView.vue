<script setup>
  import dateFilter from "@/commons/date.filter";
  import VPreloader from "@/components/Preloader.vue";
</script>

<template>
  <vPreloader v-if="isLoading"/>
  <div v-else class="container-fluid" >
    <div v-if="errorResponse" class="alert alert-danger container" role="alert">
      {{errorMessage}}
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-3 info">
          <div class="card info">
            <div class="card-header">NAME: <strong>{{responseData.name}}</strong></div>
            <div class="card-header">DATETIME: {{
                dateFilter(responseData.time)
              }}
            </div>
            <div class="card-header">LAT: {{responseData.coords.x}}</div>
            <div class="card-header">LNG: {{responseData.coords.y}}</div>
            <div class="card-header">SPEED: {{responseData.speed}}</div>
            <div class="card-header">Battery: {{responseData.battery_level}} %</div>
            <div class="card-header">Temp: {{responseData.temp}} &#8451;</div>
            <div class="card-header">Is charging: {{Boolean(responseData.is_charging)}} </div>
            <div class="card-header">
              <button type="button" class="btn btn-success" @click="getCenter">Знайти</button>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <GMapMap
            class="map"
            :center="center"
            :zoom="16"
            map-type-id="terrain"
            :options="{
              zoomControl: true,
              mapTypeControl: true,
              scaleControl: true,
              streetViewControl: true,
              rotateControl: true,
              fullscreenControl: true,
              disableDefaultUi: true
            }"
          >
            <GMapCluster>
              <GMapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="false"
              />
            </GMapCluster>
          </GMapMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
      center: {
        lat: 0.0,
        lng: 0.0
      },
      refreshIntervalId: 0,
      markers: [
        {
          position: {
            lat: 51.093048,
            lng: 6.84212,
          },
        },
      ],
      responseData: Object,
      errorMessage: "",
      errorResponse: false
    }
  },
  beforeUnmount() {
    clearInterval(this.refreshIntervalId)
  },
  async beforeMount() {
    if(this.$route.params.id !== 'undefined') {
      this.refreshIntervalId = setInterval(async () => {
        await this.fetchData(this.$route.params.id)
        this.isLoading = false;
        if(this.responseData === undefined) {
          this.errorMessage = "GPS coordinates not found";
          this.errorResponse = true;
          return ;
        }
        if(this.markers[0].position.lat !== this.responseData?.coords.x
          && this.markers[0].position.lng !== this.responseData?.coords.y
        ) {
          this.markers[0].position.lat = this.responseData?.coords.x;
          this.markers[0].position.lng = this.responseData?.coords.y;
        }
      }, 5000)
    }
  },
  methods: {
    async fetchData(id) {
      try {
        await Promise.all([
          this.responseData = await api.get(`locations?id=${id}`).then(
            (res) => {
              return res.data.result[0];
            },
            (error) => {
              this.responseData = true;
              this.errorMessage = `${error.response?.data.status || ""}  ${error.response?.data.message || "Unknown error"}`;
            }
          ),
        ])
      } catch (e) {
        console.log(e)
      }
    },
    getCenter() {
      this.center.lat = this.responseData?.coords.x;
      this.center.lng = this.responseData?.coords.y;
    }
  }
}
</script>

<style>
  .map {
    height: 85vh;
    width: 100%;
  }

  @media (min-width: 200px) and (max-width: 991px) {
    .info {
      width: 100%;
      margin-bottom: 10px;
    }
  }
</style>
