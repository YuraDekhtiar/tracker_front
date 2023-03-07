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
            <button type="button" class="btn btn-primary m-2" @click="sharedLink(responseData.coords.x, responseData.coords.y)">Скопіювати посилання</button>

            <div class="card-header">
              <BootstrapIcon icon="phone-fill" size="2x"/> <strong>{{responseData.name}}</strong>
            </div>
            <div class="card-header">
                <BootstrapIcon icon="calendar" size="2x"/> {{ dateFilter(responseData.time) }}
            </div>
            <div class="card-header">
              <BootstrapIcon icon="geo-alt" size="2x"/> LAT: {{responseData.coords.x}} LNG: {{responseData.coords.y}}
            </div>
            <div class="card-header">
              <BootstrapIcon icon="thermometer" size="2x"/> {{responseData.temp}} &#8451;
              &emsp;
              <BootstrapIcon icon="speedometer" size="2x"/> {{parseInt(responseData.speed)}} km/h
              &emsp;
              <BootstrapIcon :icon="isCharging(responseData.is_charging)" size="2x"/> {{responseData.battery_level}}%
            </div>
            <button type="button" class="btn btn-success m-2" @click="getCenter">Знайти</button>
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
      title: "Map",
      isLoading: true,
      center: {
        lat: 0.0,
        lng: 0.0
      },
      refreshIntervalId: 0,
      markers: [
        {
          position: {
            lat: 0.0,
            lng: 0.0,
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
    document.title = this.title
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
          document.title = `${this.responseData.name}`;
          this.getCenter()
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
    },
    isCharging(charging) {
      return charging ? "battery-charging" : "battery-full"
    },
    sharedLink(lat, lng) {
      navigator.clipboard
        .writeText(`https://www.google.com/maps/?q=${lat},${lng}`)
        .then(() => {
          console.log("Success clipboard")
        })
        .catch(() => {
          console.log("Error clipboard")
        });
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
