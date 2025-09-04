<script setup>
import { ref } from "vue";
import { Activity, BarChart3, Globe, Shield } from "lucide-vue-next";

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
</script>

<template>
  <section id="features" class="py-20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">
          Why Choose
          <span
            class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >CryptoSight</span
          >
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Everything you need to manage and track your cryptocurrency portfolio
          in one place
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation"
      >
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group hover-lift"
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
          <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
          <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
