<template>
  <div
    class="glass-card p-6 rounded-xl border border-gray-700/50 relative overflow-hidden"
  >
    <!-- Background Glow -->
    <div
      class="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
    ></div>

    <div class="flex items-center justify-between mb-4 relative z-10">
      <h3 class="text-lg font-semibold text-white flex items-center gap-2">
        <span class="text-xl">✨</span> AI Portfolio Advisor
      </h3>
      <button
        @click="analyzePortfolio"
        :disabled="loading || !hasPortfolio"
        class="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full transition-colors disabled:opacity-50 flex items-center gap-1"
      >
        <span v-if="loading" class="animate-spin">⟳</span>
        {{ loading ? "Analyzing..." : "Refresh Insights" }}
      </button>
    </div>

    <div v-if="!hasPortfolio" class="text-gray-400 text-sm text-center py-4">
      Connect your wallet to receive AI-powered insights.
    </div>

    <div v-else class="relative z-10 min-h-[100px]">
      <div v-if="insight" class="prose prose-invert prose-sm max-w-none">
        <div
          v-html="renderedInsight"
          class="text-gray-300 text-sm leading-relaxed animate-fade-in"
        ></div>
      </div>
      <div
        v-else-if="!loading"
        class="text-center text-gray-500 text-sm italic"
      >
        Click refresh to get analysis...
      </div>

      <!-- Skeleton Loader -->
      <div v-if="loading" class="space-y-2 animate-pulse">
        <div class="h-4 bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePortfolioStore } from "@/stores/portfolioStore";
import { generatePortfolioInsight } from "@/lib/gemini";
import { marked } from "marked";

// Note: You might need to install marked: npm install marked
// For now, I'll do a simple line break replacement or basic rendering.
// Ideally, use a markdown renderer.

const portfolioStore = usePortfolioStore();
const insight = ref("");
const loading = ref(false);

const hasPortfolio = computed(
  () => portfolioStore.isConnected && portfolioStore.tokens.length > 0
);

const analyzePortfolio = async () => {
  loading.value = true;
  try {
    const data = {
      userAddress: portfolioStore.address,
      chain: portfolioStore.chainId,
      totalValue: portfolioStore.totalValue,
      holdings: portfolioStore.tokens,
    };

    // Simulate slight delay for UX if API is too fast
    // await new Promise(r => setTimeout(r, 1000));

    const rawText = await generatePortfolioInsight(data);
    insight.value = rawText;
  } catch (e) {
    insight.value = "Unable to analyze portfolio at this moment.";
  } finally {
    loading.value = false;
  }
};

const renderedInsight = computed(() => {
  if (!insight.value) return "";
  // Basic markdown to HTML conversion (bolds and lists)
  return insight.value
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-300">$1</strong>')
    .replace(/\* (.*?)\n/g, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n\n/g, "<br><br>");
});
</script>

<style scoped>
.glass-card {
  background: rgba(30, 30, 35, 0.6);
  backdrop-filter: blur(10px);
}
</style>
