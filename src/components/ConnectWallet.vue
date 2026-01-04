<template>
  <Button
    @click="toggleModal"
    v-if="!isOpen"
    class="border btn-primary hover-lift hover-glow animate-slide-in-right py-3 px-4 rounded-md cursor-pointer"
  >
    Connect Wallet
  </Button>
  <div
    class="absolute h-screen w-full top-0 left-0 bg-black/50 flex items-center justify-center"
    v-if="isOpen"
    @click.self="toggleModal"
    style="
      z-index: 1000;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    "
  >
    <div class="h-[500px] w-lg bg-[rgb(40,40,40)] rounded-lg shadow-lg border">
      <div class="flex items-center justify-between p-4">
        <h2 class="text-lg font-medium text-white">Connect Wallet</h2>
        <button
          @click="toggleModal"
          class="text-gray-400 hover:text-white text-lg"
        >
          &times;
        </button>
      </div>
      <div class="p-4 space-y-4">
        <div
          v-for="wallet in wallets"
          :key="wallet.name"
          class="flex items-center p-3 bg-[rgb(60,60,60)] rounded-lg hover:bg-gray-600 cursor-pointer"
          @click="selectWallet(wallet)"
        >
          <img
            :src="wallet.icon"
            alt="Wallet Icon"
            class="w-8 h-8 mr-3 object-cover rounded-md"
          />
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
    value: "metamask",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png",
    description: "Connect with MetaMask wallet",
  },
  {
    name: "Coinbase Wallet",
    value: "coinbase",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrsGvCOafDWtToGT7WtdXkcoQIc64uyVsCw&s",
    description: "Connect with Coinbase wallet",
  },
  {
    name: "WalletConnect",
    value: "walletconnect",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBvOsv34Wmr5G9ZQPszyYMX9h424OlH2ZqPw&s",
    description: "Connect with WalletConnect",
  },
]);

function selectWallet(wallet) {
  console.log(`Selected wallet: ${wallet.name}`);
  if (wallet.value === "metamask") {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log("Connected to MetaMask:", accounts);
        })
        .catch((error) => {
          console.error("Error connecting to MetaMask:", error);
        });
    } else {
      alert("Please install MetaMask!");
    }
    // Logic to connect with MetaMask
  } else if (wallet.value === "coinbase") {
    // Logic to connect with Coinbase Wallet
  } else if (wallet.value === "walletconnect") {
    // Logic to connect with WalletConnect
  }
  toggleModal();
}
</script>

<style lang="scss" scoped></style>
