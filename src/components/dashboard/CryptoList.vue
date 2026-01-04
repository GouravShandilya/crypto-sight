<script setup>
import { TrendingUp } from "lucide-vue-next";
import CryptoCard from "../CryptoCard.vue";

const props = defineProps({
  cryptoData: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  selectedCrypto: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["selectCrypto"]);

const selectCrypto = (crypto) => {
  emit("selectCrypto", crypto);
};
</script>

<template>
  <div class="xl:col-span-2">
    <div
      class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
    >
      <div class="p-6 border-b border-white/10">
        <h2 class="text-xl font-bold text-white flex items-center">
          <TrendingUp class="w-5 h-5 mr-2 text-green-400" />
          Top Cryptocurrencies
        </h2>
      </div>

      <div v-if="loading" class="p-8 text-center">
        <div class="animate-pulse">
          <div class="text-gray-400">Loading crypto data...</div>
        </div>
      </div>

      <div v-else class="divide-y divide-white/5">
        <CryptoCard
          v-for="crypto in cryptoData"
          :key="crypto.id"
          :crypto="crypto"
          @click="selectCrypto(crypto)"
          :class="
            selectedCrypto?.id === crypto.id
              ? 'bg-[rgba(255,255,255,0.1)]'
              : 'hover:bg-white/5'
          "
        />
      </div>
    </div>
  </div>
</template>
