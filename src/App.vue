<template>
  <div>
    {{responseData}}
    <GMapMap
      :center="center"
      :zoom="18"
      map-type-id="terrain"
      style="width: 1200px; height: 800px"
    >
      <GMapCluster>
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </GMapCluster>
    </GMapMap>
  </div>

</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      center: {lat: 0, lng: 0},
      markers: [
        {
          id: '0',
          position: {
            lat: 0, lng: 0
          },
        },
      ],
      responseData: Object,
    }
  },
  async beforeMount() {
    setInterval(async () => {
      await this.fetchData();
      this.center.lat = this.responseData[0].coords.x;
      this.center.lng = this.responseData[0].coords.y;
      this.markers[0].position.lat = this.responseData[0].coords.x;
      this.markers[0].position.lng = this.responseData[0].coords.y;
    }, 1000)
  },
  methods: {
    async fetchData() {
      try {
        this.responseData = await fetch(`http://127.0.0.1:3000/locations/`, {
          method: 'GET',
        }).then(res => res.json());
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>
