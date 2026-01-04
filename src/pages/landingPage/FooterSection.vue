<template>
  <footer class="py-12 border-t bg-card/20">
    <div class="container mx-auto px-6">
      <RouterLink to="/" class="flex items-center justify-center">
        <div
          class="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center"
        >
          <Activity class="w-6 h-6 text-white" />
        </div>
        <h1 class="text-2xl font-bold">CryptoSight</h1>
      </RouterLink>
      <p class="text-center text-muted-foreground mt-4">
        © 2026 CryptoSight. Built with for crypto enthusiasts.
      </p>
    </div>
  </footer>
</template>
<script setup>
import { Activity } from "lucide-vue-next";
</script>
