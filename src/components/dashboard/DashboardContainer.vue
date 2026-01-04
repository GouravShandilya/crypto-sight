<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

// Dashboard state
const cryptoData = ref([]);
const marketStats = ref({
  totalMarketCap: 0,
  totalVolume: 0,
  btcDominance: 0,
  activeCryptos: 0,
});
const loading = ref(true);
const selectedCrypto = ref(null);

// API functions
const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h"
    );
    cryptoData.value = response.data;

    // Calculate market stats
    const totalMcap = response.data.reduce(
      (sum, coin) => sum + coin.market_cap,
      0
    );
    const totalVol = response.data.reduce(
      (sum, coin) => sum + coin.total_volume,
      0
    );

    marketStats.value = {
      totalMarketCap: totalMcap,
      totalVolume: totalVol,
      btcDominance: (
        ((response.data.find((coin) => coin.id === "bitcoin")?.market_cap ||
          0) /
          totalMcap) *
        100
      ).toFixed(1),
      activeCryptos: response.data.length,
    };

    loading.value = false;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    loading.value = false;
  }
};

// Utility functions
const formatNumber = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num.toLocaleString();
};

const selectCrypto = (crypto) => {
  selectedCrypto.value = crypto;
};

// Lifecycle
let interval;
onMounted(() => {
  fetchCryptoData();
  interval = setInterval(fetchCryptoData, 60000); // Update every minute
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

// Provide data and functions to parent component
defineExpose({
  cryptoData,
  marketStats,
  loading,
  selectedCrypto,
  formatNumber,
  selectCrypto,
});
</script>

<template>
  <slot
    :cryptoData="cryptoData"
    :marketStats="marketStats"
    :loading="loading"
    :selectedCrypto="selectedCrypto"
    :formatNumber="formatNumber"
    :selectCrypto="selectCrypto"
  />
</template>
