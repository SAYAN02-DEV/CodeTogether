import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, polygon, arbitrum, optimism, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'CodeSync Web3',
  projectId: '5efe6d37647c829578e722a88d57589e',
  chains: [mainnet, sepolia, polygon, arbitrum, optimism, base],
  ssr: false,
});
