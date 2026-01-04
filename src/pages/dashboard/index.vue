<script setup>
import HeaderSection from "../landingPage/HeaderSection.vue";
import DashboardContainer from "../../components/dashboard/DashboardContainer.vue";
import MarketStats from "../../components/dashboard/MarketStats.vue";
import CryptoList from "../../components/dashboard/CryptoList.vue";
import ChartSection from "../../components/dashboard/ChartSection.vue";
import RightSidebar from "../../components/dashboard/RightSidebar.vue";
</script>

<template>
  <div class="min-h-screen bg-background text-foreground dark flex">
    <div class="flex-1 transition-all duration-300">
      <HeaderSection />

      <DashboardContainer
        v-slot="{
          cryptoData,
          marketStats,
          loading,
          selectedCrypto,
          formatNumber,
          selectCrypto,
        }"
      >
        <MarketStats :marketStats="marketStats" :formatNumber="formatNumber" />

        <main class="container mx-auto px-6 pb-8">
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div class="xl:col-span-2 space-y-8">
              <CryptoList
                :cryptoData="cryptoData"
                :loading="loading"
                :selectedCrypto="selectedCrypto"
                @selectCrypto="selectCrypto"
              />

              <ChartSection :selectedCrypto="selectedCrypto" />
            </div>

            <RightSidebar />
          </div>
        </main>
      </DashboardContainer>
    </div>
  </div>
</template>
