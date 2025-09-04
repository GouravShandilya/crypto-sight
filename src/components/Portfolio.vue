<script setup>
import { ref, computed } from "vue";
import { PlusCircle, TrendingUp, TrendingDown, Wallet } from "lucide-vue-next";

const portfolio = ref([
  { symbol: "BTC", amount: 0.5, buyPrice: 45000 },
  { symbol: "ETH", amount: 2.3, buyPrice: 3200 },
  { symbol: "ADA", amount: 1000, buyPrice: 1.2 },
]);

const showAddForm = ref(false);
const newHolding = ref({ symbol: "", amount: "", buyPrice: "" });

const totalValue = computed(() => {
  // This would normally use real-time prices
  return portfolio.value.reduce((sum, holding) => {
    const currentPrice = holding.buyPrice * (1 + (Math.random() - 0.5) * 0.3); // Mock price change
    return sum + holding.amount * currentPrice;
  }, 0);
});

const totalPnL = computed(() => {
  const invested = portfolio.value.reduce(
    (sum, holding) => sum + holding.amount * holding.buyPrice,
    0
  );
  return totalValue.value - invested;
});

const addHolding = () => {
  if (
    newHolding.value.symbol &&
    newHolding.value.amount &&
    newHolding.value.buyPrice
  ) {
    portfolio.value.push({
      symbol: newHolding.value.symbol.toUpperCase(),
      amount: parseFloat(newHolding.value.amount),
      buyPrice: parseFloat(newHolding.value.buyPrice),
    });
    newHolding.value = { symbol: "", amount: "", buyPrice: "" };
    showAddForm.value = false;
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
</script>

<template>
  <div
    class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
  >
    <div class="p-6 border-b border-white/10">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white flex items-center">
          <Wallet class="w-5 h-5 mr-2 text-blue-400" />
          Portfolio
        </h2>
        <button
          @click="showAddForm = !showAddForm"
          class="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
        >
          <PlusCircle class="w-5 h-5 text-purple-400" />
        </button>
      </div>
    </div>

    <!-- Portfolio Summary -->
    <div class="p-6 border-b border-white/10">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-gray-400 text-sm">Total Value</p>
          <p class="text-2xl font-bold text-white">
            {{ formatCurrency(totalValue) }}
          </p>
        </div>
        <div>
          <p class="text-gray-400 text-sm">Total P&L</p>
          <p
            class="text-2xl font-bold flex items-center"
            :class="totalPnL >= 0 ? 'text-green-400' : 'text-red-400'"
          >
            <component
              :is="totalPnL >= 0 ? TrendingUp : TrendingDown"
              class="w-5 h-5 mr-1"
            />
            {{ formatCurrency(Math.abs(totalPnL)) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Add Form -->
    <div
      v-if="showAddForm"
      class="p-6 border-b border-white/10 bg-purple-500/5"
    >
      <div class="space-y-4">
        <input
          v-model="newHolding.symbol"
          placeholder="Symbol (e.g., BTC)"
          class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
        />
        <input
          v-model="newHolding.amount"
          placeholder="Amount"
          type="number"
          step="any"
          class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
        />
        <input
          v-model="newHolding.buyPrice"
          placeholder="Buy Price (USD)"
          type="number"
          step="any"
          class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
        />
        <div class="flex space-x-2">
          <button
            @click="addHolding"
            class="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
          >
            Add
          </button>
          <button
            @click="showAddForm = false"
            class="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Holdings List -->
    <div class="divide-y divide-white/5">
      <div v-for="holding in portfolio" :key="holding.symbol" class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-semibold text-white">{{ holding.symbol }}</div>
            <div class="text-sm text-gray-400">{{ holding.amount }} coins</div>
          </div>
          <div class="text-right">
            <div class="text-white font-medium">
              {{ formatCurrency(holding.buyPrice) }}
            </div>
            <div class="text-sm text-gray-400">Buy Price</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="portfolio.length === 0" class="p-8 text-center text-gray-400">
      <Wallet class="w-12 h-12 mx-auto mb-4 opacity-50" />
      <p>No holdings yet</p>
      <p class="text-sm">Add your first crypto to track performance</p>
    </div>
  </div>
</template>
