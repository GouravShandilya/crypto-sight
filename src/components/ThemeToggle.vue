<script setup>
import { ref, onMounted } from "vue";
import { Sun, Moon } from "lucide-vue-next";

const isDark = ref(true); // Default to dark theme for crypto app

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
  // Persist theme preference
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
  }
};

const initializeTheme = () => {
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = true; // Default to dark theme
    localStorage.setItem("theme", "dark");
  }
  updateTheme();
};

onMounted(() => {
  initializeTheme();
});
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg bg-muted hover:bg-accent transition-colors hover-scale"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Sun v-if="isDark" class="w-5 h-5 text-muted-foreground" />
    <Moon v-else class="w-5 h-5 text-muted-foreground" />
  </button>
</template>
