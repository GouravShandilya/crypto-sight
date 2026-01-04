<template>
  <section class="py-20 bg-black/20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">
          The World is Adopting
          <span
            class="bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent"
            >Crypto</span
          >
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Cryptocurrency adoption is growing exponentially worldwide. Be part of
          the financial revolution.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div
          v-for="(stat, index) in cryptoAdoptionStats"
          :key="stat.year"
          class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 hover-lift"
          :class="
            index === cryptoAdoptionStats.length - 1
              ? 'border-2 bg-white/10'
              : ''
          "
        >
          <h3 class="text-2xl font-bold text-white mb-2">{{ stat.year }}</h3>
          <p class="from-gray-500 to-gray-700 font-semibold text-lg mb-1">
            {{ stat.users }}
          </p>
          <p class="text-gray-400 text-sm">
            {{ stat.adoption }} Global Adoption
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";

const cryptoAdoptionStats = ref([
  { year: "2020", users: "100M+", adoption: "3%" },
  { year: "2021", users: "300M+", adoption: "6%" },
  { year: "2022", users: "420M+", adoption: "8%" },
  { year: "2023", users: "580M+", adoption: "12%" },
  { year: "2024", users: "800M+", adoption: "15%" },
]);
</script>
