<template>
  <Button
    @click="toggleModal"
    v-if="!isOpen"
    class="border btn-primary hover-lift hover-glow animate-slide-in-right py-3 px-4 rounded-md cursor-pointer"
  >
    Connect Wallet
  </Button>
  <div
    class="fixed h-full w-full top-0 left-0h-screen bg-black/50 flex items-center justify-center"
    v-if="isOpen"
    @click.self="toggleModal"
    style="
      z-index: 1000;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    "
  >
    <div class="h-[500px] w-[400px] bg-slate-900 rounded-lg shadow-lg border">
      <div class="flex items-center justify-between p-4">
        <h2 class="text-lg font-bold text-white">Connect Wallet</h2>
        <button @click="toggleModal" class="text-gray-400 hover:text-white">
          &times;
        </button>
      </div>
      <div class="p-4 space-y-4">
        <div
          v-for="wallet in wallets"
          :key="wallet.name"
          class="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer"
          @click="toggleModal"
        >
          <img :src="wallet.icon" alt="Wallet Icon" class="w-8 h-8 mr-3" />
          <div>
            <h3 class="text-white font-semibold">{{ wallet.name }}</h3>
            <p class="text-gray-400 text-sm">{{ wallet.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

//variables
const isOpen = ref(false);

const toggleModal = () => {
  isOpen.value = !isOpen.value;
};

const wallets = ref([
  {
    name: "MetaMask",
    icon: "https://example.com/metamask-icon.png",
    description: "Connect with MetaMask wallet",
  },
  {
    name: "Coinbase Wallet",
    icon: "https://example.com/coinbase-icon.png",
    description: "Connect with Coinbase wallet",
  },
  {
    name: "WalletConnect",
    icon: "https://example.com/walletconnect-icon.png",
    description: "Connect with WalletConnect",
  },
]);
</script>

<style lang="scss" scoped></style>
