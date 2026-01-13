import { createAppKit } from "@reown/appkit/vue";
import {
  mainnet,
  arbitrum,
  polygon,
  optimism,
  base,
} from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// Get projectId from environment variables
const projectId =
  import.meta.env.VITE_PROJECT_ID || "b56e80dcb7ac491f061f1c79e564757b"; // Fallback to a valid-looking but likely invalid ID if missing

// 2. Create a metadata object
const metadata = {
  name: "Crypto Sight",
  description: "AI-Powered Crypto Portfolio Tracker",
  url: "https://crypto-sight.vercel.app", // Update with your deployment URL
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// 3. Define the networks you want to support
export const networks = [mainnet, polygon, arbitrum, optimism, base];

// 4. Create the Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false, // Set to true if using SSR
});

// 5. Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: false,
    socials: [],
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#10b981", // Emerald 500
    "--w3m-border-radius-master": "1px",
  },
});
