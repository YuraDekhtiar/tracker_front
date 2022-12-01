import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import BootstrapVue3 from 'bootstrap-vue-3'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import store from "./store";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import setupInterceptors from "@/services/setupInterceptors";

setupInterceptors(store);

createApp(App)
  .use(router)
  .use(store)
  .use(BootstrapVue3)
  .use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDDLgEugMzce2xOwbvy3_fmHmzrAUv4_TU',
    },
  })
  .component('BootstrapIcon', BootstrapIcon)
  .mount('#app')
