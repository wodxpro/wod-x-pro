/**
 * Configuração do Alchemy Account Kit
 * 
 * Configuração para Email OTP Authentication e outras funcionalidades
 * 
 * IMPORTANTE: Os contratos estão deployados na Polygon Mainnet (Chain ID: 137)
 */

import { createConfig, AlchemyAccountsUIConfig } from "@account-kit/react";
import { polygon, alchemy } from "@account-kit/infra";

// Função para criar a configuração (evita problemas de SSR)
export function getAccountKitConfig() {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

  if (!apiKey) {
    console.warn('NEXT_PUBLIC_ALCHEMY_API_KEY não configurada');
  }

  // Configuração de UI para Email (suporta OTP e Magic Link)
  // O modo é configurado no dashboard da Alchemy
  const uiConfig: AlchemyAccountsUIConfig = {
    auth: {
      sections: [
        [
          {
            type: "email",
            // emailMode será determinado pelo dashboard da Alchemy
            // Para OTP: emailMode: "otp"
            // Para Magic Link: emailMode: "magicLink"
            buttonLabel: "Continuar com E-mail",
            placeholder: "Digite seu e-mail",
          },
        ],
      ],
    },
  };

  // Configuração principal do Account Kit
  // Usando Polygon Mainnet (onde os contratos estão deployados)
  return createConfig(
    {
      transport: alchemy({ apiKey }),
      chain: polygon, // Polygon Mainnet (Chain ID: 137)
    },
    uiConfig,
  );
}

