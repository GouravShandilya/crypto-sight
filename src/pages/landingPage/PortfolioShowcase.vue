<script setup>
import { Wallet, BarChart3, Bell, ChevronRight } from "lucide-vue-next";
</script>

<template>
  <section class="py-20 bg-card/20">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="animate-slide-in-left">
          <h2 class="text-4xl font-bold text-foreground mb-6">
            Manage Your Portfolio
            <span class="gradient-text">Effortlessly</span>
          </h2>
          <p class="text-muted-foreground text-lg mb-8 leading-relaxed">
            No more switching between multiple apps. Track all your investments,
            analyze performance, and stay updated with market news in one
            unified dashboard.
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-chart-1/20 rounded-full flex items-center justify-center"
              >
                <Wallet class="w-4 h-4 text-chart-1" />
              </div>
              <span class="text-foreground">Track multiple portfolios</span>
            </div>
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-chart-2/20 rounded-full flex items-center justify-center"
              >
                <BarChart3 class="w-4 h-4 text-chart-2" />
              </div>
              <span class="text-foreground">Advanced analytics & insights</span>
            </div>
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-chart-3/20 rounded-full flex items-center justify-center"
              >
                <Bell class="w-4 h-4 text-chart-3" />
              </div>
              <span class="text-foreground">Real-time price alerts</span>
            </div>
          </div>

          <router-link
            to="/dashboard"
            class="btn-primary hover-lift hover-glow text-lg px-8 py-4 rounded-xl"
          >
            <span>Try It Now</span>
            <ChevronRight class="w-5 h-5 ml-2" />
          </router-link>
        </div>

        <div class="relative animate-slide-in-right">
          <div class="glass-strong rounded-2xl p-8 border">
            <!-- Mock Dashboard Preview -->
            <div class="space-y-4">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-foreground font-semibold">
                  Portfolio Overview
                </h3>
                <div
                  class="w-2 h-2 bg-chart-1 rounded-full animate-pulse"
                ></div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="bg-card/50 rounded-lg p-4">
                  <p class="text-muted-foreground text-sm">Total Value</p>
                  <p class="text-foreground font-bold text-xl">$45,230</p>
                </div>
                <div class="bg-card/50 rounded-lg p-4">
                  <p class="text-muted-foreground text-sm">24h Change</p>
                  <p class="text-chart-1 font-bold text-xl">+12.5%</p>
                </div>
              </div>

              <div class="space-y-3">
                <div
                  class="flex items-center justify-between p-3 bg-card/30 rounded-lg hover-lift"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-orange-500 rounded-full"></div>
                    <span class="text-foreground">Bitcoin</span>
                  </div>
                  <span class="text-foreground font-semibold">$28,420</span>
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-card/30 rounded-lg hover-lift"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <span class="text-foreground">Ethereum</span>
                  </div>
                  <span class="text-foreground font-semibold">$16,810</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
