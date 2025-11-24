# 🔐 Configuração de Variáveis de Ambiente

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

## ⚠️ Problemas Potenciais de Usar Apenas `.env`

### 1. Risco de Commit Acidental
Se alguém remover `.env` do `.gitignore` ou fazer `git add -f .env`, as chaves secretas serão commitadas.

### 2. Conflitos em Equipe
Diferentes desenvolvedores podem ter configurações diferentes, causando conflitos.

### 3. Menos Seguro
`.env.local` é explicitamente ignorado e não aparece em listagens de arquivos.

## ✅ Recomendação

### Para Este Projeto

Como você tem **chaves secretas** no `.env`:
- `THIRDWEB_SECRET_KEY`
- `PRIVATE_KEY`
- `ETHERSCAN_API_KEY`
- `POLYGON_RPC_URL` (com chave da API)

**Ação recomendada:**

1. **Mover valores sensíveis para `.env.local`**
2. **Manter apenas valores públicos no `.env`** (ou removê-lo completamente)
3. **Usar `.env.example`** como template

## 📝 Estrutura Recomendada

### `.env.local` (não commitado)
```env
# Chaves Secretas
THIRDWEB_SECRET_KEY=sua_chave_secreta
PRIVATE_KEY=sua_private_key
ETHERSCAN_API_KEY=sua_api_key
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/sua_chave

# Configurações Locais
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_ALCHEMY_API_KEY=sua_chave
NEXT_PUBLIC_ALCHEMY_POLICY_ID=seu_policy_id
```

### `.env` (opcional - apenas valores públicos)
```env
# Valores públicos que podem ser compartilhados
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=ad0146557fc35ae985ebe94064b043a0
THIRDWEB_PROJECT_NAME=wodxpro
THIRDWEB_DOMAIN=wodx.pro
THIRDWEB_ENS=wodxpro.eth
```

### `.env.example` (commitado - template)
```env
# Template para outros desenvolvedores
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
THIRDWEB_PROJECT_NAME=wodxpro
THIRDWEB_DOMAIN=wodx.pro
THIRDWEB_ENS=wodxpro.eth
```

## 🚀 Migração

Se quiser migrar do `.env` para `.env.local`:

1. **Copiar o arquivo:**

   ```bash
   cp .env .env.local
   ```

2. **Remover chaves secretas do `.env`** (ou remover completamente)

3. **Manter apenas valores públicos no `.env`** (se necessário)

4. **Atualizar `.env.example`** com template sem valores reais

## ✅ Status Atual

- ✅ `.env` está no `.gitignore` (seguro)
- ✅ `.env.example` existe e está atualizado
- ⚠️ `.env` contém chaves secretas (recomendado mover para `.env.local`)

## 📚 Referências

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Gitignore Patterns](https://git-scm.com/docs/gitignore)

