<script setup>
import { ref, onMounted } from "vue";
import { TrendingUp } from "lucide-vue-next";
import axios from "axios";

const heroStats = ref({
  totalMarketCap: 0,
  btcPrice: 0,
  ethPrice: 0,
  loading: true,
});

const fetchHeroData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_market_cap=true"
    );

    heroStats.value = {
      totalMarketCap:
        response.data.bitcoin.usd_market_cap +
        response.data.ethereum.usd_market_cap,
      btcPrice: response.data.bitcoin.usd,
      ethPrice: response.data.ethereum.usd,
      loading: false,
    };
  } catch (error) {
    console.error("Error fetching hero data:", error);
    heroStats.value.loading = false;
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

onMounted(() => {
  fetchHeroData();
});
</script>

<template>
  <section
    class="relative overflow-hidden min-h-[90vh] flex items-center justify-center gap-12"
  >
    <!-- <div class="absolute inset-0"></div> -->
    <div
      class="container px-6 py-20 relative flex items-center justify-end"
      style="width: fit-content; margin-left: 0%; margin-right: 0%"
    >
      <div class="text-start max-w-4xl stagger-animation">
        <h1 class="text-5xl md:text-8xl font-bold mb-6 text-foreground">
          <span> Track Crypto </span>
          <br />
          <span>Like a Pro</span>
        </h1>

        <p class="text-xl text-gray-300 mb-8 leading-relaxed">
          Real-time cryptocurrency tracking, portfolio analytics,
          <br class="hidden md:block" />
          and market insights all in one beautiful dashboard
        </p>

        <!-- Live Price Ticker -->
        <div
          v-if="!heroStats.loading"
          class="flex flex-wrap justify-start gap-6 mb-12"
        >
          <div
            class="bg-white/4 backdrop-blur-sm rounded-lg px-6 py-3 hover-lift animate-fade-in-scale"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center animate-glow"
              >
                <span class="text-white font-bold text-sm">₿</span>
              </div>
              <div>
                <p class="text-gray-400 text-sm">Bitcoin</p>
                <p class="text-white font-bold">
                  {{ formatPrice(heroStats.btcPrice) }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="bg-white/4 backdrop-blur-sm rounded-lg px-6 py-3 hover-lift animate-fade-in-scale"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-glow"
              >
                <span class="text-white font-bold text-sm">Ξ</span>
              </div>
              <div>
                <p class="text-gray-400 text-sm">Ethereum</p>
                <p class="text-white font-bold">
                  {{ formatPrice(heroStats.ethPrice) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-start items-center">
          <router-link
            to="/dashboard"
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-purple-500/25 hover-lift"
          >
            <span>Start Tracking Now</span>
            <TrendingUp class="w-5 h-5" />
          </router-link>

          <a
            href="#features"
            class="text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover-lift"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
    <div class="svg animate">
      <img
        src="@/assets/logo.svg"
        alt="logo"
        class="p-6 h-[800px] w-[800px]"
        loading="eager"
      />
    </div>
  </section>
</template>
<style scoped>
.animate {
  pointer-events: none;
  animation: rotate 12s linear infinite;
}
@keyframes rotate {
  0% {
    scale: 1.1;
    transform: rotate(0deg);
    filter: blur(1px);
  }
  100% {
    scale: 1.1;
    transform: rotate(360deg);
    filter: blur(1px);
  }
}
</style>
