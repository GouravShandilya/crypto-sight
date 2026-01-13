<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-vue-next";
import axios from "axios";

const props = defineProps({
  crypto: {
    type: Object,
    required: true,
  },
});

const chartData = ref([]);
const timeRange = ref("7");
const loading = ref(true);
const chartContainer = ref(null);

const timeRanges = [
  { value: "1", label: "24H" },
  { value: "7", label: "7D" },
  { value: "30", label: "30D" },
  { value: "365", label: "1Y" },
];

const fetchChartData = async () => {
  setTimeout(() => {
    loading.value = false;
  }, 500); // Simulate loading delay
  if (!props.crypto) return;

  loading.value = true;
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${props.crypto.id}/market_chart?vs_currency=usd&days=${timeRange.value}`
    );
    chartData.value = response.data.prices;
    loading.value = false;
    drawChart();
  } catch (error) {
    console.error("Error fetching chart data:", error);
    loading.value = false;
  }
};

const drawChart = () => {
  if (!chartContainer.value || !chartData.value.length) return;

  const canvas = chartContainer.value;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();

  // Set canvas size
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const width = rect.width;
  const height = rect.height;
  const padding = 20;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Get price data
  const prices = chartData.value.map((point) => point[1]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  // Determine color based on performance
  const startPrice = prices[0];
  const endPrice = prices[prices.length - 1];
  const isPositive = endPrice >= startPrice;
  const color = isPositive ? "#10b981" : "#ef4444";

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
  gradient.addColorStop(0, color + "20");
  gradient.addColorStop(1, color + "00");

  // Draw price line
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const points = [];
  prices.forEach((price, index) => {
    const x = padding + (index / (prices.length - 1)) * (width - 2 * padding);
    const y =
      height -
      padding -
      ((price - minPrice) / priceRange) * (height - 2 * padding);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    points.push({ x, y });
  });

  ctx.stroke();

  // Draw filled area
  ctx.beginPath();
  ctx.fillStyle = gradient;
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.lineTo(points[points.length - 1].x, height - padding);
  ctx.lineTo(points[0].x, height - padding);
  ctx.closePath();
  ctx.fill();
};

watch(() => props.crypto, fetchChartData, { immediate: true });
watch(timeRange, fetchChartData);

onMounted(() => {
  window.addEventListener("resize", drawChart);
});

onUnmounted(() => {
  window.removeEventListener("resize", drawChart);
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(price);
};

const getPriceChange = () => {
  if (!chartData.value.length) return { value: 0, percentage: 0 };

  const startPrice = chartData.value[0][1];
  const endPrice = chartData.value[chartData.value.length - 1][1];
  const change = endPrice - startPrice;
  const percentage = (change / startPrice) * 100;

  return { value: change, percentage };
};
</script>

<template>
  <div
    class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
  >
    <div class="p-6 border-b border-white/10">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <img
            :src="crypto.image"
            :alt="crypto.name"
            class="w-8 h-8 rounded-full"
          />
          <div>
            <h3 class="text-lg font-bold text-white flex items-center">
              <BarChart3 class="w-5 h-5 mr-2 text-blue-400" />
              {{ crypto.name }} Price Chart
            </h3>
            <p class="text-gray-400 text-sm">
              {{ crypto.symbol.toUpperCase() }}/USD
            </p>
          </div>
        </div>

        <!-- Time Range Selector -->
        <div class="flex space-x-1 bg-white/10 rounded-lg p-1">
          <button
            v-for="range in timeRanges"
            :key="range.value"
            @click="timeRange = range.value"
            :class="[
              'px-3 py-1 text-sm font-medium rounded transition-colors',
              timeRange === range.value
                ? 'bg-purple-500 text-white'
                : 'text-gray-400 hover:text-white',
            ]"
          >
            {{ range.label }}
          </button>
        </div>
      </div>

      <!-- Price Info -->
      <div
        v-if="!loading && chartData.length"
        class="flex items-center space-x-4 mb-4"
      >
        <div>
          <p class="text-2xl font-bold text-white">
            {{ formatPrice(crypto.current_price) }}
          </p>
        </div>
        <div
          class="flex items-center space-x-1"
          :class="
            getPriceChange().percentage >= 0 ? 'text-green-400' : 'text-red-400'
          "
        >
          <component
            :is="getPriceChange().percentage >= 0 ? TrendingUp : TrendingDown"
            class="w-4 h-4"
          />
          <span class="font-medium">
            {{ formatPrice(Math.abs(getPriceChange().value)) }}
            ({{ Math.abs(getPriceChange().percentage).toFixed(2) }}%)
          </span>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="p-6">
      <div v-if="loading" class="h-64 flex items-center justify-center">
        <div class="text-gray-400">Loading chart data...</div>
      </div>

      <div v-else class="h-64 relative">
        <canvas ref="chartContainer" class="w-full h-full"></canvas>
      </div>
    </div>
  </div>
</template>
