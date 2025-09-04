<script setup>
import { Activity, ChevronRight } from "lucide-vue-next";
import ConnectWallet from "@/components/ConnectWallet.vue";
</script>

<template>
  <header
    class="glass sticky w-full top-0 z-50 mx-auto backdrop-blur-md flex items-center justify-between container"
  >
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3 animate-slide-in-left">
          <div
            class="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center"
          >
            <Activity class="w-6 h-6 text-white" />
          </div>
          <h1 class="text-2xl font-bold">CryptoSight</h1>
        </div>
        <div
          class="flex items-center gap-[4rem] animate-slide-in-right"
          v-if="false"
        >
          <router-link
            to="/dashboard"
            class="btn-primary hover-lift hover-glow animate-slide-in-right"
          >
            <span>Dashboard</span>
          </router-link>
          <router-link
            to="/dashboard"
            class="btn-primary hover-lift hover-glow animate-slide-in-right"
          >
            <span>Earn</span>
          </router-link>
          <router-link
            to="/dashboard"
            class="btn-primary hover-lift hover-glow animate-slide-in-right"
          >
            <span>Resources</span>
          </router-link>
          <router-link
            to="/dashboard"
            class="btn-primary hover-lift hover-glow animate-slide-in-right"
          >
            <span>More</span>
          </router-link>
        </div>

        <ConnectWallet />
      </div>
    </div>
  </header>
</template>
<style scoped>
.glass {
  backdrop-filter: blur(10px);
  background-color: transparent;
}
</style>
