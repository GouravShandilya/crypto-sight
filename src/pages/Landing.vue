<script setup>
import { ref, onMounted } from "vue";
import {
  TrendingUp,
  Shield,
  Eye,
  Zap,
  BarChart3,
  Globe,
  Users,
  ChevronRight,
  Activity,
  DollarSign,
  Wallet,
  Bell,
} from "lucide-vue-next";
import axios from "axios";

// Sample crypto data for hero section
const heroStats = ref({
  totalMarketCap: 0,
  btcPrice: 0,
  ethPrice: 0,
  loading: true,
});

const cryptoAdoptionStats = ref([
  { year: "2020", users: "100M+", adoption: "3%" },
  { year: "2021", users: "300M+", adoption: "6%" },
  { year: "2022", users: "420M+", adoption: "8%" },
  { year: "2023", users: "580M+", adoption: "12%" },
  { year: "2024", users: "800M+", adoption: "15%" },
]);

const features = ref([
  {
    icon: Activity,
    title: "Real-Time Tracking",
    description: "Monitor cryptocurrency prices with live updates every minute",
    color: "text-green-400",
  },
  {
    icon: BarChart3,
    title: "Portfolio Analytics",
    description: "Advanced analytics to track your portfolio performance",
    color: "text-blue-400",
  },
  {
    icon: Globe,
    title: "Global News Feed",
    description: "Stay updated with latest crypto news and market insights",
    color: "text-purple-400",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data stays secure with advanced encryption",
    color: "text-orange-400",
  },
]);

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

const formatMarketCap = (cap) => {
  if (cap >= 1e12) return "$" + (cap / 1e12).toFixed(2) + "T";
  if (cap >= 1e9) return "$" + (cap / 1e9).toFixed(2) + "B";
  return "$" + cap.toLocaleString();
};

