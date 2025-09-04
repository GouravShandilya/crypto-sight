<script setup>
import { ref, onMounted } from "vue";
import { Newspaper, ExternalLink, Clock } from "lucide-vue-next";
import axios from "axios";

const news = ref([]);
const loading = ref(true);

// Mock news data as backup (since free news APIs have limitations)
const mockNews = [
  {
    title: "Bitcoin Reaches New All-Time High",
    description:
      "Bitcoin continues its bullish momentum as institutional adoption grows worldwide.",
    url: "#",
    publishedAt: new Date().toISOString(),
    source: { name: "CryptoDaily" },
  },
  {
    title: "Ethereum 2.0 Staking Rewards Increase",
    description:
      "Latest updates show improved staking rewards for ETH holders participating in validation.",
    url: "#",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: { name: "EthNews" },
  },
  {
    title: "DeFi TVL Surpasses $100B Milestone",
    description:
      "Total Value Locked in DeFi protocols reaches historic levels, signaling growing adoption.",
    url: "#",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: { name: "DeFi Pulse" },
  },
  {
    title: "Major Exchange Adds New Trading Pairs",
    description:
      "Leading cryptocurrency exchange expands its offerings with new altcoin trading pairs.",
    url: "#",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    source: { name: "Exchange News" },
  },
];

const fetchNews = async () => {
  try {
    // Using mock data for demo purposes
    // You can replace this with a real news API like NewsAPI, CryptoNews API, etc.
    setTimeout(() => {
      news.value = mockNews;
      loading.value = false;
    }, 1000);

    // Example of real API call (commented out):
    /*
    const response = await axios.get(
      'https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&apiKey=YOUR_API_KEY'
    )
    news.value = response.data.articles.slice(0, 5)
    loading.value = false
    */
  } catch (error) {
    console.error("Error fetching news:", error);
    news.value = mockNews;
    loading.value = false;
  }
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${Math.floor(diffInHours / 24)}d ago`;
};

onMounted(() => {
  fetchNews();
});
</script>

<template>
  <div
    class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
  >
    <div class="p-6 border-b border-white/10">
      <h2 class="text-xl font-bold text-white flex items-center">
        <Newspaper class="w-5 h-5 mr-2 text-orange-400" />
        Crypto News
      </h2>
    </div>

    <div v-if="loading" class="p-6">
      <div class="space-y-4">
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="h-4 bg-white/10 rounded mb-2"></div>
          <div class="h-3 bg-white/5 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <div v-else class="divide-y divide-white/5">
      <article
        v-for="article in news"
        :key="article.title"
        class="p-4 hover:bg-white/5 transition-colors group cursor-pointer"
      >
        <div class="space-y-2">
          <h3
            class="text-white font-medium line-clamp-2 group-hover:text-purple-400 transition-colors"
          >
            {{ article.title }}
          </h3>

          <p class="text-gray-400 text-sm line-clamp-2">
            {{ article.description }}
          </p>

          <div class="flex items-center justify-between text-xs text-gray-500">
            <div class="flex items-center space-x-2">
              <span>{{ article.source.name }}</span>
              <span>•</span>
              <div class="flex items-center space-x-1">
                <Clock class="w-3 h-3" />
                <span>{{ formatTime(article.publishedAt) }}</span>
              </div>
            </div>
            <ExternalLink
              class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </article>
    </div>

    <div class="p-4 border-t border-white/10">
      <button
        class="w-full py-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
      >
        View More News →
      </button>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
