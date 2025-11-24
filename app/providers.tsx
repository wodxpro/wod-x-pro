'use client';

import { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { AlchemyAccountProvider } from "@account-kit/react";
import { getAccountKitConfig } from '@/lib/accountKitConfig';
// TODO: ThirdwebProvider temporariamente desabilitado - API mudou na v5
// import { ThirdwebProvider } from "thirdweb/react";
// import { thirdwebClient } from '@/lib/thirdweb';
import { wagmiConfig } from '@/lib/wagmiConfig';

export function Providers({ children }: { children: React.ReactNode }) {
  // Criar QueryClient dentro do componente para evitar problemas de SSR
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto
        refetchOnWindowFocus: false,
      },
    },
  }));

  // Criar config do Account Kit no cliente
  const accountKitConfig = useMemo(() => getAccountKitConfig(), []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AlchemyAccountProvider config={accountKitConfig} queryClient={queryClient}>
          {/* TODO: Reativar ThirdwebProvider quando API estiver correta */}
          {/* <ThirdwebProvider client={thirdwebClient}> */}
            {children}
          {/* </ThirdwebProvider> */}
        </AlchemyAccountProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

