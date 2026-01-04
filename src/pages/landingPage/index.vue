<script setup>
import HeroSection from "./HeroSection.vue";
import StatsSection from "./StatsSection.vue";
import CallToAction from "./CallToAction.vue";
import FooterSection from "./FooterSection.vue";
import HeaderSection from "./HeaderSection.vue";
import HeroDataSafety from "./HeroDataSafety.vue";
import FeaturesSection from "./FeaturesSection.vue";
import PortfolioShowcase from "./PortfolioShowcase.vue";
</script>

<template>
  <div class="min-h-screen bg-background text-foreground dark overflow-hidden">
    <HeaderSection />
    <HeroSection />
    <StatsSection />
    <FeaturesSection />
    <PortfolioShowcase />
    <HeroDataSafety />
    <CallToAction />
    <FooterSection />
  </div>
</template>
