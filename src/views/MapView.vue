<script setup>
  import dateFilter from "@/commons/date.filter";
</script>

<template>
  <main class="container-fluid" v-if="!isLoading">
    <div class="row">
      <div class="col-md-3 info">
        <div class="card info">
          <div class="card-header">ID: {{responseData[0].device_id}}</div>
          <div class="card-header">DATETIME: {{
              dateFilter(responseData[0].time)
            }}
          </div>
          <div class="card-header">LAT: {{responseData[0].coords.x}}</div>
          <div class="card-header">LNG: {{responseData[0].coords.y}}</div>
          <div class="card-header">SPEED: {{responseData[0].speed}}</div>
          <div class="card-header">Battery: {{responseData[0].battery_level}} %</div>
          <div class="card-header">Temp: {{responseData[0].temp}} &#8451;</div>
          <div class="card-header">Is charging: {{responseData[0].is_charging === 1 ? true : false}} </div>
          <div class="card-header">
            <button type="button" class="btn btn-success" @click="getCenter">Знайти</button>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <GMapMap class="map"
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
  </main>

</template>

<script>

import api from "@/api/api";

export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
      time_last_connection: Object,
      isOnline: false,
      center: {
        lat: 0.0,
        lng: 0.0
      },
      refreshIntervalId: 0,
      markers: [
        {
          id: 'label',
          position: {
            lat: 51.093048, lng: 6.842120
          },
        }
      ],
      responseData: Object,
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
        if(this.markers[0].position.lat !== this.responseData[0].coords.x
          && this.markers[0].position.lng !== this.responseData[0].coords.y
        ) {
          this.markers[0].position.lat = this.responseData[0].coords.x;
          this.markers[0].position.lng = this.responseData[0].coords.y;
        }
      }, 5000)
    }
  },
  methods: {
    async fetchData(id) {
        try {
          await Promise.all([
            this.responseData = await api.get(`locations?id=${id}`).then(r => r.data),
            this.time_last_connection = await api.get(`devices/status?id=${id}`).then(r => r.data)
          ])
        } catch (e) {
          console.log(e)
        }
    },
    getCenter() {
      this.center.lat = this.responseData[0].coords.x;
      this.center.lng = this.responseData[0].coords.y;
    }
  }
}
</script>

<style>
  .map {
    height: 90vh;
    width: 100%;
  }

  @media (min-width: 200px) and (max-width: 991px) {
    .info {
      width: 100%;
      margin-bottom: 10px;
    }
  }
</style>
