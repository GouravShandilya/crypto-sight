import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { getAccount, watchAccount, getBalance } from "@wagmi/core";
import { wagmiAdapter } from "@/config/wagmi";
import { formatEther } from "viem";

export const usePortfolioStore = defineStore("portfolio", () => {
  const address = ref(null);
  const isConnected = ref(false);
  const chainId = ref(null);
  const balance = ref("0");
  const tokens = ref([]);
  const transactions = ref([]);
  const isLoading = ref(false);

  // Initialize wallet watcher
  const init = () => {
    watchAccount(wagmiAdapter.wagmiConfig, {
      onChange: async (account) => {
        address.value = account.address;
        isConnected.value = account.isConnected;
        chainId.value = account.chainId;

        if (account.isConnected && account.address) {
          await fetchPortfolioData(account.address);
        } else {
          resetState();
        }
      },
    });
  };

  const resetState = () => {
    balance.value = "0";
    tokens.value = [];
    transactions.value = [];
  };

  const fetchPortfolioData = async (userAddress) => {
    isLoading.value = true;
    try {
      // 1. Fetch Native Balance
      const nativeBalance = await getBalance(wagmiAdapter.wagmiConfig, {
        address: userAddress,
      });
      balance.value = formatEther(nativeBalance.value);

      // 2. Fetch Assets (Mocking specific tokens for Demo without Indexer Key)
      // In a production app, use Covalent/Moralis API here.
      // For this resume demo, we'll check a few popular token balances if on Mainnet
      // or just show the native token + some generated "Previous Activity"

      // TODO: Integrate Covalent API for real token list
      // For now, we populate with the Native Token as an asset
      tokens.value = [
        {
          symbol: nativeBalance.symbol,
          name: "Native Token",
          balance: formatEther(nativeBalance.value),
          value: (parseFloat(formatEther(nativeBalance.value)) * 2000).toFixed(
            2
          ), // Mock price $2000
          price: 2000,
          change24h: 2.5,
        },
      ];
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const totalValue = computed(() => {
    return tokens.value.reduce(
      (acc, token) => acc + parseFloat(token.value || 0),
      0
    );
  });

  return {
    address,
    isConnected,
    chainId,
    balance,
    tokens,
    transactions,
    isLoading,
    totalValue,
    init,
  };
});
