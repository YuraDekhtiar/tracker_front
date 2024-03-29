import {createApp} from 'vue'
import App from "./App.vue";
import router from "./router";
import BootstrapVue3 from 'bootstrap-vue-3';
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import Toaster from '@meforma/vue-toaster';
import store from "./store";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'

import setupInterceptors from "@/services/setupInterceptors";

setupInterceptors(store);

createApp(App)
  .use(router)
  .use(store)
  .use(BootstrapVue3)
  .use(Toaster)
  .use(VueGoogleMaps, {
    load: {
      key: '',
    },
  })
  .use(VueGoodTablePlugin)
  .component('BootstrapIcon', BootstrapIcon)
  .mount('#app')

