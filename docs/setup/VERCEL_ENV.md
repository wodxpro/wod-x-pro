# 🚀 Variáveis de Ambiente para Vercel

Guia completo das variáveis de ambiente que devem ser configuradas no painel da Vercel.

## 📋 Como Configurar na Vercel

1. Acesse seu projeto na [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Environment Variables**
3. Adicione cada variável abaixo
4. Selecione os ambientes: **Production**, **Preview**, **Development** (conforme necessário)

---

## ✅ Variáveis Obrigatórias

### Alchemy Account Kit

| Variável | Valor | Ambiente | Descrição |
|----------|-------|----------|-----------|
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | `sua_chave_alchemy` | Todos | Chave API do Alchemy para Account Kit |
| `NEXT_PUBLIC_ALCHEMY_POLICY_ID` | `seu_policy_id` | Todos | Policy ID do Gas Manager |

### Chain Configuration

| Variável | Valor | Ambiente | Descrição |
|----------|-------|----------|-----------|
| `NEXT_PUBLIC_CHAIN_ID` | `137` | Todos | Polygon Mainnet (onde os contratos estão) |

---

## 🔧 Variáveis Recomendadas

### Thirdweb

| Variável | Valor | Ambiente | Descrição |
|----------|-------|----------|-----------|
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | `ad0146557fc35ae985ebe94064b043a0` | Todos | Client ID do Thirdweb (pode ser público) |

### IPFS (Lighthouse)

| Variável | Valor | Ambiente | Descrição |
|----------|-------|----------|-----------|
| `NEXT_PUBLIC_LIGHTHOUSE_API_KEY` | `sua_chave_lighthouse` | Todos | Chave API do Lighthouse para IPFS |

### RPC URL

| Variável | Valor | Ambiente | Descrição |
|----------|-------|----------|-----------|
| `POLYGON_RPC_URL` | `https://polygon-mainnet.g.alchemy.com/v2/sua_chave` | Todos | URL do RPC do Polygon (Alchemy) |

**Nota:** Se você usar `POLYGON_RPC_URL`, também pode criar `NEXT_PUBLIC_POLYGON_RPC_URL` se precisar acessar no frontend.

---

## ⚠️ Variáveis que NÃO devem ser configuradas na Vercel

Estas variáveis são apenas para backend/local e não devem estar na Vercel:

- ❌ `THIRDWEB_SECRET_KEY` - Apenas para uso em backend/scripts
- ❌ `PRIVATE_KEY` - Nunca exponha em frontend
- ❌ `ETHERSCAN_API_KEY` - Apenas para scripts de verificação
- ❌ `TREASURY_ADDRESS`, `FOUNDER_ADDRESS`, etc. - Apenas para scripts locais

---

## 📝 Exemplo de Configuração na Vercel

### Production Environment

```
NEXT_PUBLIC_ALCHEMY_API_KEY=your_production_alchemy_key
NEXT_PUBLIC_ALCHEMY_POLICY_ID=your_production_policy_id
NEXT_PUBLIC_CHAIN_ID=137
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=ad0146557fc35ae985ebe94064b043a0
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=your_lighthouse_key
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/your_key
```

### Preview/Development Environment

Você pode usar as mesmas variáveis ou criar versões de teste se necessário.

---

## 🔍 Verificar Variáveis Configuradas

Após configurar, você pode verificar no build log da Vercel:

1. Vá em **Deployments**
2. Clique no último deploy
3. Veja os logs de build
4. As variáveis `NEXT_PUBLIC_*` estarão disponíveis durante o build

---

## ⚡ Importante

### Variáveis `NEXT_PUBLIC_*`

- ✅ São expostas ao cliente (browser)
- ✅ Podem ser acessadas via `process.env.NEXT_PUBLIC_*`
- ✅ São incluídas no bundle JavaScript
- ⚠️ **NÃO coloque chaves secretas aqui!**

### Variáveis sem `NEXT_PUBLIC_`

- ✅ Apenas no servidor (SSR, API routes)
- ✅ Não são expostas ao cliente
- ✅ Podem conter chaves secretas (com cuidado)

---

## 🎯 Checklist de Configuração

Antes de fazer deploy, verifique:

- [ ] `NEXT_PUBLIC_ALCHEMY_API_KEY` configurada
- [ ] `NEXT_PUBLIC_ALCHEMY_POLICY_ID` configurada
- [ ] `NEXT_PUBLIC_CHAIN_ID=137` configurada
- [ ] `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` configurada (se usar Thirdweb)
- [ ] `NEXT_PUBLIC_LIGHTHOUSE_API_KEY` configurada (se usar IPFS)
- [ ] `POLYGON_RPC_URL` configurada (se necessário)
- [ ] Variáveis aplicadas aos ambientes corretos (Production/Preview)

---

## 🔗 Links Úteis

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Alchemy Dashboard](https://dashboard.alchemy.com/)
- [Thirdweb Dashboard](https://thirdweb.com/dashboard)

---

**Última atualização:** 24 de Novembro de 2025

