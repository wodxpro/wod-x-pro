# 📱 PWA iOS e Miniapp - Configuração

Guia completo para configurar o WOD[X] PRO como PWA 100% iOS e miniapp.

## 🎯 Objetivo

O projeto é configurado como **PWA 100% iOS** otimizado para funcionar como **miniapp** em plataformas como:
- Telegram Web App
- WeChat Mini Program (futuro)
- Outros ambientes de miniapp

## ✅ Configurações Implementadas

### 1. Manifest.json

Arquivo: `public/manifest.json`

- ✅ Display mode: `standalone` (comportamento de app nativo)
- ✅ Background color: `#f4f0e9` (arena)
- ✅ Theme color: `#ff1c16` (token)
- ✅ Orientação: `portrait` (vertical)
- ✅ Ícones iOS completos (57px até 1024px)

### 2. Meta Tags iOS

Configuradas em `app/layout.tsx`:

```tsx
appleWebApp: {
  capable: true,
  statusBarStyle: 'black-translucent',
  title: 'WOD[X] PRO',
}
```

Meta tags adicionais:
- `apple-mobile-web-app-capable`: Habilita modo standalone
- `apple-mobile-web-app-status-bar-style`: Barra de status translúcida
- `apple-mobile-web-app-title`: Nome do app na tela inicial

### 3. Viewport iOS

```tsx
viewport: {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // Importante para iPhone com notch
}
```

### 4. Safe Area Insets

CSS configurado em `app/globals.css` para suportar iPhone com notch:

```css
@supports (padding: max(0px)) {
  body {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-top: max(0px, env(safe-area-inset-top));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
```

### 5. Prevenção de Zoom

Inputs configurados com `font-size: 16px` para prevenir zoom automático no iOS ao focar.

## 📱 Como Instalar no iOS

### Método 1: Safari

1. Abra o site no Safari iOS
2. Toque no botão **Compartilhar** (ícone de caixa com seta)
3. Selecione **Adicionar à Tela de Início**
4. Confirme o nome e toque em **Adicionar**

### Método 2: Via Link Direto

Envie o link do site para o usuário. Quando abrir no Safari iOS, aparecerá automaticamente a opção de instalar.

## 🤖 Miniapp - Telegram Web App

### Configuração

O projeto já inclui meta tag para Telegram:

```html
<meta name="telegram-web-app" content="yes" />
```

### Como Funciona

1. **Bot do Telegram**: Crie um bot que abre o Web App
2. **Link direto**: Usuários podem abrir via link
3. **Comportamento**: Funciona como app nativo dentro do Telegram

### Exemplo de Bot (futuro)

```javascript
// Exemplo de comando /start no bot
bot.command('start', (ctx) => {
  ctx.reply('Bem-vindo ao WOD[X] PRO!', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Abrir App', web_app: { url: 'https://wodx.pro' } }
      ]]
    }
  });
});
```

## 🎨 Ícones iOS

Todos os ícones necessários estão em `public/icons/ios/`:

- **57x57** - iPhone original
- **60x60** - iPhone 4+
- **72x72** - iPad
- **76x76** - iPad
- **114x114** - iPhone 4+ Retina
- **120x120** - iPhone 5+ Retina
- **144x144** - iPad Retina
- **152x152** - iPad Retina
- **180x180** - iPhone 6+ (tela inicial)
- **1024x1024** - App Store (se necessário)

## 🔧 Testes

### Testar PWA iOS

1. **Safari iOS**: Abra o site e verifique se aparece opção de instalar
2. **Modo Standalone**: Após instalar, deve abrir sem barra do Safari
3. **Safe Area**: Verifique se o conteúdo não fica atrás do notch
4. **Orientação**: Teste em portrait e landscape

### Testar Miniapp

1. **Telegram**: Abra via bot ou link
2. **Comportamento**: Deve abrir em tela cheia
3. **Navegação**: Teste todos os fluxos

## ⚠️ Limitações Conhecidas

### iOS Safari

- **Service Workers**: Funcionam, mas com limitações
- **Notificações Push**: Requer configuração adicional
- **Armazenamento**: LocalStorage limitado a 5-10MB

### Miniapp

- **Telegram**: Algumas APIs podem ter restrições
- **WeChat**: Requer configuração específica (futuro)

## 📚 Recursos

- [Apple PWA Guidelines](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- [Telegram Web Apps](https://core.telegram.org/bots/webapps)
- [PWA Builder](https://www.pwabuilder.com/)

## 🚀 Próximos Passos

1. **Service Worker**: Implementar para cache offline
2. **Notificações Push**: Configurar para iOS
3. **Bot Telegram**: Criar bot oficial
4. **WeChat**: Configurar para mercado chinês (futuro)

---

**Última atualização:** 24 de Novembro de 2025

