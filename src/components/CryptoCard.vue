<script setup>
import { TrendingUp, TrendingDown } from "lucide-vue-next";

const props = defineProps({
  crypto: {
    type: Object,
    required: true,
  },
});

const formatPrice = (price) => {
  if (price < 1) return price.toFixed(6);
  if (price < 100) return price.toFixed(4);
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const formatNumber = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toLocaleString();
};

const generateSparklinePoints = (sparkline) => {
  if (!sparkline || !sparkline.length) return "";

  const width = 100;
  const height = 30;
  const min = Math.min(...sparkline);
  const max = Math.max(...sparkline);
  const range = max - min || 1;

  return sparkline
    .map((price, index) => {
      const x = (index / (sparkline.length - 1)) * width;
      const y = height - ((price - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
};
</script>

<template>
  <div class="p-4 cursor-pointer transition-all duration-200">
    <div class="flex items-center justify-between">
      <!-- Left: Coin Info -->
      <div class="flex items-center space-x-4 flex-1">
        <div class="flex items-center space-x-3">
          <img
            :src="crypto.image"
            :alt="crypto.name"
            class="w-10 h-10 rounded-full"
          />
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-semibold text-white">{{ crypto.name }}</span>
              <span class="text-gray-400 text-sm uppercase">{{
                crypto.symbol
              }}</span>
            </div>
            <div class="text-xs text-gray-500">
              Rank #{{ crypto.market_cap_rank }}
            </div>
          </div>
        </div>
      </div>

      <!-- Center: Price & Change -->
      <div class="text-right flex-1">
        <div class="text-lg font-bold text-white">
          {{ formatPrice(crypto.current_price) }}
        </div>
        <div
          class="flex items-center justify-end space-x-1 text-sm"
          :class="
            crypto.price_change_percentage_24h >= 0
              ? 'text-green-400'
              : 'text-red-400'
          "
        >
          <component
            :is="
              crypto.price_change_percentage_24h >= 0
                ? TrendingUp
                : TrendingDown
            "
            class="w-4 h-4"
          />
          <span
            >{{
              Math.abs(crypto.price_change_percentage_24h).toFixed(2)
            }}%</span
          >
        </div>
      </div>

      <!-- Right: Sparkline -->
      <div class="flex-1 flex justify-end">
        <svg
          v-if="crypto.sparkline_in_7d?.price"
          viewBox="0 0 100 30"
          class="w-20 h-8"
        >
          <polyline
            :points="generateSparklinePoints(crypto.sparkline_in_7d.price)"
            fill="none"
            :stroke="
              crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444'
            "
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Market Cap -->
      <div class="text-right text-sm text-gray-400 flex-1 ml-4">
        <div>{{ formatNumber(crypto.market_cap) }}</div>
        <div class="text-xs">Market Cap</div>
      </div>
    </div>
  </div>
</template>
