<script setup>
import { Activity } from "lucide-vue-next";
</script>

<template>
  <footer class="py-12 border-t bg-card/20">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-center space-x-3">
        <div
          class="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center"
        >
          <Activity class="w-5 h-5 text-white" />
        </div>
        <span class="text-xl font-bold gradient-text"> CryptoSight </span>
      </div>
      <p class="text-center text-muted-foreground mt-4">
        © 2025 CryptoSight. Built with ❤️ for crypto enthusiasts.
      </p>
    </div>
  </footer>
</template>
