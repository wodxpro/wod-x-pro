# 🔗 Configuração Thirdweb

Guia completo para configurar e usar o Thirdweb SDK no frontend.

## 📋 Informações do Projeto

- **Project Name:** `wodxpro`
- **Domain:** `wodx.pro`
- **Email:** `admin@wodx.pro`
- **ENS:** `wodxpro.eth`
- **Team URL:** https://thirdweb.com/team/wodxpro

## 🔑 Variáveis de Ambiente

Adicione ao arquivo `.env.local`:

```env
# Thirdweb Client ID (para frontend)
# Obtenha em: https://thirdweb.com/dashboard/settings/api-keys
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id

# Thirdweb Project Info (opcional)
THIRDWEB_PROJECT_NAME=wodxpro
THIRDWEB_DOMAIN=wodx.pro
THIRDWEB_ENS=wodxpro.eth
```

**Nota:** O `THIRDWEB_SECRET_KEY` é usado apenas no backend. Para o frontend, você só precisa do `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`.

## 🌐 Allowed Domains

No dashboard do Thirdweb, configure os domínios permitidos:

```
wodx.pro
*.wodx.pro
localhost:3000
localhost:3001
```

**Explicação:**
- `wodx.pro` - Domínio principal
- `*.wodx.pro` - Todos os subdomínios
- `localhost:3000` - Desenvolvimento local (Next.js padrão)
- `localhost:3001` - Porta alternativa

## 📡 Usando Thirdweb SDK no Frontend

### Configuração

O client Thirdweb já está configurado em `lib/thirdweb.ts`:

```typescript
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const polygonMainnet = defineChain({
  id: 137,
  name: "Polygon",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpc: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://polygon-rpc.com",
});
```

### Usar em Componentes

```typescript
'use client';

import { useActiveAccount } from "thirdweb/react";
import { thirdwebClient, polygonMainnet } from "@/lib/thirdweb";
import { getContract } from "thirdweb";

export function WODTokenBalance() {
  const account = useActiveAccount();
  
  const contract = getContract({
    client: thirdwebClient,
    chain: polygonMainnet,
    address: "0x888476eA56322CFd5D08DFf8F247b1ab6bd6bB3e",
    abi: WOD_TOKEN_ABI,
  });

  // Usar contract para ler dados ou enviar transações
  return <div>...</div>;
}
```

## ⚠️ Status Atual

O `ThirdwebProvider` está temporariamente desabilitado no `app/providers.tsx` devido a mudanças na API do Thirdweb v5. O client está configurado e pode ser usado diretamente nos componentes quando necessário.

## 🔍 Verificação

### Verificar Client ID

```bash
# Verificar se a variável está configurada (sem mostrar o valor)
grep -q "NEXT_PUBLIC_THIRDWEB_CLIENT_ID" .env.local && echo "✅ Configurado" || echo "❌ Não configurado"
```

## 🔗 Links Úteis

- **Dashboard Thirdweb:** https://thirdweb.com/dashboard
- **API Keys:** https://thirdweb.com/dashboard/settings/api-keys
- **Documentação API:** https://portal.thirdweb.com/
- **SDK Docs:** https://portal.thirdweb.com/sdk
- **React SDK:** https://portal.thirdweb.com/react

## ⚠️ Segurança

1. **NUNCA** commite o `.env.local` no git
2. **NUNCA** compartilhe `THIRDWEB_SECRET_KEY`
3. Use `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` apenas no frontend (pode ser público)
4. Configure `Allowed Domains` corretamente no dashboard
5. Use variáveis `NEXT_PUBLIC_*` apenas para valores que podem ser públicos

## 🔄 Integração com Alchemy Account Kit

O projeto atual usa **Alchemy Account Kit** para autenticação. O Thirdweb pode ser usado em paralelo para:

- Interação com contratos via SDK
- Gerenciamento de transações via API
- Facilitação de integração frontend

**Recomendação:** Manter Alchemy Account Kit para autenticação e usar Thirdweb para interações com contratos.

---

**Última atualização:** 24 de Novembro de 2025

