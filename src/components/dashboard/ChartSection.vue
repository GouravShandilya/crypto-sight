<script setup>
import PriceChart from "../PriceChart.vue";

const props = defineProps({
  selectedCrypto: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <div v-if="selectedCrypto" class="mt-8">
    <PriceChart :crypto="selectedCrypto" />
  </div>
</template>
