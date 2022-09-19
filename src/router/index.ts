import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import MoviesHubPage from "@/views/MoviesHubPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // HOME/LANDING PAGE
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        title: "Accueil",
      },
    },
    // MOVIES COLLECTION PAGE
    {
      path: "/movieshub",
      name: "movieshub",
      component: MoviesHubPage,
      meta: {
        title: "Hub",
      },
    },
  ],
});

export default router;