onMounted(() => {
  fetchHeroData();
});
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-white"
  >
    <!-- Header -->
    <header class="glass sticky top-0 z-50 border-b border-white/10">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3 animate-slide-in-left">
            <div
              class="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center animate-float"
            >
              <Activity class="w-6 h-6 text-white" />
            </div>
            <h1 class="text-2xl font-bold gradient-text">CryptoSight</h1>
          </div>
          <router-link
            to="/dashboard"
            class="btn-primary hover-lift hover-glow animate-slide-in-right"
          >
            <span>Launch Dashboard</span>
            <ChevronRight class="w-4 h-4 ml-2" />
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden min-h-screen flex items-center">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20"
        ></div>
        <div
          class="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute top-32 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"
        ></div>
        <div
          class="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"
        ></div>
      </div>

      <!-- Floating Grid Pattern -->
      <div class="absolute inset-0 opacity-20">
        <div
          class="absolute inset-0"
          style="
            background-image: radial-gradient(
              circle at 1px 1px,
              rgba(255, 255, 255, 0.15) 1px,
              transparent 0
            );
            background-size: 40px 40px;
          "
        ></div>
      </div>

      <div class="container mx-auto px-6 py-20 relative z-10">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Hero Badge -->
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm mb-8 animate-fade-in-scale"
          >
            <span
              class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"
            ></span>
            <span class="text-sm font-medium text-purple-300"
              >Live Market Data • 24/7 Tracking</span
            >
          </div>

          <!-- Main Heading with Enhanced Typography -->
          <h1
            class="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight"
          >
            <span class="block">
              <span
                class="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-shimmer"
              >
                Track
              </span>
              <span
                class="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-shimmer delay-300"
              >
                Crypto
              </span>
            </span>
            <span class="block mt-4 text-white/90 relative">
              Like a
              <span class="relative inline-block">
                <span
                  class="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                  >Pro</span
                >
                <span
                  class="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"
                ></span>
              </span>
            </span>
          </h1>

          <!-- Enhanced Subtitle -->
          <p
            class="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Experience the future of cryptocurrency tracking with
            <span class="text-purple-400 font-semibold"
              >real-time analytics</span
            >,
            <span class="text-blue-400 font-semibold">AI-powered insights</span
            >, and
            <span class="text-green-400 font-semibold">professional tools</span>
          </p>

          <!-- Live Price Ticker with Enhanced Design -->
          <div
            v-if="!heroStats.loading"
            class="flex flex-wrap justify-center gap-8 mb-16"
          >
            <div class="crypto-ticker-enhanced group">
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center animate-glow"
                  >
                    <span class="text-white font-bold text-lg">₿</span>
                  </div>
                  <div
                    class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"
                  ></div>
                </div>
                <div class="text-left">
                  <p class="text-gray-400 text-sm font-medium">Bitcoin</p>
                  <p class="text-white font-bold text-xl">
                    {{ formatPrice(heroStats.btcPrice) }}
                  </p>
                  <p class="text-green-400 text-sm">+2.4%</p>
                </div>
              </div>
            </div>

            <div class="crypto-ticker-enhanced group">
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-glow"
                  >
                    <span class="text-white font-bold text-lg">Ξ</span>
                  </div>
                  <div
                    class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"
                  ></div>
                </div>
                <div class="text-left">
                  <p class="text-gray-400 text-sm font-medium">Ethereum</p>
                  <p class="text-white font-bold text-xl">
                    {{ formatPrice(heroStats.ethPrice) }}
                  </p>
                  <p class="text-green-400 text-sm">+1.8%</p>
                </div>
              </div>
            </div>

            <!-- Market Cap Display -->
            <div class="crypto-ticker-enhanced group">
              <div class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-glow"
                >
                  <Activity class="w-6 h-6 text-white" />
                </div>
                <div class="text-left">
                  <p class="text-gray-400 text-sm font-medium">Market Cap</p>
                  <p class="text-white font-bold text-xl">
                    {{ formatMarketCap(heroStats.totalMarketCap) }}
                  </p>
                  <p class="text-green-400 text-sm">+3.2%</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <router-link
              to="/dashboard"
              class="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span
                class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"
              ></span>
              <span class="relative flex items-center">
                <TrendingUp class="w-6 h-6 mr-3" />
                Start Tracking Now
                <ChevronRight
                  class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                />
              </span>
            </router-link>

            <a
              href="#features"
              class="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/5 transition-all duration-300 transform hover:scale-105"
            >
              <Eye class="w-6 h-6 mr-3" />
              Explore Features
            </a>
          </div>

          <!-- Trust Indicators -->
          <div
            class="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
          >
            <div class="flex items-center">
              <Shield class="w-4 h-4 mr-2 text-green-400" />
              <span>Bank-level Security</span>
            </div>
            <div class="flex items-center">
              <Users class="w-4 h-4 mr-2 text-blue-400" />
              <span>1M+ Active Users</span>
            </div>
            <div class="flex items-center">
              <Zap class="w-4 h-4 mr-2 text-yellow-400" />
              <span>Real-time Updates</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <div
          class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <div
            class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"
          ></div>
        </div>
      </div>
    </section>

    <!-- Crypto Adoption Stats -->
    <section class="py-20 bg-gray-900/50 dark:bg-black/20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">
            The World is Adopting
            <span
              class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >Crypto</span
            >
          </h2>
          <p class="text-gray-300 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Cryptocurrency adoption is growing exponentially worldwide. Be part
            of the financial revolution.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div
            v-for="(stat, index) in cryptoAdoptionStats"
            :key="stat.year"
            class="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 dark:border-white/10 text-center hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300"
            :class="
              index === cryptoAdoptionStats.length - 1
                ? 'md:border-purple-500/50 md:bg-purple-500/10'
                : ''
            "
          >
            <h3 class="text-2xl font-bold text-white mb-2">{{ stat.year }}</h3>
            <p class="text-purple-400 font-semibold text-lg mb-1">
              {{ stat.users }}
            </p>
            <p class="text-gray-300 dark:text-gray-400 text-sm">
              {{ stat.adoption }} Global Adoption
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gray-900/30 dark:bg-gray-900/50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">
            Why Choose
            <span
              class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >CryptoSight</span
            >
          </h2>
          <p class="text-gray-300 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to manage and track your cryptocurrency
            portfolio in one place
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/20 dark:hover:border-white/20 transition-all duration-300 group"
          >
            <div class="mb-6">
              <component
                :is="feature.icon"
                :class="[
                  feature.color,
                  'w-12 h-12 group-hover:scale-110 transition-transform duration-300',
                ]"
              />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-300 dark:text-gray-400 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Management Showcase -->
    <section class="py-20 bg-black/30 dark:bg-black/20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-white mb-6">
              Manage Your Portfolio
              <span
                class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >Effortlessly</span
              >
            </h2>
            <p
              class="text-gray-300 dark:text-gray-400 text-lg mb-8 leading-relaxed"
            >
              No more switching between multiple apps. Track all your
              investments, analyze performance, and stay updated with market
              news in one unified dashboard.
            </p>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center"
                >
                  <Wallet class="w-4 h-4 text-green-400" />
                </div>
                <span class="text-white">Track multiple portfolios</span>
              </div>
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center"
                >
                  <BarChart3 class="w-4 h-4 text-blue-400" />
                </div>
                <span class="text-white">Advanced analytics & insights</span>
              </div>
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center"
                >
                  <Bell class="w-4 h-4 text-purple-400" />
                </div>
                <span class="text-white">Real-time price alerts</span>
              </div>
            </div>

            <router-link
              to="/dashboard"
              class="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 mt-8"
            >
              <span>Try It Now</span>
              <ChevronRight class="w-5 h-5" />
            </router-link>
          </div>

          <div class="relative">
            <div
              class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <!-- Mock Dashboard Preview -->
              <div class="space-y-4">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-white font-semibold">Portfolio Overview</h3>
                  <div
                    class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                  ></div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-white/10 rounded-lg p-4">
                    <p class="text-gray-400 text-sm">Total Value</p>
                    <p class="text-white font-bold text-xl">$45,230</p>
                  </div>
                  <div class="bg-white/10 rounded-lg p-4">
                    <p class="text-gray-400 text-sm">24h Change</p>
                    <p class="text-green-400 font-bold text-xl">+12.5%</p>
                  </div>
                </div>

                <div class="space-y-3">
                  <div
                    class="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-orange-500 rounded-full"></div>
                      <span class="text-white">Bitcoin</span>
                    </div>
                    <span class="text-white font-semibold">$28,420</span>
                  </div>
                  <div
                    class="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <span class="text-white">Ethereum</span>
                    </div>
                    <span class="text-white font-semibold">$16,810</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div
          class="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-12 text-center border border-white/10"
        >
          <h2 class="text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your
            <span
              class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >Crypto Journey?</span
            >
          </h2>
          <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust CryptoSight for their
            cryptocurrency tracking and portfolio management needs.
          </p>

          <router-link
            to="/dashboard"
            class="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-xl font-semibold text-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/25"
          >
            <span>Launch Dashboard</span>
            <TrendingUp class="w-6 h-6" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-white/10 bg-black/20">
      <div class="container mx-auto px-6">
        <div class="flex items-center justify-center space-x-3">
          <div
            class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
          >
            <Activity class="w-5 h-5 text-white" />
          </div>
          <span
            class="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            CryptoSight
          </span>
        </div>
        <p class="text-center text-gray-400 mt-4">
          © 2025 CryptoSight. Built with ❤️ for crypto enthusiasts.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
