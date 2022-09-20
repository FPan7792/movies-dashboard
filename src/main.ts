import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// ICONS FROM FONT AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCirclePlus,
  faArrowCircleDown,
  faHeartPulse,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faCirclePlus, faArrowCircleDown, faHeartPulse, faSpinner);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
