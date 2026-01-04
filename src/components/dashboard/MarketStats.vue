<script setup>
import { TrendingUp, Activity, DollarSign } from "lucide-vue-next";

const props = defineProps({
  marketStats: {
    type: Object,
    required: true,
  },
  formatNumber: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <section class="container mx-auto px-6 py-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 stagger-animation">
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
</template>
