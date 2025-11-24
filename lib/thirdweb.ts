/**
 * Configuração do Thirdweb SDK
 * 
 * Client e configuração de chains para integração com Thirdweb
 */

import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { getChainId } from "./contractData";

/**
 * Client Thirdweb
 * 
 * Usa o Client ID configurado nas variáveis de ambiente
 * O Client ID pode ser público (NEXT_PUBLIC_*)
 */
export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

/**
 * Polygon Mainnet Chain Configuration
 */
export const polygonMainnet = defineChain({
  id: 137,
  name: "Polygon",
  nativeCurrency: { 
    name: "MATIC", 
    symbol: "MATIC", 
    decimals: 18 
  },
  rpc: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://polygon-rpc.com",
});

/**
 * Polygon Amoy Testnet Chain Configuration
 */
export const polygonAmoy = defineChain({
  id: 80002,
  name: "Polygon Amoy",
  nativeCurrency: { 
    name: "MATIC", 
    symbol: "MATIC", 
    decimals: 18 
  },
  rpc: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://rpc-amoy.polygon.technology",
});

/**
 * Get the active chain based on environment configuration
 * 
 * Usa a mesma lógica do contractData.ts para determinar qual chain usar
 */
export function getActiveChain() {
  const chainId = getChainId();
  
  switch (chainId) {
    case 137:
      return polygonMainnet;
    case 80002:
      return polygonAmoy;
    default:
      // Default para Polygon Mainnet se não especificado
      return polygonMainnet;
  }
}

/**
 * Helper para obter o client ID
 * 
 * Útil para validação e debugging
 */
export function getThirdwebClientId(): string {
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
  
  if (!clientId) {
    console.warn('NEXT_PUBLIC_THIRDWEB_CLIENT_ID não configurada');
    return "";
  }
  
  return clientId;
}

