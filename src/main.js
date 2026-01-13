import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { wagmiAdapter } from "./config/wagmi";
import App from "./App.vue";
import router from "./router";

// Set dark theme as default
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme ? savedTheme === "dark" : true; // Default to dark

  if (isDark) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  }

  if (!savedTheme) {
    localStorage.setItem("theme", "dark");
  }
};

// Initialize theme before mounting the app
initializeTheme();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");
