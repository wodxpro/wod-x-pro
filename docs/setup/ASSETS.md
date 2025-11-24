# 🖼️ Assets e Imagens

Guia sobre onde colocar imagens, logos e outros assets estáticos no projeto.

## 📁 Estrutura de Pastas

```
public/
├── images/          # Imagens gerais (fotos, ilustrações)
├── logos/           # Logos e marcas
├── icons/           # Ícones e favicons
└── favicon.ico      # Favicon do site (opcional)
```

## 📍 Onde Colocar

### Logo Principal

Coloque em: `public/logos/logo.png` (ou `.svg`, `.jpg`, etc.)

**Exemplo de uso:**

```tsx
import Image from 'next/image';

export function Header() {
  return (
    <Image
      src="/logos/logo.png"
      alt="WOD[X] PRO Logo"
      width={200}
      height={50}
      priority
    />
  );
}
```

### Imagens de Componentes

Coloque em: `public/images/`

**Exemplo:**

```tsx
<Image
  src="/images/hero-background.jpg"
  alt="Hero background"
  fill
  className="object-cover"
/>
```

### Ícones e Favicons

Coloque em: `public/icons/` ou `public/`

**Favicon:**
- `public/favicon.ico` - Favicon principal
- `public/apple-touch-icon.png` - Ícone para iOS
- `public/icon-192.png` - Ícone PWA 192x192
- `public/icon-512.png` - Ícone PWA 512x512

## 🎨 Formatos Recomendados

### Para Logos
- ✅ **SVG** (melhor qualidade, escalável)
- ✅ **PNG** (com transparência)
- ⚠️ Evite JPG para logos (sem transparência)

### Para Imagens
- ✅ **WebP** (melhor compressão)
- ✅ **PNG** (com transparência)
- ✅ **JPG** (fotos sem transparência)

### Para Ícones
- ✅ **SVG** (escalável)
- ✅ **PNG** (tamanhos fixos: 16x16, 32x32, etc.)

## 📝 Como Usar no Código

### Next.js Image Component (Recomendado)

```tsx
import Image from 'next/image';

// Imagem simples
<Image
  src="/logos/logo.png"
  alt="Logo"
  width={200}
  height={50}
/>

// Imagem responsiva
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  className="w-full h-auto"
/>

// Imagem com fill (preenche container)
<div className="relative w-full h-64">
  <Image
    src="/images/background.jpg"
    alt="Background"
    fill
    className="object-cover"
  />
</div>
```

### Imagem Estática (HTML tradicional)

```tsx
// Para imagens que não precisam de otimização
<img src="/logos/logo.png" alt="Logo" />
```

## 🔗 URLs de Acesso

Arquivos em `public/` são acessíveis diretamente:

- `public/logos/logo.png` → `https://seu-site.com/logos/logo.png`
- `public/images/hero.jpg` → `https://seu-site.com/images/hero.jpg`
- `public/favicon.ico` → `https://seu-site.com/favicon.ico`

**Importante:** Não use `/public/` no caminho, apenas `/logos/`, `/images/`, etc.

## 📦 Otimização Automática

O Next.js otimiza automaticamente imagens usando o componente `Image`:

- ✅ Lazy loading automático
- ✅ Redimensionamento responsivo
- ✅ Conversão para WebP quando suportado
- ✅ Blur placeholder opcional

## 🎯 Exemplo Completo

### Estrutura de Arquivos

```
public/
├── logos/
│   ├── logo.svg
│   ├── logo-dark.svg
│   └── logo-light.svg
├── images/
│   ├── hero-background.jpg
│   ├── athlete-placeholder.png
│   └── challenge-banner.webp
└── icons/
    ├── favicon.ico
    ├── apple-touch-icon.png
    └── icon-192.png
```

### Uso no Componente

```tsx
import Image from 'next/image';

export function Header() {
  return (
    <header>
      <Image
        src="/logos/logo.svg"
        alt="WOD[X] PRO"
        width={150}
        height={40}
        priority
      />
    </header>
  );
}

export function Hero() {
  return (
    <div className="relative h-screen">
      <Image
        src="/images/hero-background.jpg"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-10">
        {/* Conteúdo sobre a imagem */}
      </div>
    </div>
  );
}
```

## ⚠️ Boas Práticas

1. **Use SVG para logos** - Melhor qualidade e escalabilidade
2. **Otimize imagens antes de adicionar** - Use ferramentas como [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)
3. **Use o componente `Image` do Next.js** - Otimização automática
4. **Adicione `alt` sempre** - Acessibilidade
5. **Use `priority` para imagens acima da dobra** - Carregamento prioritário
6. **Mantenha nomes descritivos** - `logo.svg` melhor que `img1.png`

## 🔗 Links Úteis

- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)
- [Image Best Practices](https://web.dev/fast/#optimize-your-images)
- [SVG Optimization](https://jakearchibald.github.io/svgomg/)

---

**Última atualização:** 24 de Novembro de 2025

