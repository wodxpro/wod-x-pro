# 📦 Instalação do Thirdweb

## ⚠️ Conflito de Dependências

O projeto tem um conflito de dependências entre `@types/react` versões 18 e 19. Isso foi corrigido no `package.json`, mas você precisa reinstalar as dependências.

## 🚀 Passos para Instalação

### 1. Remover node_modules e package-lock.json (se existir)

```bash
rm -rf node_modules package-lock.json
```

### 2. Instalar dependências

```bash
npm install
```

Se ainda houver conflitos, use:

```bash
npm install --legacy-peer-deps
```

### 3. Verificar instalação

```bash
npm list thirdweb
```

Deve mostrar a versão do thirdweb instalada.

## ✅ Verificação

Após a instalação, verifique se os arquivos estão funcionando:

1. **lib/thirdweb.ts** - Configuração do client e chains
2. **app/providers.tsx** - Integração do ThirdwebProvider

## 🔧 Configuração

Certifique-se de que o `.env.local` contém:

```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=NEXT_PUBLIC_THIRDWEB_CLIENT_ID
```

## 📝 Notas

- O `@types/react` foi ajustado para versão `^18.2.0` para compatibilidade
- O `thirdweb` foi adicionado ao `package.json` na versão `^5.0.0`
- O ThirdwebProvider está integrado no `providers.tsx` e funciona em conjunto com o AlchemyAccountProvider

