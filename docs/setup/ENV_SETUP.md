# 🔐 Configuração de Variáveis de Ambiente

Guia completo sobre como configurar variáveis de ambiente no projeto.

## 📋 Diferenças entre `.env` e `.env.local`

### `.env`
- ✅ Pode ser commitado no git (mas está no `.gitignore` por padrão)
- ✅ Usado para valores compartilhados entre desenvolvedores
- ⚠️ Menos seguro para chaves secretas
- 📝 Ordem de carregamento: 3ª prioridade

### `.env.local`
- ✅ **SEMPRE ignorado pelo git** (mais seguro)
- ✅ Recomendado pelo Next.js para valores locais
- ✅ Ideal para chaves secretas e configurações pessoais
- 📝 Ordem de carregamento: **1ª prioridade** (sobrescreve `.env`)

## 🔄 Ordem de Precedência no Next.js

1. `.env.local` (maior prioridade)
2. `.env.development` ou `.env.production` (baseado no ambiente)
3. `.env` (menor prioridade)

## ✅ Estrutura Recomendada

### `.env.local` (não commitado - use este!)

```env
# ============================================
# ALCHEMY ACCOUNT KIT
# ============================================
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_ALCHEMY_POLICY_ID=your_policy_id

# ============================================
# CHAIN CONFIGURATION
# ============================================
# IMPORTANTE: Chain ID 137 = Polygon Mainnet (onde os contratos estão deployados)
NEXT_PUBLIC_CHAIN_ID=137

# ============================================
# THIRDWEB CONFIGURATION
# ============================================
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id

# ============================================
# IPFS (Lighthouse - opcional)
# ============================================
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=your_lighthouse_key

# ============================================
# RPC URLs
# ============================================
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/your_key
```

### `.env.example` (commitado - template)

Veja o arquivo `.env.example` na raiz do projeto para um template completo.

## 📝 Variáveis Obrigatórias

| Variável | Descrição | Onde Obter |
|----------|-----------|------------|
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | Chave API do Alchemy | [Alchemy Dashboard](https://dashboard.alchemy.com/) |
| `NEXT_PUBLIC_ALCHEMY_POLICY_ID` | Policy ID do Gas Manager | [Alchemy Dashboard](https://dashboard.alchemy.com/) |
| `NEXT_PUBLIC_CHAIN_ID` | Chain ID (137 = Polygon Mainnet) | Configuração do projeto |

## 📝 Variáveis Opcionais

| Variável | Descrição | Onde Obter |
|----------|-----------|------------|
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | Client ID do Thirdweb | [Thirdweb Dashboard](https://thirdweb.com/dashboard) |
| `NEXT_PUBLIC_LIGHTHOUSE_API_KEY` | Chave API do Lighthouse | [Lighthouse](https://lighthouse.storage/) |
| `POLYGON_RPC_URL` | URL do RPC do Polygon | Alchemy ou outro provedor |

## ⚠️ Segurança

### ⛔ NUNCA Faça:

1. **NUNCA** commite o `.env.local` no git
2. **NUNCA** compartilhe chaves secretas publicamente
3. **NUNCA** use valores reais no `.env.example`

### ✅ SEMPRE Faça:

1. Use `.env.local` para valores sensíveis
2. Use `.env.example` como template (sem valores reais)
3. Verifique se `.env.local` está no `.gitignore`

## 🔍 Verificar Configuração

### Verificar se arquivo existe

```bash
ls -la .env.local
```

### Verificar variáveis (sem mostrar valores)

```bash
# Ver apenas os nomes das variáveis
grep -E "^[A-Z_]+=" .env.local | cut -d'=' -f1
```

## 🚀 Migração

Se você já tem um `.env` e quer migrar para `.env.local`:

1. **Copiar o arquivo:**
   ```bash
   cp .env .env.local
   ```

2. **Remover chaves secretas do `.env`** (ou remover completamente)

3. **Manter apenas valores públicos no `.env`** (se necessário)

## 📚 Referências

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Gitignore Patterns](https://git-scm.com/docs/gitignore)

---

**Última atualização:** 24 de Novembro de 2025

