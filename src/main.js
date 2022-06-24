import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import App from "@/App";
import router from "@/router";

const app = createApp(App);

app.use(router)
   .use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDDLgEugMzce2xOwbvy3_fmHmzrAUv4_TU',
    },
   })
  .use(BootstrapVue3)
  .mount('#app')
