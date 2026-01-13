<script setup>
import { computed } from "vue";
import { Wallet, Loader2 } from "lucide-vue-next";
import { usePortfolioStore } from "@/stores/portfolioStore";
import { formatCurrency } from "@/lib/utils";

const portfolioStore = usePortfolioStore();

const totalValue = computed(() => portfolioStore.totalValue);
const isLoading = computed(() => portfolioStore.isLoading);
const isConnected = computed(() => portfolioStore.isConnected);

// Mask address
const shortAddress = computed(() => {
  const addr = portfolioStore.address;
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
});
</script>

<template>
  <div
    class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
  >
    <!-- Header -->
    <div class="p-6 border-b border-white/10 flex items-center justify-between">
      <h2 class="text-xl font-bold text-white flex items-center">
        <Wallet class="w-5 h-5 mr-2 text-emerald-400" />
        Portfolio
      </h2>
      <div
        v-if="isConnected"
        class="text-xs text-gray-400 bg-black/20 px-2 py-1 rounded"
      >
        {{ shortAddress }}
      </div>
    </div>

    <!-- Content -->
    <div v-if="!isConnected" class="p-8 text-center text-gray-400">
      <Wallet class="w-12 h-12 mx-auto mb-4 opacity-50 text-gray-500" />
      <p class="mb-2">Wallet not connected</p>
      <p class="text-xs opacity-60">Connect your wallet to see your assets</p>
    </div>

    <div v-else>
      <!-- Summary -->
      <div class="p-6 border-b border-white/10">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-gray-400 text-sm">Total Value</p>
            <div class="flex items-center">
              <Loader2
                v-if="isLoading"
                class="w-4 h-4 mr-2 animate-spin text-gray-400"
              />
              <p v-else class="text-2xl font-bold text-white">
                {{ formatCurrency(totalValue) }}
              </p>
            </div>
          </div>
          <div>
            <p class="text-gray-400 text-sm">24h Change</p>
            <p
              class="text-lg font-bold flex items-center text-gray-400"
              title="Coming soon with historical data"
            >
              --
            </p>
          </div>
        </div>
      </div>

      <!-- Asset List -->
      <div
        v-if="portfolioStore.tokens.length > 0"
        class="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar"
      >
        <div
          v-for="token in portfolioStore.tokens"
          :key="token.symbol"
          class="p-4 hover:bg-white/5 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white"
              >
                {{ token.symbol?.[0] }}
              </div>
              <div>
                <div class="font-semibold text-white">
                  {{ token.name || token.symbol }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ parseFloat(token.balance).toFixed(4) }} {{ token.symbol }}
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-white font-medium">
                {{ formatCurrency(token.value) }}
              </div>
              <div class="text-xs text-emerald-400" v-if="token.change24h">
                +{{ token.change24h }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!isLoading" class="p-6 text-center text-gray-500 text-sm">
        No assets found on this chain.
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
</style>
