# 👀 O Que Você Verá ao Carregar a Aplicação

## 🎨 Tela Inicial (Sem Login)

Quando você acessar `http://localhost:3000` pela primeira vez, verá:

### 1. **Header (Cabeçalho)**

- **Título:** "WOD[X] PRO" (texto grande e em negrito)
- **Subtítulo:** "Transforme esforço físico em valor digital real"
- **Info:** "wod.eth • Token: $WOD" (fonte monoespaçada)
- **Botão de Login** no canto superior direito

### 2. **Área Principal (Sem Login)**

- **Título:** "Conecte sua wallet para começar"
- **Descrição:** "Use Alchemy Account Kit para login social e acesso sem fricção"
- **Botão de Login** centralizado

### 3. **Opções de Login**

O botão de login oferece duas opções:

- **Código (OTP)** - Recebe código por email
- **Link Mágico** - Recebe link por email

---

## ✅ Tela Após Login

Depois de fazer login com sucesso, você verá:

### 1. **Header Atualizado**

- Mesmo título e informações
- **Endereço da wallet** (formato: `0x1234...5678`)
- **Email do usuário** (se disponível)

### 2. **Dashboard Completo**

#### **IPFSStatus** (no topo)

- Status dos provedores IPFS configurados
- Verifica se NFT.Storage ou Lighthouse estão disponíveis

#### **Grid de 2 Colunas:**

**Coluna Esquerda:**

- **DailyTraining** - Componente para registrar treinos diários
- **OnRampPIX** - Interface para comprar tokens WOD via PIX

**Coluna Direita:**

- **ArenaDashboard** - Dashboard principal com desafios e competições

#### **ValidatorDashboard** (abaixo do grid)

- Painel para validadores votarem em submissões

---

## 🎨 Design e Cores

### Paleta de Cores:

- **Fundo:** Bege claro (`#f4f0e9` - `bg-arena`)
- **Texto Principal:** Preto (`#000000` - `text-protocol`)
- **Acentos:** Vermelho (`#ff1c16` - `text-token`)
- **Bordas:** Vermelho translúcido

### Tipografia:

- **Fonte:** Space Grotesk (Google Fonts)
- **Monospace:** Para endereços de wallet e informações técnicas

---

## ⚠️ Possíveis Erros ou Avisos

### Se você ver erros:

1. **Erro de Alchemy Account Kit:**
   - Verifique se `NEXT_PUBLIC_ALCHEMY_API_KEY` está no `.env.local`
   - Verifique se `NEXT_PUBLIC_ALCHEMY_POLICY_ID` está configurado

2. **Erro de Thirdweb:**
   - Verifique se `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` está no `.env.local`

3. **Erro de Contratos:**
   - O pacote `@wodxpro/contract-data` não está instalado
   - Alguns componentes podem não funcionar completamente
   - Veja `NOTAS_INSTALACAO.md` para mais detalhes

4. **Erro de IPFS:**
   - Verifique se `NEXT_PUBLIC_LIGHTHOUSE_API_KEY` está configurado
   - Ou configure `NEXT_PUBLIC_NFTSTORAGE_API_KEY`

---

## 🔄 Fluxo de Uso

1. **Acesse** `http://localhost:3000`
2. **Clique** no botão de login
3. **Escolha** OTP ou Link Mágico
4. **Digite** seu email
5. **Receba** código/link por email
6. **Complete** a autenticação
7. **Explore** os dashboards e funcionalidades

---

## 📱 Componentes Visíveis

### Sem Login:

- ✅ Header com título
- ✅ Botão de login
- ✅ Mensagem de boas-vindas

### Com Login:

- ✅ Header com informações do usuário
- ✅ IPFSStatus
- ✅ DailyTraining
- ✅ OnRampPIX
- ✅ ArenaDashboard
- ✅ ValidatorDashboard

---

## 🚀 Próximos Passos Após Ver a Tela

1. **Testar Login** - Faça login com seu email
2. **Explorar Dashboards** - Veja os componentes disponíveis
3. **Verificar Console** - Abra DevTools (F12) para ver logs
4. **Testar Funcionalidades** - Interaja com os componentes

---

## 💡 Dicas

- A aplicação usa **Alchemy Account Kit** para autenticação sem fricção
- Não precisa de MetaMask ou outras wallets tradicionais
- O login é feito via email (OTP ou Magic Link)
- A wallet é criada automaticamente (Smart Contract Wallet)

---

**Última atualização:** 24 de Novembro de 2025

