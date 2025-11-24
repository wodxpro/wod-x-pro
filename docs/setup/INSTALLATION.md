# 📦 Instalação e Setup

Guia completo para instalar e configurar o frontend do WOD X PRO.

## 📋 Pré-requisitos

- **Node.js** 18 ou superior
- **npm** ou **yarn**
- Conta **Alchemy** (para Account Kit)
- Chave API do **Lighthouse** (opcional, para IPFS)

## 🚀 Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/wodxpro/wod-x-pro.git
cd wod-x-pro
```

### 2. Instalar Dependências

```bash
npm install --legacy-peer-deps
```

**Nota:** Usamos `--legacy-peer-deps` devido a conflitos de peer dependencies entre algumas bibliotecas. Isso é seguro e necessário para o projeto funcionar corretamente.

### 3. Verificar Instalação

```bash
npm list thirdweb wagmi viem
```

Deve mostrar as versões instaladas dos pacotes principais.

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto. Veja o guia completo em [Variáveis de Ambiente](./ENV_SETUP.md).

**Mínimo necessário:**

```env
# Alchemy Account Kit
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_ALCHEMY_POLICY_ID=your_policy_id

# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=137

# Thirdweb (opcional)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
```

### Configurar Alchemy Account Kit

1. Acesse [Alchemy Dashboard](https://dashboard.alchemy.com/)
2. Crie um novo app ou use um existente
3. Obtenha sua **API Key**
4. Configure o **Gas Manager** e obtenha o **Policy ID**
5. Adicione as chaves no `.env.local`

### Configurar Thirdweb (Opcional)

Veja o guia completo em [Configuração Thirdweb](../configuration/THIRDWEB.md).

## 🔧 Dependências Principais

### Instaladas

- ✅ **Next.js 14** - Framework React
- ✅ **wagmi** - Hooks para interação com blockchain
- ✅ **viem** - Cliente Ethereum
- ✅ **@account-kit/react** - Alchemy Account Kit
- ✅ **thirdweb** - SDK do Thirdweb
- ✅ **@tanstack/react-query** - Gerenciamento de estado
- ✅ **@lighthouse-web3/sdk** - Upload para IPFS

### Nota sobre @wodxpro/contract-data

O pacote `@wodxpro/contract-data` não está disponível no npm. O projeto usa uma implementação local em `lib/contractData.ts` com os endereços dos contratos deployados na Polygon Mainnet.

**Endereços dos Contratos (Polygon Mainnet):**
- **WODToken:** `0x888476eA56322CFd5D08DFf8F247b1ab6bd6bB3e`
- **ValidatorRegistry:** `0xC802ceb791831949504E8CE5982F6D9625eA6cC1`
- **Arena:** `0x9B2A87D4C28FA8aBEB14dE889764F66D54b775EE`

## 🧪 Verificar Instalação

### 1. Verificar Arquivos de Configuração

```bash
# Verificar se os arquivos principais existem
ls -la lib/thirdweb.ts lib/wagmiConfig.ts lib/contractData.ts
```

### 2. Testar Build

```bash
npm run build
```

Se o build for bem-sucedido, a instalação está correta!

### 3. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## ⚠️ Problemas Comuns

### Erro de Peer Dependencies

Se encontrar erros de peer dependencies, sempre use:

```bash
npm install --legacy-peer-deps
```

### Erro de Módulo Não Encontrado

Se encontrar erros como "Cannot find module", verifique:

1. Se todas as dependências foram instaladas
2. Se o `node_modules` existe
3. Se há problemas de cache: `rm -rf node_modules package-lock.json && npm install --legacy-peer-deps`

### Erro de Variáveis de Ambiente

Certifique-se de que:
1. O arquivo `.env.local` existe na raiz do projeto
2. Todas as variáveis obrigatórias estão configuradas
3. Não há espaços extras ou caracteres especiais

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

## 🔗 Próximos Passos

1. Configure as [Variáveis de Ambiente](./ENV_SETUP.md)
2. Leia o [Guia do Usuário](../guides/USER_GUIDE.md)
3. Verifique o [Status do Projeto](../status/STATUS.md)

---

**Última atualização:** 24 de Novembro de 2025

