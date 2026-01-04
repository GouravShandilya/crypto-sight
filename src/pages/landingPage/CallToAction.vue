<template>
  <section class="py-20">
    <div class="container mx-auto px-6">
      <div
        class="gradient-accent/20 rounded-3xl p-12 text-center border border-border"
      >
        <h2 class="text-4xl font-bold text-foreground mb-4">
          Ready to Take Control of Your
          <span
            class="bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent"
            >Crypto Journey?</span
          >
        </h2>
        <p class="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust CryptoSight for their cryptocurrency
          tracking and portfolio management needs.
        </p>

        <router-link
          to="/dashboard"
          class="mt-4 hover-lift text-xl px-10 py-5 rounded-xl shadow-lg border border-gray-500 w-fit"
        >
          <span>Launch Dashboard</span>
        </router-link>
      </div>
    </div>
  </section>
</template>
