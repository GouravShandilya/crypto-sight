<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CryptoCard from "../../components/CryptoCard.vue";
import Portfolio from "../../components/Portfolio.vue";
import NewsSection from "../../components/NewsSection.vue";
import PriceChart from "../../components/PriceChart.vue";
import ThemeToggle from "../../components/ThemeToggle.vue";
import Sidebar from "../../components/Sidebar.vue";
import HeaderSection from "../landingPage/HeaderSection.vue";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
} from "lucide-vue-next";
import axios from "axios";

const cryptoData = ref([]);
const marketStats = ref({
  totalMarketCap: 0,
  totalVolume: 0,
  btcDominance: 0,
  activeCryptos: 0,
});
const loading = ref(true);
const selectedCrypto = ref(null);

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

const formatNumber = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num.toLocaleString();
};

let interval;
onMounted(() => {
  fetchCryptoData();
  interval = setInterval(fetchCryptoData, 60000); // Update every minute
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

const selectCrypto = (crypto) => {
  selectedCrypto.value = crypto;
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground dark flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="flex-1 ml-64 transition-all duration-300">
      <!-- Header -->
      <HeaderSection />

      <!-- Market Stats -->
      <section class="container mx-auto px-6 py-8">
        <div
          class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 stagger-animation"
        >
          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm">Market Cap</p>
                <p class="text-2xl font-bold text-white">
                  ${{ formatNumber(marketStats.totalMarketCap) }}
                </p>
              </div>
              <DollarSign class="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm">24h Volume</p>
                <p class="text-2xl font-bold text-white">
                  ${{ formatNumber(marketStats.totalVolume) }}
                </p>
              </div>
              <Activity class="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm">BTC Dominance</p>
                <p class="text-2xl font-bold text-white">
                  {{ marketStats.btcDominance }}%
                </p>
              </div>
              <TrendingUp class="w-8 h-8 text-orange-400" />
            </div>
          </div>

          <div
            class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm">Active Coins</p>
                <p class="text-2xl font-bold text-white">
                  {{ marketStats.activeCryptos }}
                </p>
              </div>
              <Activity class="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <main class="container mx-auto px-6 pb-8">
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <!-- Left Column: Crypto List -->
          <div class="xl:col-span-2">
            <div
              class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            >
              <div class="p-6 border-b border-white/10">
                <h2 class="text-xl font-bold text-white flex items-center">
                  <TrendingUp class="w-5 h-5 mr-2 text-green-400" />
                  Top Cryptocurrencies
                </h2>
              </div>

              <div v-if="loading" class="p-8 text-center">
                <div class="animate-pulse">
                  <div class="text-gray-400">Loading crypto data...</div>
                </div>
              </div>

              <div v-else class="divide-y divide-white/5">
                <CryptoCard
                  v-for="crypto in cryptoData"
                  :key="crypto.id"
                  :crypto="crypto"
                  @click="selectCrypto(crypto)"
                  :class="
                    selectedCrypto?.id === crypto.id
                      ? 'bg-purple-500/20'
                      : 'hover:bg-white/5'
                  "
                />
              </div>
            </div>

            <!-- Price Chart -->
            <div v-if="selectedCrypto" class="mt-8">
              <PriceChart :crypto="selectedCrypto" />
            </div>
          </div>

          <!-- Right Column: Portfolio & News -->
          <div class="space-y-8">
            <Portfolio />
            <NewsSection />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
