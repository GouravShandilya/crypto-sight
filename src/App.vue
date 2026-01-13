<script setup>
import { onMounted } from "vue";
import { usePortfolioStore } from "@/stores/portfolioStore";

const portfolioStore = usePortfolioStore();

onMounted(() => {
  portfolioStore.init();
});
</script>

<template>
  <router-view />
</template>

<style>
body {
  margin: 0;
  font-family: "Manrope", sans-serif;
}
</style>
