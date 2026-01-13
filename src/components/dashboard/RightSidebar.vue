<script setup>
import Portfolio from "../Portfolio.vue";
import NewsSection from "../NewsSection.vue";
import AiAdvisor from "./AiAdvisor.vue";
</script>

<template>
  <div class="space-y-8">
    <AiAdvisor v-if="false" />
    <Portfolio />
    <NewsSection />
  </div>
</template>
