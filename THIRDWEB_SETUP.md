# 🔗 Configuração Thirdweb

## 📋 Informações do Projeto

- **Project Name:** `wodxpro`

- **Domain:** `wodx.pro`

- **Email:** `admin@wodx.pro`

- **ENS:** `wodxpro.eth`

- **Team URL:** https://thirdweb.com/team/wodxpro

---

## 🔑 Variáveis de Ambiente

Adicione ao arquivo `.env.local`:

```env
# ============================================
# THIRDWEB CONFIGURATION
# ============================================

# Thirdweb Secret Key (para API)
# Obtenha em: https://thirdweb.com/dashboard/settings/api-keys
# ⚠️ NUNCA compartilhe esta chave!
THIRDWEB_SECRET_KEY=seu_secret_key_aqui

# Thirdweb Client ID (para frontend)
# Obtenha em: https://thirdweb.com/dashboard/settings/api-keys
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=seu_client_id_aqui

# Thirdweb Project Info
THIRDWEB_PROJECT_NAME=wodxpro
THIRDWEB_DOMAIN=wodx.pro
THIRDWEB_ENS=wodxpro.eth
```

**Nota:** O `THIRDWEB_SECRET_KEY` já está configurado no `.env` do repositório de contratos. Para o frontend, você só precisa do `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`.

---

## 🌐 Allowed Domains

No dashboard do Thirdweb, configure:

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

---

## 🧪 Testar Conexão

### 1. Testar API Connection

```bash
npm run test-thirdweb
```

Este script verifica:

- ✅ Se as variáveis estão configuradas
- ✅ Se a API Thirdweb está acessível
- ✅ Se a autenticação funciona
- ✅ Se os contratos estão deployados

### 2. Verificar Contratos

```bash
npm run verify-thirdweb
```

Este script:

- ✅ Verifica se os contratos existem na rede
- ✅ Lê informações básicas dos contratos
- ✅ Valida configuração

---

## 📡 Usando Thirdweb SDK no Frontend

### Instalação

```bash
npm install thirdweb
```

### Exemplo: Configurar Client

```typescript
// lib/thirdweb.ts
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const polygon = defineChain({
  id: 137,
  name: "Polygon",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpc: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://polygon-rpc.com",
});
```

### Exemplo: Usar em Componente

```typescript
'use client';

import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { thirdwebClient, polygon } from "@/lib/thirdweb";
import { getContract } from "thirdweb";
import { WOD_TOKEN_ABI } from "@/lib/contracts";

export function WODTokenBalance() {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();

  const contract = getContract({
    client: thirdwebClient,
    chain: polygon,
    address: "0x888476eA56322CFd5D08DFf8F247b1ab6bd6bB3e",
    abi: WOD_TOKEN_ABI,
  });

  // Usar contract para ler dados ou enviar transações
  return <div>...</div>;
}
```

### Exemplo: Provider Setup

```typescript
// app/providers.tsx
'use client';

import { ThirdwebProvider } from "thirdweb/react";
import { thirdwebClient } from "@/lib/thirdweb";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider client={thirdwebClient}>
      {children}
    </ThirdwebProvider>
  );
}
```

---

## 🔍 Verificação de Contratos

### Status Atual

Thirdweb pode ser usado para:

- ✅ Gerenciar transações via API
- ✅ Interagir com contratos via SDK
- ✅ Facilitar integração frontend

**Para verificação no Polygonscan:**

- Use o guia manual no repositório de contratos
- Ou aguarde suporte automático via Thirdweb (se disponível)

---

## 📝 Scripts Disponíveis

### `npm run test-thirdweb`

Testa conexão com Thirdweb API e valida configuração.

### `npm run verify-thirdweb`

Verifica contratos deployados usando Thirdweb (validação local).

**Nota:** Estes scripts podem estar no repositório de contratos. Se necessário, adicione ao `package.json`:

```json
{
  "scripts": {
    "test-thirdweb": "node scripts/test-thirdweb.js",
    "verify-thirdweb": "node scripts/verify-thirdweb.js"
  }
}
```

---

## 🔗 Links Úteis

- **Dashboard Thirdweb:** https://thirdweb.com/dashboard
- **API Keys:** https://thirdweb.com/dashboard/settings/api-keys
- **Documentação API:** https://portal.thirdweb.com/
- **SDK Docs:** https://portal.thirdweb.com/sdk
- **React SDK:** https://portal.thirdweb.com/react

---

## ⚠️ Segurança

1. **NUNCA** commite o `.env.local` no git
2. **NUNCA** compartilhe `THIRDWEB_SECRET_KEY`
3. Use `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` apenas no frontend (pode ser público)
4. Configure `Allowed Domains` corretamente no dashboard
5. Use variáveis `NEXT_PUBLIC_*` apenas para valores que podem ser públicos

---

## 🔄 Integração com Alchemy Account Kit

O projeto atual usa **Alchemy Account Kit** para autenticação. Você pode:

1. **Manter Alchemy Account Kit** e usar Thirdweb apenas para interação com contratos
2. **Migrar para Thirdweb** completamente (substituir Account Kit)
3. **Usar ambos** em paralelo (Account Kit para auth, Thirdweb para contratos)

Recomendação: Opção 1 ou 3, mantendo a experiência de autenticação sem fricção do Account Kit.

---

**✅ Configuração completa! Use os scripts para testar a conexão.**

