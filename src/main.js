import { createApp } from 'vue'
import  VueGoogleMaps from '@fawmi/vue-google-maps'
import App from "@/App";

const app = createApp(App);
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDDLgEugMzce2xOwbvy3_fmHmzrAUv4_TU',
  },
}).mount('#app')
