# ⚠️ Avisos de Pacotes Deprecados

## 📋 Sobre os Warnings

Durante a instalação de dependências, você pode ver vários avisos sobre pacotes deprecados. **Isso é normal e não impede o funcionamento do projeto.**

## 🔍 Por que isso acontece?

Esses avisos vêm de **dependências transitivas** (dependências das suas dependências), especialmente em bibliotecas Web3 que ainda usam pacotes antigos:

- `@account-kit/react` e suas dependências
- `wagmi` e `viem` e suas dependências
- `thirdweb` e suas dependências
- Bibliotecas de wallet connection (WalletConnect, etc.)

## ✅ O que fazer?

### Opção 1: Ignorar (Recomendado)

Esses avisos são apenas informativos. O projeto funciona normalmente. As bibliotecas principais serão atualizadas pelos mantenedores quando necessário.

### Opção 2: Suprimir Warnings (Opcional)

Se quiser reduzir o ruído nos logs, você pode adicionar ao `.npmrc`:

```ini
legacy-peer-deps=true
loglevel=error
```

Isso mostrará apenas erros, não warnings.

### Opção 3: Aguardar Atualizações

Conforme as bibliotecas principais (`@account-kit/react`, `wagmi`, `thirdweb`) forem atualizadas, esses warnings diminuirão naturalmente.

## 📦 Pacotes Deprecados Comuns

Alguns pacotes que você pode ver nos warnings:

- `yaeti`, `uuidv4`, `sudo-prompt` - Dependências antigas de bibliotecas Web3
- `rimraf@3.x` - Substituído por `rimraf@4.x`
- `@babel/plugin-proposal-*` - Propostas que já foram incorporadas ao ECMAScript
- `@walletconnect/*` - Versões antigas do WalletConnect

## ⚠️ Importante

- ✅ **Não são erros** - O build funciona normalmente
- ✅ **Não afetam a funcionalidade** - São apenas avisos
- ✅ **Não precisam ser corrigidos manualmente** - São dependências transitivas
- ⚠️ **Não tente atualizar manualmente** - Pode quebrar compatibilidade

## 🔗 Referências

- [npm deprecation warnings](https://docs.npmjs.com/cli/v9/using-npm/deprecations)
- [npm audit vs deprecation warnings](https://docs.npmjs.com/cli/v9/commands/npm-audit)

---

**Última atualização:** 24 de Novembro de 2025

