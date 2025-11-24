/**
 * Configuração do Wagmi
 * 
 * Configuração para integração com wagmi hooks
 * 
 * IMPORTANTE: Os contratos estão deployados na Polygon Mainnet (Chain ID: 137)
 */

import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { getChainId } from './contractData';

// Obter chain ID da configuração (padrão: 137 = Polygon Mainnet)
const CHAIN_ID = getChainId();

// Validar que estamos usando Polygon Mainnet (onde os contratos estão deployados)
if (CHAIN_ID !== 137) {
  console.warn(
    `⚠️ ATENÇÃO: Chain ID configurado é ${CHAIN_ID}, mas os contratos estão deployados na Polygon Mainnet (137). ` +
    `Alguns recursos podem não funcionar corretamente.`
  );
}

// Configuração do Wagmi - usando Polygon Mainnet (onde os contratos estão)
export const wagmiConfig = createConfig({
  chains: [polygon], // Polygon Mainnet (Chain ID: 137)
  transports: {
    [polygon.id]: http(
      process.env.NEXT_PUBLIC_POLYGON_RPC_URL || 
      process.env.POLYGON_RPC_URL ||
      'https://polygon-rpc.com'
    ),
  },
  ssr: true, // Suporte para SSR do Next.js
});

